CREATE OR REPLACE VIEW LAST_MINUTE_TICKETS AS
SELECT
    FLIGHT.ID AS FLIGHT_ID,
    FLIGHT.DEPARTURE_TIME AS DEPARTURE_TIME,
    # DEPARTURE TIME - 1 DAY tickets are sold
    (COUNT(DATE(TICKET_PAYMENT.date) > DATE_SUB(FLIGHT.DEPARTURE_TIME, INTERVAL 1 WEEK ))) AS LAST_MINUTE_TICKET_SALE

    #(SELECT COUNT(*) FROM TICKET_PAYMENT WHERE TICKET_PAYMENT.DATE > DATE_SUB(FLIGHT.DEPARTURE_TIME, INTERVAL 1 DAY)) AS LAST_MINUTE_TICKETS_SOLD

FROM PASSENGER
         JOIN TICKET ON PASSENGER.id = TICKET.passenger_id
         JOIN FLIGHT ON TICKET.flight_id = FLIGHT.ID
         JOIN TICKET_PAYMENT ON TICKET.id = TICKET_PAYMENT.ticket_id
GROUP BY FLIGHT.ID
ORDER BY FLIGHT.ID;

CREATE OR REPLACE VIEW LUGGAGE_STATISTICS AS
SELECT
    LUGGAGE.flight_id                                                       AS FLIGHT_ID,
    COUNT(LUGGAGE.id)                                                       AS LUGGAGE_COUNT,
    COUNT(passenger_id)                                                     AS PASSENGERS_WITH_LUGGAGE,
    /*
     precentage from all luggage (nr luggage / passangers)
     */
    CONCAT((COUNT(LUGGAGE.id) / (SELECT COUNT(*) FROM TICKET)) * 100 , '%') AS LUGGAGE_PER_PASSENGER,
    AIRPLANE_TYPE.seats                                                     AS PLANE_CAPACITY,
    CONCAT((COUNT(LUGGAGE.id) / AIRPLANE_TYPE.seats) * 100 ,'%')            AS LUGGAGE_PER_PLANE

FROM
    LUGGAGE
        JOIN
    FLIGHT ON LUGGAGE.flight_id = FLIGHT.ID
        JOIN
    PASSENGER ON LUGGAGE.passenger_id = PASSENGER.id
        JOIN
    AIRPLANE ON FLIGHT.PLANE_ID = AIRPLANE.id
        JOIN
    AIRPLANE_TYPE ON AIRPLANE.id = AIRPLANE_TYPE.id
group by LUGGAGE.flight_id;

CREATE OR REPLACE VIEW MONTHLY_INCOME_AIRPORT AS

SELECT
    MONTHNAME(FLIGHT.departure_time) AS MONTH,
    YEAR(FLIGHT.departure_time)      AS YEAR,
    AIRPORT.name                     AS AIRPORT,
    COUNT(FLIGHT.id)                 AS FLIGHTS,
    SUM(FLIGHT.price)                AS TOTAL_INCOME
FROM
    FLIGHT
        JOIN
    AIRPORT ON FLIGHT.destination_id = AIRPORT.id
        JOIN
    TICKET ON FLIGHT.id = TICKET.flight_id
GROUP BY MONTHNAME(FLIGHT.departure_time) , AIRPORT.name
ORDER BY MONTHNAME(FLIGHT.departure_time) , AIRPORT.name;

CREATE OR REPLACE VIEW MONTHLY_PASSENGER_COUNT AS
SELECT
    MONTHNAME(FLIGHT.DEPARTURE_TIME)                                                                               AS MONTH,
    YEAR(FLIGHT.DEPARTURE_TIME)                                                                                    AS YEAR,
    AIRPORT.name                                                                                                   AS AIRPORT,
    (SELECT COUNT (*) FROM TICKET WHERE flight_id = ANY(SELECT id FROM FLIGHT WHERE DESTINATION_ID = AIRPORT.id )) AS ARRIVING_PASSENGERS,
    (SELECT COUNT (*) FROM TICKET WHERE flight_id = ANY(SELECT id FROM FLIGHT WHERE  ORIGIN_ID = AIRPORT.id ))     AS DEPARTING_PASSENGERS
FROM
    FLIGHT
        JOIN
    AIRPORT ON FLIGHT.DESTINATION_ID = AIRPORT.id
        JOIN
    TICKET ON FLIGHT.ID = TICKET.flight_id
GROUP BY MONTHNAME(FLIGHT.DEPARTURE_TIME) , AIRPORT.name
ORDER BY MONTHNAME(FLIGHT.DEPARTURE_TIME) , AIRPORT.name;

CREATE OR REPLACE VIEW PAYMENT_STATISTICS AS
SELECT
    TICKET_PAYMENT_METHOD.method AS PAYMENT_METHOD,
    COUNT(TICKET_PAYMENT.id) AS TICKETS_SOLD,
    SUM(FLIGHT.PRICE) AS TOTAL_INCOME,
/*
 precentage from all payments (total income / all payments)
 */
    COUNT(TICKET_PAYMENT.id) / (SELECT COUNT(*) FROM TICKET_PAYMENT) * 100 AS PAYMENT_PERCENTAGE



