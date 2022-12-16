CREATE TABLE `ACCOUNT` (
                           `ID` int(11) NOT NULL,
                           `EMAIL` varchar(100) NOT NULL,
                           `PASSWORD` varchar(255) NOT NULL,
                           `FIRST_NAME` varchar(100) NOT NULL,
                           `LAST_NAME` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

CREATE TABLE `AIRPLANE` (
                            `ID` int(10) NOT NULL,
                            `REG_NUMBER` varchar(10) NOT NULL,
                            `TYPE` int(11) NOT NULL,
                            `COUNTRY` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `AIRPLANE_MANUFACTURER` (
                                         `ID` int(11) NOT NULL,
                                         `NAME` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `AIRPLANE_TYPE` (
                                 `ID` int(10) NOT NULL,
                                 `NAME` varchar(100) NOT NULL,
                                 `MANUFACTURER` int(11) NOT NULL,
                                 `RANGE_KM` int(5) NOT NULL,
                                 `SEATS` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `AIRPORT` (
                           `ID` int(11) NOT NULL,
                           `NAME` varchar(100) NOT NULL,
                           `CITY_ID` int(11) NOT NULL,
                           `IATA` varchar(3) NOT NULL,
                           `ICAO` varchar(4) NOT NULL,
                           `ADDRESS` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `AIRPORT_GATE` (
                                `ID` int(11) NOT NULL,
                                `AIRPORT` int(11) NOT NULL,
                                `NUMBER` int(11) NOT NULL,
                                `TYPE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `AIRPORT_GATE_TYPE` (
                                     `ID` int(11) NOT NULL,
                                     `TYPE` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `CITY` (
                        `ID` int(11) NOT NULL,
                        `NAME` varchar(100) NOT NULL,
                        `COUNTRY` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `COUNTRY` (
                           `ID` int(11) NOT NULL,
                           `ICAO` varchar(2) NOT NULL,
                           `NAME` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `EMPLOYEE` (
                            `ID` int(11) NOT NULL,
                            `FIRST_NAME` varchar(100) NOT NULL,
                            `LAST_NAME` varchar(100) NOT NULL,
                            `PHONE` int(10) NOT NULL,
                            `EMAIL` varchar(100) NOT NULL,
                            `JOB_ID` int(11) NOT NULL,
                            `CREW_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

CREATE TABLE `FLIGHT_CREW` (
                               `ID` int(11) NOT NULL,
                               `FLIGHT_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `JOB` (
                       `ID` int(11) NOT NULL,
                       `POSITION` varchar(100) NOT NULL,
                       `SALARY` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `LUGGAGE` (
                           `ID` int(11) NOT NULL,
                           `PASSENGER_ID` int(11) NOT NULL,
                           `FLIGHT_ID` int(11) NOT NULL,
                           `TYPE_ID` int(11) NOT NULL,
                           `SPECIAL_MENTIONS` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

CREATE TABLE `TICKET` (
                          `ID` int(11) NOT NULL,
                          `CODE` int(11) NOT NULL,
                          `CLIENT_ID` int(11) NOT NULL,
                          `FLIGHT_ID` int(11) NOT NULL,
                          `CLASS` int(11) NOT NULL,
                          `PRICE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `TICKET_PAYMENT` (
                                  `ID` int(11) NOT NULL,
                                  `TICKET_ID` int(11) NOT NULL,
                                  `PAYMENT_METHOD` int(11) NOT NULL,
                                  `DATE` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `TICKET_PAYMENT_CARD` (
                                       `ID` int(11) NOT NULL,
                                       `TICKET_ID` int(11) NOT NULL,
                                       `CARD_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `TICKET_PAYMENT_METHOD` (
                                         `ID` int(11) NOT NULL,
                                         `METHOD` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;