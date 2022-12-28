SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


INSERT INTO `ACCOUNT` (`ID`, `EMAIL`, `PASSWORD`, `FIRST_NAME`, `LAST_NAME`) VALUES
                                                                                 (1, 'abettis0@newyorker.com', '24nP0suMY', 'Andria', 'Bettis'),
                                                                                 (2, 'pwhyke1@yandex.ru', 'aMXovCaCf', 'Pet', 'Whyke'),
                                                                                 (3, 'brides2@miibeian.gov.cn', 'IsReItDl', 'Bobbee', 'Rides'),
                                                                                 (4, 'gsinfield3@ebay.com', 'Z7aAtnNTfH', 'Gertruda', 'Sinfield'),
                                                                                 (5, 'ovandevlies4@drupal.org', 'i04zD5GDJhUq', 'Olly', 'Van de Vlies');

INSERT INTO `ACCOUNT_CARD` (`ID`, `ACCOUNT_ID`, `CARDHOLDER_FIRST_NAME`, `CARDHOLDER_LAST_NAME`, `CARD_NUMBER`, `EXP_MONTH`, `EXP_YEAR`, `CVV`) VALUES
                                                                                                                                                    (1, 1, 'Gav', 'Dilloway', '5540853614858916', 4, 2022, 459),
                                                                                                                                                    (2, 2, 'Bartholomeo', 'Maclaine', '201501196432375', 1, 2025, 220),
                                                                                                                                                    (3, 3, 'Alfie', 'Jurzyk', '3567003242251075', 1, 2023, 737),
                                                                                                                                                    (4, 4, 'Fayre', 'Brazur', '4017954530610642', 9, 2023, 530),
                                                                                                                                                    (5, 5, 'Estel', 'Humphris', '3576589086121340', 10, 2025, 850);

INSERT INTO `AIRPLANE` (id, reg_number, type, country) VALUES
                                                                   (1, 'N18712', 1, 1),
                                                                   (2, 'N12993', 5, 5),
                                                                   (3, 'N98219', 4, 4),
                                                                   (4, 'N19829', 3, 2),
                                                                   (5, 'N89041', 2, 1),
                                                                   (6, 'N27171', 1, 3),
                                                                   (7, 'N18281', 2, 4);

INSERT INTO `AIRPLANE_MANUFACTURER` (id, name) VALUES
                                                       (1, 'Boeing'),
                                                       (2, 'Airbus');

INSERT INTO `AIRPLANE_TYPE` (id, name, manufacturer, range_km, seats) VALUES
                                                                                    (1, 'B-737', 1, 5000, 153),
                                                                                    (2, 'A320', 2, 7000, 120),
                                                                                    (3, 'A340', 2, 8000, 200),
                                                                                    (4, 'B-720', 1, 3500, 128),
                                                                                    (5, 'B-743', 1, 7500, 174);

INSERT INTO `AIRPORT` (id, name, city_id, iata, icao, address) VALUES
                                                                               (1, 'Otopeni International Airport', 1, 'OTP', 'LROP', '-'),
                                                                               (2, 'London Heathrow Airport', 6, 'LHR', 'EGLL', 'Longford TW6 1EW'),
                                                                               (3, 'Paris Charles de Gaulle Airport', 9, 'CDG', 'LFPG', '95700 Roissy-en-France'),
                                                                               (4, 'John F. Kennedy International Airport', 8, 'JFK', 'KJFK', 'Queens, NY 11430'),
                                                                               (5, 'Bern Airport', 7, 'BRN', 'LSMB', 'Flugplatzstrasse 31, 3123 Belp');

INSERT INTO `AIRPORT_GATE` (`ID`, `AIRPORT`, `NUMBER`, `TYPE`) VALUES
                                                                   (1, 1, 102, 2),
                                                                   (2, 1, 108, 3),
                                                                   (3, 4, 100, 4),
                                                                   (4, 5, 79, 1),
                                                                   (5, 1, 128, 3),
                                                                   (6, 3, 19, 1),
                                                                   (7, 2, 89, 2);

INSERT INTO `AIRPORT_GATE_TYPE` (id, type) VALUES
                                                   (1, 'Small'),
                                                   (2, 'Medium'),
                                                   (3, 'Large'),
                                                   (4, 'Jumbo');

INSERT INTO `CITY` (id, name, country) VALUES
                                                 (1, 'Bucharest', 1),
                                                 (2, 'Iasi', 1),
                                                 (6, 'London', 2),
                                                 (7, 'Bern', 5),
                                                 (8, 'New York', 4),
                                                 (9, 'Paris', 3);