FROM
    TICKET_PAYMENT
        JOIN
    TICKET_PAYMENT_METHOD ON TICKET_PAYMENT.payment_method = TICKET_PAYMENT_METHOD.id
        JOIN
    TICKET ON TICKET_PAYMENT.ticket_id = TICKET.id
        JOIN
    FLIGHT ON TICKET.flight_id = FLIGHT.id
GROUP BY TICKET_PAYMENT_METHOD.method;

CREATE OR REPLACE VIEW PREFERRED_DESTINATIONS AS
# select the top 5 destinations
SELECT
    AIRPORT.name     AS AIRPORT,
    CITY.name        AS CITY,
    COUNTRY.name     AS COUNTRY,
    COUNT(TICKET.id) AS TICKETS_SOLD
FROM
    TICKET
        JOIN
    FLIGHT ON TICKET.flight_id = FLIGHT.ID
        JOIN
    AIRPORT ON FLIGHT.DESTINATION_ID = AIRPORT.id
        JOIN
    CITY ON AIRPORT.city_id = CITY.id
        JOIN
    COUNTRY ON CITY.country = COUNTRY.id
GROUP BY AIRPORT.name
ORDER BY COUNT(TICKET.id) DESC
LIMIT 5;

CREATE OR REPLACE VIEW TICKETS_PER_FLIGHT AS
SELECT
    FLIGHT.ID                                                   AS FLIGHT_ID,
    FLIGHT.DEPARTURE_TIME                                       AS DEPARTURE_TIME,
    FLIGHT.ARRIVAL_TIME                                         AS ARRIVAL_TIME,
    FLIGHT.DESTINATION_ID                                       AS DESTINATION_ID,
    FLIGHT.ORIGIN_ID                                            AS ORIGIN_ID,
    COUNT(TICKET.id)                                            AS TICKETS_SOLD,
    AIRPLANE_TYPE.seats                                         AS SEATS,
    /*
     precentage of tickets sold for each flight (tickets sold / plane type capacity)
     */
    CONCAT((COUNT(TICKET.id) / AIRPLANE_TYPE.seats) * 100 ,'%') AS TICKETS_SOLD_PERCENTAGE
FROM
    TICKET
        JOIN
    FLIGHT ON TICKET.flight_id = FLIGHT.ID
        JOIN
    AIRPLANE ON FLIGHT.PLANE_ID = AIRPLANE.id
        JOIN
    AIRPLANE_TYPE ON AIRPLANE.id = AIRPLANE_TYPE.id

GROUP BY FLIGHT.ID
ORDER BY FLIGHT.ID;

CREATE OR REPLACE VIEW TOP_ACCOUNTS AS
SELECT
    ACCOUNT.uuid       AS ACCOUNT_ID,
    ACCOUNT.first_name AS FIRST_NAME,
    ACCOUNT.last_name  AS LAST_NAME,
    COUNT(TICKET.id)   AS TICKETS_BOUGHT,
    SUM(FLIGHT.price)  AS TOTAL_INCOME
FROM
    TICKET
        JOIN
    FLIGHT ON TICKET.flight_id = FLIGHT.id
        JOIN
    ACCOUNT ON TICKET.account_id = ACCOUNT.uuid
GROUP BY ACCOUNT.uuid
ORDER BY TOTAL_INCOME DESC;

CREATE OR REPLACE VIEW TOP_AIRPORT_PASSENGERS AS
SELECT
    YEAR(FLIGHT.DEPARTURE_TIME) AS YEAR,
    AIRPORT.name                AS AIRPORT,
    COUNT(TICKET.id)            AS PASSENGERS
FROM
    TICKET
        JOIN
    FLIGHT ON TICKET.flight_id = FLIGHT.ID
        JOIN
    AIRPORT ON FLIGHT.DESTINATION_ID = AIRPORT.id
GROUP BY AIRPORT.name
ORDER BY COUNT(TICKET.id) DESC;

CREATE OR REPLACE VIEW TOP_PILOTS AS
SELECT
    EMPLOYEE.id                                                            AS EMPLOYEE_ID,
    EMPLOYEE.first_name                                                    AS FIRST_NAME,
    EMPLOYEE.last_name                                                     AS LAST_NAME,
    COUNT(FLIGHT.ID)                                                       AS FLIGHTS,
    /*
     total flight time (sum of flight duration) in minutes
     */
    SUM(TIMESTAMPDIFF(MINUTE, FLIGHT.DEPARTURE_TIME, FLIGHT.ARRIVAL_TIME)) AS TOTAL_FLIGHT_TIME
FROM
    FLIGHT
        JOIN
    FLIGHT_CREW ON FLIGHT.ID = FLIGHT_CREW.flight_id
        JOIN
    EMPLOYEE ON EMPLOYEE.crew_id = FLIGHT_CREW.id
        JOIN
    JOB ON EMPLOYEE.job_id = JOB.id
WHERE
        JOB.id = (SELECT id FROM JOB WHERE  position = 'Pilot')
GROUP BY EMPLOYEE.id
ORDER BY TOTAL_FLIGHT_TIME DESC;