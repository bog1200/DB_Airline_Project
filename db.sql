SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `ACCOUNT` (
                           `ID` int(11) NOT NULL,
                           `EMAIL` varchar(100) NOT NULL,
                           `PASSWORD` varchar(255) NOT NULL,
                           `FIRST_NAME` varchar(100) NOT NULL,
                           `LAST_NAME` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `ACCOUNT` (`ID`, `EMAIL`, `PASSWORD`, `FIRST_NAME`, `LAST_NAME`) VALUES
                                                                                 (1, 'abettis0@newyorker.com', '24nP0suMY', 'Andria', 'Bettis'),
                                                                                 (2, 'pwhyke1@yandex.ru', 'aMXovCaCf', 'Pet', 'Whyke'),
                                                                                 (3, 'brides2@miibeian.gov.cn', 'IsReItDl', 'Bobbee', 'Rides'),
                                                                                 (4, 'gsinfield3@ebay.com', 'Z7aAtnNTfH', 'Gertruda', 'Sinfield'),
                                                                                 (5, 'ovandevlies4@drupal.org', 'i04zD5GDJhUq', 'Olly', 'Van de Vlies');

CREATE TABLE `ACCOUNT_CARD` (
                                `ID` int(11) NOT NULL,
                                `ACCOUNT_ID` int(11) NOT NULL,
                                `CARDHOLDER_FIRST_NAME` varchar(100) NOT NULL,
                                `CARDHOLDER_LAST_NAME` varchar(100) NOT NULL,
                                `CARD_NUMBER` varchar(19) NOT NULL,
                                `EXP_MONTH` int(2) NOT NULL,
                                `EXP_YEAR` int(4) NOT NULL,
                                `CVV` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `ACCOUNT_CARD` (`ID`, `ACCOUNT_ID`, `CARDHOLDER_FIRST_NAME`, `CARDHOLDER_LAST_NAME`, `CARD_NUMBER`, `EXP_MONTH`, `EXP_YEAR`, `CVV`) VALUES
                                                                                                                                                    (1, 1, 'Gav', 'Dilloway', '5540853614858916', 4, 2022, 459),
                                                                                                                                                    (2, 2, 'Bartholomeo', 'Maclaine', '201501196432375', 1, 2025, 220),
                                                                                                                                                    (3, 3, 'Alfie', 'Jurzyk', '3567003242251075', 1, 2023, 737),
                                                                                                                                                    (4, 4, 'Fayre', 'Brazur', '4017954530610642', 9, 2023, 530),
                                                                                                                                                    (5, 5, 'Estel', 'Humphris', '3576589086121340', 10, 2025, 850);

CREATE TABLE `AIRPLANE` (
                            `ID` int(10) NOT NULL,
                            `REG_NUMBER` varchar(10) NOT NULL,
                            `TYPE` int(11) NOT NULL,
                            `COUNTRY` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `AIRPLANE` (`ID`, `REG_NUMBER`, `TYPE`, `COUNTRY`) VALUES
                                                                   (1, 'N18712', 1, 1),
                                                                   (2, 'N12993', 5, 5),
                                                                   (3, 'N98219', 4, 4),
                                                                   (4, 'N19829', 3, 2),
                                                                   (5, 'N89041', 2, 1),
                                                                   (6, 'N27171', 1, 3),
                                                                   (7, 'N18281', 2, 4);

CREATE TABLE `AIRPLANE_MANUFACTURER` (
                                         `ID` int(11) NOT NULL,
                                         `NAME` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `AIRPLANE_MANUFACTURER` (`ID`, `NAME`) VALUES
                                                       (1, 'Boeing'),
                                                       (2, 'Airbus');

CREATE TABLE `AIRPLANE_TYPE` (
                                 `ID` int(10) NOT NULL,
                                 `NAME` varchar(100) NOT NULL,
                                 `MANUFACTURER` int(11) NOT NULL,
                                 `RANGE_KM` int(5) NOT NULL,
                                 `SEATS` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `AIRPLANE_TYPE` (`ID`, `NAME`, `MANUFACTURER`, `RANGE_KM`, `SEATS`) VALUES
                                                                                    (1, 'B-737', 1, 5000, 153),
                                                                                    (2, 'A320', 2, 7000, 120),
                                                                                    (3, 'A340', 2, 8000, 200),
                                                                                    (4, 'B-720', 1, 3500, 128),
                                                                                    (5, 'B-743', 1, 7500, 174);

CREATE TABLE `AIRPORT` (
                           `ID` int(11) NOT NULL,
                           `NAME` varchar(100) NOT NULL,
                           `CITY_ID` int(11) NOT NULL,
                           `IATA` varchar(3) NOT NULL,
                           `ICAO` varchar(4) NOT NULL,
                           `ADDRESS` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `AIRPORT` (`ID`, `NAME`, `CITY_ID`, `IATA`, `ICAO`, `ADDRESS`) VALUES
                                                                               (1, 'Otopeni International Airport', 1, 'OTP', 'LROP', '-'),
                                                                               (2, 'London Heathrow Airport', 6, 'LHR', 'EGLL', 'Longford TW6 1EW'),
                                                                               (3, 'Paris Charles de Gaulle Airport', 9, 'CDG', 'LFPG', '95700 Roissy-en-France'),
                                                                               (4, 'John F. Kennedy International Airport', 8, 'JFK', 'KJFK', 'Queens, NY 11430'),
                                                                               (5, 'Bern Airport', 7, 'BRN', 'LSMB', 'Flugplatzstrasse 31, 3123 Belp');

CREATE TABLE `AIRPORT_GATE` (
                                `ID` int(11) NOT NULL,
                                `AIRPORT` int(11) NOT NULL,
                                `NUMBER` int(11) NOT NULL,
                                `TYPE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `AIRPORT_GATE` (`ID`, `AIRPORT`, `NUMBER`, `TYPE`) VALUES
                                                                   (1, 1, 102, 2),
                                                                   (2, 1, 108, 3),
                                                                   (3, 4, 100, 4),
                                                                   (4, 5, 79, 1),
                                                                   (5, 1, 128, 3),
                                                                   (6, 3, 19, 1),
                                                                   (7, 2, 89, 2);

CREATE TABLE `AIRPORT_GATE_TYPE` (
                                     `ID` int(11) NOT NULL,
                                     `TYPE` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `AIRPORT_GATE_TYPE` (`ID`, `TYPE`) VALUES
                                                   (1, 'Small'),
                                                   (2, 'Medium'),
                                                   (3, 'Large'),
                                                   (4, 'Jumbo');

CREATE TABLE `CITY` (
                        `ID` int(11) NOT NULL,
                        `NAME` varchar(100) NOT NULL,
                        `COUNTRY` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `CITY` (`ID`, `NAME`, `COUNTRY`) VALUES
                                                 (1, 'Bucharest', 1),
                                                 (2, 'Iasi', 1),
                                                 (6, 'London', 2),
                                                 (7, 'Bern', 5),
                                                 (8, 'New York', 4),
                                                 (9, 'Paris', 3);

CREATE TABLE `COUNTRY` (
                           `ID` int(11) NOT NULL,
                           `ICAO` varchar(2) NOT NULL,
                           `NAME` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `COUNTRY` (`ID`, `ICAO`, `NAME`) VALUES
                                                 (1, 'RO', 'Romania'),
                                                 (2, 'GB', 'United Kingdom'),
                                                 (3, 'FR', 'France'),
                                                 (4, 'US', 'United States of America'),
                                                 (5, 'CH', 'Switzerland');

CREATE TABLE `EMPLOYEE` (
                            `ID` int(11) NOT NULL,
                            `FIRST_NAME` varchar(100) NOT NULL,
                            `LAST_NAME` varchar(100) NOT NULL,
                            `PHONE` int(10) NOT NULL,
                            `EMAIL` varchar(100) NOT NULL,
                            `JOB_ID` int(11) NOT NULL,
                            `CREW_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `EMPLOYEE` (`ID`, `FIRST_NAME`, `LAST_NAME`, `PHONE`, `EMAIL`, `JOB_ID`, `CREW_ID`) VALUES
                                                                                                    (1, 'Ioan-Alexandru', 'Stan-Soponaru', 723647588, 'stan_soponaru_ioan_alexandru_02@mymailhotmail.com', 9, 2),
                                                                                                    (2, 'Bogdan-Laurentiu', 'Stefanescu', 226874644, 'bogdan@yahoo.com', 1, 4),
                                                                                                    (3, 'George-Razvan', 'Cristea', 999666969, 'razvan_cristeaaaa@mymail.com', 9, 5),
                                                                                                    (4, 'Vasile', 'Vasile', 987654321, 'Vasile@tehnicianul.com', 1, 3),
                                                                                                    (5, 'Ion', 'Stan-Pățitul', 985746352, 'ampățit_o@gmail.com', 5, 1);

CREATE TABLE `FLIGHT` (
                          `ID` int(11) NOT NULL,
                          `PLANE_ID` int(11) NOT NULL,
                          `ORIGIN_ID` int(11) NOT NULL,
                          `DESTINATION_ID` int(11) NOT NULL,
                          `ORIGIN_GATE_ID` int(11) NOT NULL,
                          `DESTINATION_GATE_ID` int(11) NOT NULL,
                          `DEPARTURE_TIME` datetime NOT NULL,
                          `ARRIVAL_TIME` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `FLIGHT` (`ID`, `PLANE_ID`, `ORIGIN_ID`, `DESTINATION_ID`, `ORIGIN_GATE_ID`, `DESTINATION_GATE_ID`, `DEPARTURE_TIME`, `ARRIVAL_TIME`) VALUES
                                                                                                                                                      (1, 1, 4, 1, 2, 1, '2022-12-04 15:11:36', '2022-12-04 18:10:46'),
                                                                                                                                                      (2, 7, 4, 5, 4, 6, '2022-12-04 12:15:09', '2022-12-04 19:53:09'),
                                                                                                                                                      (3, 4, 2, 5, 3, 3, '2022-12-07 15:13:51', '2022-12-07 19:44:51'),
                                                                                                                                                      (4, 1, 5, 2, 1, 7, '2022-12-04 18:14:59', '2022-12-04 22:11:59'),
                                                                                                                                                      (5, 3, 3, 1, 2, 1, '2022-12-06 15:15:26', '2022-12-06 17:35:26');

CREATE TABLE `FLIGHT_CREW` (
                               `ID` int(11) NOT NULL,
                               `FLIGHT_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `FLIGHT_CREW` (`ID`, `FLIGHT_ID`) VALUES
                                                  (1, 1),
                                                  (2, 2),
                                                  (3, 3),
                                                  (4, 4),
                                                  (5, 5);

CREATE TABLE `JOB` (
                       `ID` int(11) NOT NULL,
                       `POSITION` varchar(100) NOT NULL,
                       `SALARY` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `JOB` (`ID`, `POSITION`, `SALARY`) VALUES
                                                   (1, 'Steward', 2000),
                                                   (2, 'Check-IN assistant', 3000),
                                                   (3, 'Airline baggage handler', 2600),
                                                   (4, 'Airline reservation agent', 3200),
                                                   (5, 'Avionics technician', 6000),
                                                   (9, 'Pilot', 7000);

CREATE TABLE `LUGGAGE` (
                           `ID` int(11) NOT NULL,
                           `PASSENGER_ID` int(11) NOT NULL,
                           `FLIGHT_ID` int(11) NOT NULL,
                           `TYPE_ID` int(11) NOT NULL,
                           `SPECIAL_MENTIONS` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `LUGGAGE` (`ID`, `PASSENGER_ID`, `FLIGHT_ID`, `TYPE_ID`, `SPECIAL_MENTIONS`) VALUES
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

CREATE TABLE `PASSENGER` (
                             `ID` int(11) NOT NULL,
                             `FLIGHT_ID` int(11) NOT NULL,
                             `FIRST_NAME` varchar(100) NOT NULL,
                             `LAST_NAME` varchar(100) NOT NULL,
                             `COUNTRY` int(11) NOT NULL,
                             `ID_NUMBER` varchar(20) NOT NULL,
                             `PHONE` varchar(20) DEFAULT NULL,
                             `EMAIL` varchar(100) DEFAULT NULL,
                             `ACCOUNT_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `PASSENGER` (`ID`, `FLIGHT_ID`, `FIRST_NAME`, `LAST_NAME`, `COUNTRY`, `ID_NUMBER`, `PHONE`, `EMAIL`, `ACCOUNT_ID`) VALUES
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

CREATE TABLE `TICKET` (
                          `ID` int(11) NOT NULL,
                          `CODE` int(11) NOT NULL,
                          `ACCOUNT_ID` int(11) NOT NULL,
                          `CLIENT_ID` int(11) NOT NULL,
                          `FLIGHT_ID` int(11) NOT NULL,
                          `CLASS` int(11) NOT NULL,
                          `PRICE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `TICKET` (`ID`, `CODE`, `ACCOUNT_ID`, `CLIENT_ID`, `FLIGHT_ID`, `CLASS`, `PRICE`) VALUES
    (1,123456,1,37,1,1,5500),
    (2,235354,5,35,3,1,2345),
    (3,887799,1,41,5,2,6000),
    (4,997654,4,44,2,2,6789),
    (5,232323,3,34,4,1,6786);


CREATE TABLE `TICKET_PAYMENT` (
                                  `ID` int(11) NOT NULL,
                                  `TICKET_ID` int(11) NOT NULL,
                                  `PAYMENT_METHOD` int(11) NOT NULL,
                                  `DATE` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `TICKET_PAYMENT` (`ID`, `TICKET_ID`, `PAYMENT_METHOD`, `DATE`) VALUES
                                                                               (1, 1, 2, '2022-12-05 19:28:13'),
                                                                               (2, 2, 1, '2022-12-05 19:28:24'),
                                                                               (3, 3, 2, '2022-12-05 19:28:28'),
                                                                               (4, 1, 2, '2022-12-05 19:28:32'),
                                                                               (5, 4, 1, '2022-12-05 19:28:36'),
                                                                               (6, 5, 1, '2022-12-05 19:28:40');

CREATE TABLE `TICKET_PAYMENT_CARD` (
                                       `ID` int(11) NOT NULL,
                                       `TICKET_ID` int(11) NOT NULL,
                                       `CARD_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `TICKET_PAYMENT_CARD` (`ID`, `TICKET_ID`, `CARD_ID`) VALUES
                                                                     (1, 1, 3),
                                                                     (2, 5, 2),
                                                                     (3, 4, 1),
                                                                     (4, 5, 4),
                                                                     (5, 1, 5);

CREATE TABLE `TICKET_PAYMENT_METHOD` (
                                         `ID` int(11) NOT NULL,
                                         `METHOD` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `TICKET_PAYMENT_METHOD` (`ID`, `METHOD`) VALUES
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
    ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `PLANE_PK` (`ID`),
  ADD KEY `AIRPLANE_TYPE_FK` (`TYPE`),
  ADD KEY `AIRPLANE_COUNTRY_FK` (`COUNTRY`);

ALTER TABLE `AIRPLANE_MANUFACTURER`
    ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `AIRPLANE_MANUFACTURER_PK` (`ID`);

ALTER TABLE `AIRPLANE_TYPE`
    ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `AIRPLANE_MANUFACTURER_PK` (`ID`),
  ADD KEY `AIRPLANE_TYPE_MANUFACTURER_FK` (`MANUFACTURER`);

ALTER TABLE `AIRPORT`
    ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `AIRPORT_PK` (`ID`),
  ADD UNIQUE KEY `AIRPORT_IATA_PK` (`IATA`),
  ADD UNIQUE KEY `AIRPORT_ICAO_PK` (`ICAO`),
  ADD KEY `AIRPORT_CITY_ID` (`CITY_ID`);

ALTER TABLE `AIRPORT_GATE`
    ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `AIRPORT_GATE_PK` (`ID`),
  ADD KEY `AIRPORT_GATE_AIRPORT_FK` (`AIRPORT`),
  ADD KEY `AIRPORT_GATE_TYPE_FK` (`TYPE`);

ALTER TABLE `AIRPORT_GATE_TYPE`
    ADD PRIMARY KEY (`ID`);

ALTER TABLE `CITY`
    ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `CITY_PK` (`ID`),
  ADD UNIQUE KEY `NAME` (`NAME`),
  ADD KEY `CITY_COUNTRY_FK` (`COUNTRY`);

ALTER TABLE `COUNTRY`
    ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `COUNTRY_PK` (`ID`);

ALTER TABLE `EMPLOYEE`
    ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `EMPLOYEE_PK` (`ID`),
  ADD KEY `EMPLOYEE_JOB_ID_FK` (`JOB_ID`),
  ADD KEY `EMPLOYEE_CREW_ID_FK` (`CREW_ID`);

ALTER TABLE `FLIGHT`
    ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `FLIGHT_PK` (`ID`),
  ADD KEY `FLIGHT_DESTINATION_FK` (`DESTINATION_ID`),
  ADD KEY `FLIGHT_ORIGIN_FK` (`ORIGIN_ID`),
  ADD KEY `FLIGHT_PLANE_FK` (`PLANE_ID`),
  ADD KEY `FLIGHT_DESTINATION_GATE_FK` (`DESTINATION_GATE_ID`),
  ADD KEY `FLIGHT_ORIGIN_GATE_FK` (`ORIGIN_GATE_ID`);

ALTER TABLE `FLIGHT_CREW`
    ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `FLIGHT_CREW_ID_PK` (`ID`),
  ADD KEY `FLIGHT_CREW_FLIGHT_ID_FK` (`FLIGHT_ID`);

ALTER TABLE `JOB`
    ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `JOB_PK` (`ID`);

ALTER TABLE `LUGGAGE`
    ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `LUGGAGE_PK` (`ID`) USING BTREE,
  ADD KEY `LUGGAGE_FLIGHT_FK` (`FLIGHT_ID`) USING BTREE,
  ADD KEY `LUGGAGE_CLIENT_FK` (`PASSENGER_ID`);

ALTER TABLE `PASSENGER`
    ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `CLIENT_PK` (`ID`) USING BTREE,
  ADD KEY `PASSENGER_COUNTRY_FK` (`COUNTRY`),
  ADD KEY `PASSENGER_FLIGHT_ID_FK` (`FLIGHT_ID`),
  ADD KEY `PASSENGER_ACCOUNT_ID_FK` (`ACCOUNT_ID`);

ALTER TABLE `TICKET`
    ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `TICKET_PK` (`ID`),
  ADD KEY `TICKET_CLIENT_FK` (`CLIENT_ID`),
  ADD KEY `TICKET_FLIGHT_FK` (`FLIGHT_ID`);

ALTER TABLE `TICKET_PAYMENT`
    ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `TICKET_PAYMENT_PK` (`ID`),
  ADD KEY `TICKET_PAYMENT_METHOD_fk` (`PAYMENT_METHOD`),
  ADD KEY `TICKET_PAYMENT_TICKET_ID` (`TICKET_ID`);

ALTER TABLE `TICKET_PAYMENT_CARD`
    ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `TICKET_PAYMENT_CARD_PK` (`ID`),
  ADD KEY `TICKET_PAYMENT_TICKET_FK` (`TICKET_ID`),
  ADD KEY `TICKET_PAYMENT_CARD_FK` (`CARD_ID`);

ALTER TABLE `TICKET_PAYMENT_METHOD`
    ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `TICKET_PAYMENT_METHOD_PK` (`ID`);


ALTER TABLE `ACCOUNT`
    MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `ACCOUNT_CARD`
    MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `AIRPLANE`
    MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

ALTER TABLE `AIRPLANE_MANUFACTURER`
    MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `AIRPLANE_TYPE`
    MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `AIRPORT`
    MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `AIRPORT_GATE`
    MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

ALTER TABLE `AIRPORT_GATE_TYPE`
    MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `CITY`
    MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

ALTER TABLE `COUNTRY`
    MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `EMPLOYEE`
    MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `FLIGHT`
    MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `FLIGHT_CREW`
    MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `JOB`
    MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

ALTER TABLE `LUGGAGE`
    MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

ALTER TABLE `PASSENGER`
    MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

ALTER TABLE `TICKET`
    MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `TICKET_PAYMENT`
    MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `TICKET_PAYMENT_CARD`
    MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `TICKET_PAYMENT_METHOD`
    MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;


ALTER TABLE `ACCOUNT_CARD`
    ADD CONSTRAINT `ACCOUNT_CARD_ACCOUNT_FK` FOREIGN KEY (`ACCOUNT_ID`) REFERENCES `ACCOUNT` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `AIRPLANE`
    ADD CONSTRAINT `AIRPLANE_COUNTRY_FK` FOREIGN KEY (`COUNTRY`) REFERENCES `COUNTRY` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `AIRPLANE_TYPE_FK` FOREIGN KEY (`TYPE`) REFERENCES `AIRPLANE_TYPE` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `AIRPLANE_TYPE`
    ADD CONSTRAINT `AIRPLANE_TYPE_MANUFACTURER_FK` FOREIGN KEY (`MANUFACTURER`) REFERENCES `AIRPLANE_MANUFACTURER` (`ID`);

ALTER TABLE `AIRPORT`
    ADD CONSTRAINT `AIRPORT_CITY_ID` FOREIGN KEY (`CITY_ID`) REFERENCES `CITY` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `AIRPORT_GATE`
    ADD CONSTRAINT `AIRPORT_GATE_AIRPORT_FK` FOREIGN KEY (`AIRPORT`) REFERENCES `AIRPORT` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `AIRPORT_GATE_TYPE_FK` FOREIGN KEY (`TYPE`) REFERENCES `AIRPORT_GATE_TYPE` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `CITY`
    ADD CONSTRAINT `CITY_COUNTRY_FK` FOREIGN KEY (`COUNTRY`) REFERENCES `COUNTRY` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `EMPLOYEE`
    ADD CONSTRAINT `EMPLOYEE_CREW_ID_FK` FOREIGN KEY (`CREW_ID`) REFERENCES `FLIGHT_CREW` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `EMPLOYEE_JOB_ID_FK` FOREIGN KEY (`JOB_ID`) REFERENCES `JOB` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `FLIGHT`
    ADD CONSTRAINT `FLIGHT_DESTINATION_FK` FOREIGN KEY (`DESTINATION_ID`) REFERENCES `AIRPORT` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FLIGHT_DESTINATION_GATE_FK` FOREIGN KEY (`DESTINATION_GATE_ID`) REFERENCES `AIRPORT_GATE` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FLIGHT_ORIGIN_FK` FOREIGN KEY (`ORIGIN_ID`) REFERENCES `AIRPORT` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FLIGHT_ORIGIN_GATE_FK` FOREIGN KEY (`ORIGIN_GATE_ID`) REFERENCES `AIRPORT_GATE` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FLIGHT_PLANE_FK` FOREIGN KEY (`PLANE_ID`) REFERENCES `AIRPLANE` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `FLIGHT_CREW`
    ADD CONSTRAINT `FLIGHT_CREW_FLIGHT_ID_FK` FOREIGN KEY (`FLIGHT_ID`) REFERENCES `FLIGHT` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `LUGGAGE`
    ADD CONSTRAINT `LUGGAGE_CLIENT_FK` FOREIGN KEY (`PASSENGER_ID`) REFERENCES `PASSENGER` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `LUGGAGE_FLIGHT_FK` FOREIGN KEY (`FLIGHT_ID`) REFERENCES `FLIGHT` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `PASSENGER`
    ADD CONSTRAINT `PASSENGER_ACCOUNT_ID_FK` FOREIGN KEY (`ACCOUNT_ID`) REFERENCES `ACCOUNT` (`ID`),
  ADD CONSTRAINT `PASSENGER_COUNTRY_FK` FOREIGN KEY (`COUNTRY`) REFERENCES `COUNTRY` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `PASSENGER_FLIGHT_ID_FK` FOREIGN KEY (`FLIGHT_ID`) REFERENCES `FLIGHT` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `TICKET`
    ADD CONSTRAINT `TICKET_CLIENT_FK` FOREIGN KEY (`CLIENT_ID`) REFERENCES `PASSENGER` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `TICKET_FLIGHT_FK` FOREIGN KEY (`FLIGHT_ID`) REFERENCES `FLIGHT` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `TICKET_PAYMENT`
    ADD CONSTRAINT `TICKET_PAYMENT_METHOD_fk` FOREIGN KEY (`PAYMENT_METHOD`) REFERENCES `TICKET_PAYMENT_METHOD` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `TICKET_PAYMENT_TICKET_ID` FOREIGN KEY (`TICKET_ID`) REFERENCES `TICKET` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `TICKET_PAYMENT_CARD`
    ADD CONSTRAINT `TICKET_PAYMENT_CARD_FK` FOREIGN KEY (`CARD_ID`) REFERENCES `ACCOUNT_CARD` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `TICKET_PAYMENT_TICKET_FK` FOREIGN KEY (`TICKET_ID`) REFERENCES `TICKET` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE OR REPLACE VIEW MONTHLY_INCOME_AIRPORT AS
SELECT
    MONTHNAME(FLIGHT.DEPARTURE_TIME) AS MONTH,
    YEAR(FLIGHT.DEPARTURE_TIME) AS YEAR,
    AIRPORT.NAME AS AIRPORT,
    COUNT(FLIGHT.ID) AS FLIGHTS,
    SUM(TICKET.PRICE) AS TOTAL_INCOME
FROM
    FLIGHT
        JOIN
    AIRPORT ON FLIGHT.DESTINATION_ID = AIRPORT.ID
        JOIN
    TICKET ON FLIGHT.ID = TICKET.FLIGHT_ID
GROUP BY MONTHNAME(FLIGHT.DEPARTURE_TIME) , AIRPORT.NAME
ORDER BY MONTHNAME(FLIGHT.DEPARTURE_TIME) , AIRPORT.NAME;

/* COUNT ARRIVING AND DEPARTING PASSENGERS*
   ...  AS ARRIVING_PASSENGERS,
   ...  AS DEPARTING_PASSENGERS
   */
CREATE OR REPLACE VIEW MONTHLY_PASSENGER_COUNT AS
SELECT
    MONTHNAME(FLIGHT.DEPARTURE_TIME) AS MONTH,
    YEAR(FLIGHT.DEPARTURE_TIME) AS YEAR,
    AIRPORT.NAME AS AIRPORT,
    (SELECT COUNT (*) FROM TICKET WHERE FLIGHT_ID = ANY(SELECT ID FROM FLIGHT WHERE DESTINATION_ID = AIRPORT.ID )) AS ARRIVING_PASSENGERS,
    (SELECT COUNT (*) FROM TICKET WHERE FLIGHT_ID = ANY(SELECT ID FROM FLIGHT WHERE  ORIGIN_ID = AIRPORT.ID )) AS DEPARTING_PASSENGERS
FROM
    FLIGHT
        JOIN
    AIRPORT ON FLIGHT.DESTINATION_ID = AIRPORT.ID
    JOIN
    TICKET ON FLIGHT.ID = TICKET.FLIGHT_ID
GROUP BY MONTHNAME(FLIGHT.DEPARTURE_TIME) , AIRPORT.NAME
ORDER BY MONTHNAME(FLIGHT.DEPARTURE_TIME) , AIRPORT.NAME;

CREATE OR REPLACE VIEW TOP_AIRPORT_PASSENGERS AS
SELECT
    YEAR(FLIGHT.DEPARTURE_TIME) AS YEAR,
    AIRPORT.NAME AS AIRPORT,
    COUNT(TICKET.ID) AS PASSENGERS
FROM
    TICKET
        JOIN
    FLIGHT ON TICKET.FLIGHT_ID = FLIGHT.ID
        JOIN
    AIRPORT ON FLIGHT.DESTINATION_ID = AIRPORT.ID
GROUP BY AIRPORT.NAME
ORDER BY COUNT(TICKET.ID) DESC;

CREATE OR REPLACE VIEW TOP_ACCOUNTS AS
    SELECT
        ACCOUNT.ID AS ACCOUNT_ID,
        ACCOUNT.FIRST_NAME AS FIRST_NAME,
        ACCOUNT.LAST_NAME AS LAST_NAME,
        COUNT(TICKET.ID) AS TICKETS_BOUGHT,
        SUM(TICKET.PRICE) AS TOTAL_INCOME
    FROM
        TICKET
            JOIN
        FLIGHT ON TICKET.FLIGHT_ID = FLIGHT.ID
            JOIN
        ACCOUNT ON TICKET.ACCOUNT_ID = ACCOUNT.ID
    GROUP BY ACCOUNT.ID
    ORDER BY TOTAL_INCOME DESC;

CREATE OR REPLACE VIEW TICKETS_PER_FLIGHT AS
SELECT
    FLIGHT.ID AS FLIGHT_ID,
    FLIGHT.DEPARTURE_TIME AS DEPARTURE_TIME,
    FLIGHT.ARRIVAL_TIME AS ARRIVAL_TIME,
    FLIGHT.DESTINATION_ID AS DESTINATION_ID,
    FLIGHT.ORIGIN_ID AS ORIGIN_ID,
    COUNT(TICKET.ID) AS TICKETS_SOLD,
    AIRPLANE_TYPE.SEATS AS SEATS,
    /*
     precentage of tickets sold for each flight (tickets sold / plane type capacity)
     */
    CONCAT((COUNT(TICKET.ID) / AIRPLANE_TYPE.SEATS) * 100 ,'%') AS TICKETS_SOLD_PERCENTAGE



FROM
    TICKET
        JOIN
   FLIGHT ON TICKET.FLIGHT_ID = FLIGHT.ID
        JOIN
    AIRPLANE ON FLIGHT.PLANE_ID = AIRPLANE.ID
        JOIN
    AIRPLANE_TYPE ON AIRPLANE.ID = AIRPLANE_TYPE.ID

GROUP BY FLIGHT.ID
ORDER BY FLIGHT.ID;

CREATE OR REPLACE VIEW PAYMENT_STATISTICS AS
SELECT
TICKET_PAYMENT_METHOD.METHOD AS PAYMENT_METHOD,
COUNT(TICKET_PAYMENT.ID) AS TICKETS_SOLD,
SUM(TICKET.PRICE) AS TOTAL_INCOME,
/*
 precentage from all payments (total income / all payments)
 */
COUNT(TICKET_PAYMENT.ID) / (SELECT COUNT(*) FROM TICKET_PAYMENT) * 100 AS PAYMENT_PERCENTAGE



FROM
TICKET_PAYMENT
JOIN
TICKET_PAYMENT_METHOD ON TICKET_PAYMENT.PAYMENT_METHOD = TICKET_PAYMENT_METHOD.ID
JOIN
TICKET ON TICKET_PAYMENT.TICKET_ID = TICKET.ID
GROUP BY TICKET_PAYMENT_METHOD.METHOD;

CREATE OR REPLACE VIEW LUGGAGE_STATISTICS AS
SELECT
    LUGGAGE.FLIGHT_ID AS FLIGHT_ID,
    COUNT(LUGGAGE.ID) AS LUGGAGE_COUNT,
    COUNT(PASSENGER_ID) AS PASSENGERS_WITH_LUGGAGE,
    /*
     precentage from all luggage (nr luggage / passangers)
     */
    CONCAT((COUNT(LUGGAGE.ID) / (SELECT COUNT(*) FROM TICKET)) * 100 ,'%') AS LUGGAGE_PER_PASSENGER,
    AIRPLANE_TYPE.SEATS AS PLANE_CAPACITY,
    CONCAT((COUNT(LUGGAGE.ID) / AIRPLANE_TYPE.SEATS) * 100 ,'%') AS LUGGAGE_PER_PLANE


FROM
    LUGGAGE
        JOIN
    FLIGHT ON LUGGAGE.FLIGHT_ID = FLIGHT.ID
        JOIN
    PASSENGER ON LUGGAGE.PASSENGER_ID = PASSENGER.ID
        JOIN
    AIRPLANE ON FLIGHT.PLANE_ID = AIRPLANE.ID
        JOIN
    AIRPLANE_TYPE ON AIRPLANE.ID = AIRPLANE_TYPE.ID
    group by LUGGAGE.FLIGHT_ID;

CREATE OR REPLACE VIEW PREFFERED_DESTINATIONS AS
# select the top 5 destinations
SELECT
    AIRPORT.NAME AS AIRPORT,
    CITY.NAME AS CITY,
    COUNTRY.NAME AS COUNTRY,
    COUNT(TICKET.ID) AS TICKETS_SOLD,
FROM
    TICKET
        JOIN
    FLIGHT ON TICKET.FLIGHT_ID = FLIGHT.ID
        JOIN
    AIRPORT ON FLIGHT.DESTINATION_ID = AIRPORT.ID
        JOIN
    CITY ON AIRPORT.CITY_ID = CITY.ID
        JOIN
    COUNTRY ON CITY.COUNTRY = COUNTRY.ID
GROUP BY AIRPORT.NAME
ORDER BY COUNT(TICKET.ID) DESC
LIMIT 5;


# SELECT
#     COUNTRY.NAME AS CNAME,
#     CITY.NAME,
#     (SELECT COUNT(PASSENGER.ID) FROM PASSENGER) AS PASS_COUNT
# FROM FLIGHT
#          JOIN COUNTRY ON FLIGHT.DESTINATION_ID = COUNTRY.ID
#          JOIN CITY ON FLIGHT.DESTINATION_ID = CITY.ID
# GROUP BY COUNTRY.NAME, CITY.NAME;


CREATE OR REPLACE VIEW LAST_MINUTE_TICKETS AS
SELECT
    FLIGHT.ID AS FLIGHT_ID,
    FLIGHT.DEPARTURE_TIME AS DEPARTURE_TIME,
    # DEPARTURE TIME - 1 DAY tickets are sold
    (COUNT(DATE(TICKET_PAYMENT.DATE) > DATE_SUB(FLIGHT.DEPARTURE_TIME, INTERVAL 1 WEEK ))) AS LAST_MINUTE_TICKET_SALE

    #(SELECT COUNT(*) FROM TICKET_PAYMENT WHERE TICKET_PAYMENT.DATE > DATE_SUB(FLIGHT.DEPARTURE_TIME, INTERVAL 1 DAY)) AS LAST_MINUTE_TICKETS_SOLD

FROM PASSENGER
         JOIN TICKET ON PASSENGER.ID = TICKET.PASSENGER_ID
         JOIN FLIGHT ON TICKET.FLIGHT_ID = FLIGHT.ID
         JOIN TICKET_PAYMENT ON TICKET.ID = TICKET_PAYMENT.TICKET_ID
GROUP BY FLIGHT.ID
ORDER BY FLIGHT.ID;





CREATE OR REPLACE VIEW TOP_PILOTS AS
SELECT
    EMPLOYEE.ID AS EMPLOYEE_ID,
    EMPLOYEE.FIRST_NAME AS FIRST_NAME,
    EMPLOYEE.LAST_NAME AS LAST_NAME,
    COUNT(FLIGHT.ID) AS FLIGHTS,
    /*
     total flight time (sum of flight duration) in minutes
     */
    SUM(TIMESTAMPDIFF(MINUTE, FLIGHT.DEPARTURE_TIME, FLIGHT.ARRIVAL_TIME)) AS TOTAL_FLIGHT_TIME
FROM
    FLIGHT
        JOIN
    FLIGHT_CREW ON FLIGHT.ID = FLIGHT_CREW.FLIGHT_ID
        JOIN
    EMPLOYEE ON EMPLOYEE.CREW_ID = FLIGHT_CREW.ID
        JOIN
    JOB ON EMPLOYEE.JOB_ID = JOB.ID
WHERE
    JOB.ID = (SELECT ID FROM JOB WHERE  POSITION = 'Pilot')
GROUP BY EMPLOYEE.ID
ORDER BY TOTAL_FLIGHT_TIME DESC;

COMMIT;