INSERT INTO `COUNTRY` (id, icao, name) VALUES
                                                 (1, 'RO', 'Romania'),
                                                 (2, 'GB', 'United Kingdom'),
                                                 (3, 'FR', 'France'),
                                                 (4, 'US', 'United States of America'),
                                                 (5, 'CH', 'Switzerland');

INSERT INTO `EMPLOYEE` (id, first_name, last_name, phone, email, job_id, crew_id) VALUES
                                                                                                    (1, 'Ioan-Alexandru', 'Stan-Soponaru', 723647588, 'stan_soponaru_ioan_alexandru_02@mymailhotmail.com', 9, 2),
                                                                                                    (2, 'Bogdan-Laurentiu', 'Stefanescu', 226874644, 'bogdan@yahoo.com', 1, 4),
                                                                                                    (3, 'George-Razvan', 'Cristea', 999666969, 'razvan_cristeaaaa@mymail.com', 9, 5),
                                                                                                    (4, 'Vasile', 'Vasile', 987654321, 'Vasile@tehnicianul.com', 1, 3),
                                                                                                    (5, 'Ion', 'Stan-Pățitul', 985746352, 'ampățit_o@gmail.com', 5, 1);

INSERT INTO `FLIGHT` (`ID`, `PLANE_ID`, `ORIGIN_ID`, `DESTINATION_ID`, `ORIGIN_GATE_ID`, `DESTINATION_GATE_ID`, `DEPARTURE_TIME`, `ARRIVAL_TIME`) VALUES
                                                                                                                                                      (1, 1, 4, 1, 2, 1, '2022-12-04 15:11:36', '2022-12-04 18:10:46'),
                                                                                                                                                      (2, 7, 4, 5, 4, 6, '2022-12-04 12:15:09', '2022-12-04 19:53:09'),
                                                                                                                                                      (3, 4, 2, 5, 3, 3, '2022-12-07 15:13:51', '2022-12-07 19:44:51'),
                                                                                                                                                      (4, 1, 5, 2, 1, 7, '2022-12-04 18:14:59', '2022-12-04 22:11:59'),
                                                                                                                                                      (5, 3, 3, 1, 2, 1, '2022-12-06 15:15:26', '2022-12-06 17:35:26');

INSERT INTO `FLIGHT_CREW` (id, flight_id) VALUES
                                                  (1, 1),
                                                  (2, 2),
                                                  (3, 3),
                                                  (4, 4),
                                                  (5, 5);

INSERT INTO `JOB` (id, position, salary) VALUES
                                                   (1, 'Steward', 2000),
                                                   (2, 'Check-IN assistant', 3000),
                                                   (3, 'Airline baggage handler', 2600),
                                                   (4, 'Airline reservation agent', 3200),
                                                   (5, 'Avionics technician', 6000),
                                                   (9, 'Pilot', 7000);

INSERT INTO `LUGGAGE` (id, passenger_id, flight_id, weight, special_mentions) VALUES
                                                                                             (1, 37, 2, 1, ''),
                                                                                             (2, 37, 2, 2, ''),
                                                                                             (3, 43, 5, 2, ''),
                                                                                             (4, 34, 3, 1, ''),
                                                                                             (5, 40, 5, 1, ''),
                                                                                             (6, 41, 5, 1, ''),
                                                                                             (7, 44, 4, 2, ''),
                                                                                             (8, 34, 1, 1, ''),
                                                                                             (9, 40, 5, 1, ''),
                                                                                             (10, 48, 5, 2, '');

INSERT INTO `PASSENGER` (id, flight_id, first_name, last_name, country, id_number, phone, email, `ACCOUNT_ID`) VALUES
                                                                                                                                   (34, 3, 'Ciro', 'Barcke', 4, '62588846630434', '+1 704 144 2289', 'cbarcke0@bluehost.com', 2),
                                                                                                                                   (35, 3, 'Jaime', 'Iozefovich', 2, '57757093541283', '+33 767 134 4708', 'jiozefovich1@chicagotribune.com', 2),
                                                                                                                                   (36, 4, 'Zola', 'Piggott', 4, '51548017160458', '+992 541 743 9430', 'zpiggott2@home.pl', 4),
                                                                                                                                   (37, 1, 'Ashly', 'Messum', 5, '67859927772914', '+1 704 168 8294', 'amessum3@liveinternet.ru', 3),
                                                                                                                                   (38, 4, 'Page', 'Iacovozzo', 3, '59977547787846', '+86 710 714 6041', 'piacovozzo4@arstechnica.com', 5),
                                                                                                                                   (39, 1, 'Charity', 'Gidman', 4, '62925519543646', '+599 941 569 9173', 'cgidman5@macromedia.com', 1),
                                                                                                                                   (40, 4, 'Ernaline', 'Rainsbury', 1, '56383890369798', NULL, NULL, 2),
                                                                                                                                   (41, 2, 'Dirk', 'Sneyd', 5, '66105024751678', '+62 571 519 3284', 'dsneyd7@jigsy.com', 2),
                                                                                                                                   (42, 2, 'Wilfred', 'Kurten', 4, '63136789248061', '+55 554 928 4781', 'wkurten8@reddit.com', 5),
                                                                                                                                   (43, 3, 'Consalve', 'Rogge', 3, '56499063043020', '+86 489 124 7849', 'crogge9@live.com', 1),
                                                                                                                                   (44, 1, 'Berry', 'Butterly', 1, '58470173199115', '+44 617 937 9707', 'bbutterlya@mapquest.com', 2),
                                                                                                                                   (45, 1, 'Calley', 'Dewan', 5, '66751029803621', NULL, NULL, 4),
                                                                                                                                   (46, 4, 'Maxim', 'Syddie', 1, '64526865294340', '+234 649 625 5509', 'msyddiec@bing.com', 5),
                                                                                                                                   (47, 3, 'Alford', 'Livoir', 5, '60512084636225', '+66 480 721 7565', 'alivoird@guardian.co.uk', 5),
                                                                                                                                   (48, 4, 'Calla', 'Burne', 5, '58541640963239', '+56 215 564 0556', 'cburnee@i2i.jp', 3);

INSERT INTO `TICKET` (id, code, `CLIENT_ID`, flight_id, `CLASS`, `PRICE`) VALUES
                                                                                    (1, 123456, 37, 1, 1, 5500),
                                                                                    (2, 235354, 35, 3, 1, 2345),
                                                                                    (3, 887799, 41, 5, 2, 6000),
                                                                                    (4, 997654, 44, 2, 2, 6789),
                                                                                    (5, 232323, 34, 4, 1, 6786);

INSERT INTO `TICKET_PAYMENT` (`ID`, ticket_id, payment_method, date) VALUES
                                                                               (1, 1, 2, '2022-12-05 19:28:13'),
                                                                               (2, 2, 1, '2022-12-05 19:28:24'),
                                                                               (3, 3, 2, '2022-12-05 19:28:28'),
                                                                               (4, 1, 2, '2022-12-05 19:28:32'),
                                                                               (5, 4, 1, '2022-12-05 19:28:36'),
                                                                               (6, 5, 1, '2022-12-05 19:28:40');

INSERT INTO `TICKET_PAYMENT_CARD` (id, ticket_id, card_id) VALUES
                                                                     (1, 1, 3),
                                                                     (2, 5, 2),
                                                                     (3, 4, 1),
                                                                     (4, 5, 4),
                                                                     (5, 1, 5);

INSERT INTO `TICKET_PAYMENT_METHOD` (id, method) VALUES
                                                         (1, 'CASH'),
                                                         (2, 'CARD');


ALTER TABLE `ACCOUNT`
    ADD PRIMARY KEY (`ID`),
    ADD UNIQUE KEY `ACCOUNT_ID_PK` (`ID`);

ALTER TABLE `ACCOUNT_CARD`
    ADD PRIMARY KEY (`ID`),
    ADD UNIQUE KEY `TICKET_PAYMENT_CARD_PK` (`ID`),
    ADD KEY `ACCOUNT_CARD_ACCOUNT_FK` (`ACCOUNT_ID`);

ALTER TABLE `AIRPLANE`
    ADD PRIMARY KEY (id),
    ADD UNIQUE KEY `PLANE_PK` (id),
    ADD KEY `AIRPLANE_TYPE_FK` (type),
    ADD KEY `AIRPLANE_COUNTRY_FK` (country);

ALTER TABLE `AIRPLANE_MANUFACTURER`
    ADD PRIMARY KEY (id),
    ADD UNIQUE KEY `AIRPLANE_MANUFACTURER_PK` (id);

ALTER TABLE `AIRPLANE_TYPE`
    ADD PRIMARY KEY (id),
    ADD UNIQUE KEY `AIRPLANE_MANUFACTURER_PK` (id),
    ADD KEY `AIRPLANE_TYPE_MANUFACTURER_FK` (manufacturer);

ALTER TABLE `AIRPORT`
    ADD PRIMARY KEY (id),
    ADD UNIQUE KEY `AIRPORT_PK` (id),
    ADD UNIQUE KEY `AIRPORT_IATA_PK` (iata),
    ADD UNIQUE KEY `AIRPORT_ICAO_PK` (icao),
    ADD KEY `AIRPORT_CITY_ID` (city_id);

ALTER TABLE `AIRPORT_GATE`
    ADD PRIMARY KEY (`ID`),
    ADD UNIQUE KEY `AIRPORT_GATE_PK` (`ID`),
    ADD KEY `AIRPORT_GATE_AIRPORT_FK` (`AIRPORT`),
    ADD KEY `AIRPORT_GATE_TYPE_FK` (`TYPE`);

ALTER TABLE `AIRPORT_GATE_TYPE`
    ADD PRIMARY KEY (id);

ALTER TABLE `CITY`
    ADD PRIMARY KEY (id),
    ADD UNIQUE KEY `CITY_PK` (id),
    ADD UNIQUE KEY `NAME` (name),
    ADD KEY `CITY_COUNTRY_FK` (country);

ALTER TABLE `COUNTRY`
    ADD PRIMARY KEY (id),
    ADD UNIQUE KEY `COUNTRY_PK` (id);

ALTER TABLE `EMPLOYEE`
    ADD PRIMARY KEY (id),
    ADD UNIQUE KEY `EMPLOYEE_PK` (id),
    ADD KEY `EMPLOYEE_JOB_ID_FK` (job_id),
    ADD KEY `EMPLOYEE_CREW_ID_FK` (crew_id);

ALTER TABLE `FLIGHT`
    ADD PRIMARY KEY (`ID`),
    ADD UNIQUE KEY `FLIGHT_PK` (`ID`),
    ADD KEY `FLIGHT_DESTINATION_FK` (`DESTINATION_ID`),
    ADD KEY `FLIGHT_ORIGIN_FK` (`ORIGIN_ID`),
    ADD KEY `FLIGHT_PLANE_FK` (`PLANE_ID`),
    ADD KEY `FLIGHT_DESTINATION_GATE_FK` (`DESTINATION_GATE_ID`),
    ADD KEY `FLIGHT_ORIGIN_GATE_FK` (`ORIGIN_GATE_ID`);

ALTER TABLE `FLIGHT_CREW`
    ADD PRIMARY KEY (id),
    ADD UNIQUE KEY `FLIGHT_CREW_ID_PK` (id),
    ADD KEY `FLIGHT_CREW_FLIGHT_ID_FK` (flight_id);

ALTER TABLE `JOB`
    ADD PRIMARY KEY (id),
    ADD UNIQUE KEY `JOB_PK` (id);

ALTER TABLE `LUGGAGE`
    ADD PRIMARY KEY (id),
    ADD UNIQUE KEY `LUGGAGE_PK` (id) USING BTREE,
    ADD KEY `LUGGAGE_FLIGHT_FK` (flight_id) USING BTREE,
    ADD KEY `LUGGAGE_CLIENT_FK` (passenger_id);

ALTER TABLE `PASSENGER`
    ADD PRIMARY KEY (id),
    ADD UNIQUE KEY `CLIENT_PK` (id) USING BTREE,
    ADD KEY `PASSENGER_COUNTRY_FK` (country),
    ADD KEY `PASSENGER_FLIGHT_ID_FK` (flight_id),
    ADD KEY `PASSENGER_ACCOUNT_ID_FK` (`ACCOUNT_ID`);

ALTER TABLE `TICKET`
    ADD PRIMARY KEY (id),
    ADD UNIQUE KEY `TICKET_PK` (id),
    ADD KEY `TICKET_CLIENT_FK` (`CLIENT_ID`),
    ADD KEY `TICKET_FLIGHT_FK` (flight_id);

ALTER TABLE `TICKET_PAYMENT`
    ADD PRIMARY KEY (`ID`),
    ADD UNIQUE KEY `TICKET_PAYMENT_PK` (`ID`),
    ADD KEY `TICKET_PAYMENT_METHOD_fk` (payment_method),
    ADD KEY `TICKET_PAYMENT_TICKET_ID` (ticket_id);

ALTER TABLE `TICKET_PAYMENT_CARD`
    ADD PRIMARY KEY (id),
    ADD UNIQUE KEY `TICKET_PAYMENT_CARD_PK` (id),
    ADD KEY `TICKET_PAYMENT_TICKET_FK` (ticket_id),
    ADD KEY `TICKET_PAYMENT_CARD_FK` (card_id);

ALTER TABLE `TICKET_PAYMENT_METHOD`
    ADD PRIMARY KEY (id),
    ADD UNIQUE KEY `TICKET_PAYMENT_METHOD_PK` (id);

ALTER TABLE `ACCOUNT_CARD`
    ADD CONSTRAINT `ACCOUNT_CARD_ACCOUNT_FK` FOREIGN KEY (`ACCOUNT_ID`) REFERENCES `ACCOUNT` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `AIRPLANE`
    ADD CONSTRAINT `AIRPLANE_COUNTRY_FK` FOREIGN KEY (country) REFERENCES `COUNTRY` (id) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `AIRPLANE_TYPE_FK` FOREIGN KEY (type) REFERENCES `AIRPLANE_TYPE` (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `AIRPLANE_TYPE`
    ADD CONSTRAINT `AIRPLANE_TYPE_MANUFACTURER_FK` FOREIGN KEY (manufacturer) REFERENCES `AIRPLANE_MANUFACTURER` (id);

ALTER TABLE `AIRPORT`
    ADD CONSTRAINT `AIRPORT_CITY_ID` FOREIGN KEY (city_id) REFERENCES `CITY` (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `AIRPORT_GATE`
    ADD CONSTRAINT `AIRPORT_GATE_AIRPORT_FK` FOREIGN KEY (`AIRPORT`) REFERENCES `AIRPORT` (id) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `AIRPORT_GATE_TYPE_FK` FOREIGN KEY (`TYPE`) REFERENCES `AIRPORT_GATE_TYPE` (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `CITY`
    ADD CONSTRAINT `CITY_COUNTRY_FK` FOREIGN KEY (country) REFERENCES `COUNTRY` (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `EMPLOYEE`
    ADD CONSTRAINT `EMPLOYEE_CREW_ID_FK` FOREIGN KEY (crew_id) REFERENCES `FLIGHT_CREW` (id) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `EMPLOYEE_JOB_ID_FK` FOREIGN KEY (job_id) REFERENCES `JOB` (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `FLIGHT`
    ADD CONSTRAINT `FLIGHT_DESTINATION_FK` FOREIGN KEY (`DESTINATION_ID`) REFERENCES `AIRPORT` (id) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `FLIGHT_DESTINATION_GATE_FK` FOREIGN KEY (`DESTINATION_GATE_ID`) REFERENCES `AIRPORT_GATE` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `FLIGHT_ORIGIN_FK` FOREIGN KEY (`ORIGIN_ID`) REFERENCES `AIRPORT` (id) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `FLIGHT_ORIGIN_GATE_FK` FOREIGN KEY (`ORIGIN_GATE_ID`) REFERENCES `AIRPORT_GATE` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `FLIGHT_PLANE_FK` FOREIGN KEY (`PLANE_ID`) REFERENCES `AIRPLANE` (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `FLIGHT_CREW`
    ADD CONSTRAINT `FLIGHT_CREW_FLIGHT_ID_FK` FOREIGN KEY (flight_id) REFERENCES `FLIGHT` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `LUGGAGE`
    ADD CONSTRAINT `LUGGAGE_CLIENT_FK` FOREIGN KEY (passenger_id) REFERENCES `PASSENGER` (id) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `LUGGAGE_FLIGHT_FK` FOREIGN KEY (flight_id) REFERENCES `FLIGHT` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `PASSENGER`
    ADD CONSTRAINT `PASSENGER_ACCOUNT_ID_FK` FOREIGN KEY (`ACCOUNT_ID`) REFERENCES `ACCOUNT` (`ID`),
    ADD CONSTRAINT `PASSENGER_COUNTRY_FK` FOREIGN KEY (country) REFERENCES `COUNTRY` (id) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `PASSENGER_FLIGHT_ID_FK` FOREIGN KEY (flight_id) REFERENCES `FLIGHT` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `TICKET`
    ADD CONSTRAINT `TICKET_CLIENT_FK` FOREIGN KEY (`CLIENT_ID`) REFERENCES `PASSENGER` (id) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `TICKET_FLIGHT_FK` FOREIGN KEY (flight_id) REFERENCES `FLIGHT` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `TICKET_PAYMENT`
    ADD CONSTRAINT `TICKET_PAYMENT_METHOD_fk` FOREIGN KEY (payment_method) REFERENCES `TICKET_PAYMENT_METHOD` (id) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `TICKET_PAYMENT_TICKET_ID` FOREIGN KEY (ticket_id) REFERENCES `TICKET` (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `TICKET_PAYMENT_CARD`
    ADD CONSTRAINT `TICKET_PAYMENT_CARD_FK` FOREIGN KEY (card_id) REFERENCES `ACCOUNT_CARD` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `TICKET_PAYMENT_TICKET_FK` FOREIGN KEY (ticket_id) REFERENCES `TICKET` (id) ON DELETE CASCADE ON UPDATE CASCADE;