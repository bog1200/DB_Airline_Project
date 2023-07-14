<h1 style="text-align:center"><a href="https://dbairlines.romail.app/">DB Airlines</a> - For the flights to your dreams</h1>

<p align="center">
  <img src="web/src/assets/DB_Logo.webp" alt="dba-logo" height="200"/>
  <br>
  <br>
  <i>DB Airlines is a fictional airline company that offers flights to all over the world. <br> The company is based in the city of Bucharest, Romania. <br>
    <br>
This project is the mockup of an airline company's system. <br>
   The project consists of: <br> <br>
</i>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="mysql"/>
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="express"/>
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="angular"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="nodejs"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="html5"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="css3"/>

<p align="center"><i>A web application, written using <a href="https://github.com/angular/angular">Angular</a> in <a href="https://en.wikipedia.org/wiki/HTML5">HTML5</a>, <a href="https://en.wikipedia.org/wiki/CSS">CSS3</a>, and <a href="https://typescriptlang.org">TypeScript</a> that allows users to book flights, check their flight status, and manage their account</i></p>
<p align="center"><i>A REST API, written using <a href="https://github.com/expressjs/express">Express</a> in <a href="https://typescriptlang.org">TypeScript</a> that allows the web application to communicate with the database. </i></p>
<p align="center"><i>An <a href="">SQL</a> database schema, that stores all the data needed for the airline. </i></p>


## Table of Contents

- [Table of Contents](#table-of-contents)
  - [Web Application](#web-application)
    - [Getting Started](#getting-started-web)
    - [Running the Application](#running-the-application)
    - [Features](#features)
    
  - [REST API](#rest-api)
    - [Getting Started](#getting-started-api)
    - [Running the API](#running-the-api)
    - [Developing the API](#developing-the-api)
    - [Documentation](#documentation-api)
      - [Adding a new endpoint](#adding-a-new-endpoint)
    - [API Versioning](#api-versioning)
  - [Database Schema](#database-schema)
  - [License](#license)

## Web Application

### Getting Started (Web)

To get started with the web application, you need to have [Node.js](https://nodejs.org/en/) installed on your machine. After that, you can clone the repository and install the dependencies:

```bash
git clone https://github.com/bog1200/DB_Airline_Project.git
cd DB_Airline_Project\web
npm install .
```

### Running the Application

To run the application, you need to have the [REST API](#rest-api) running. After that, you can run the application using the following command:

```bash
ng serve
```

The application will be available at `http://localhost:4200/`.

### Features

#### Account interaction:

| Task               | Assigned to | Current Status | Notes                                     |
|--------------------|-------------|----------------|-------------------------------------------|
| Login              | @bog1200    | Done           |                                           |
| Register           | @bog1200    | In progress    |                                           | 
| Account management | @bog1200    | In progress    | <ul><li> - [ ] Manage payments </li></ul> |

#### Flight interaction:

| Task                | Assigned to | Current Status | Notes                                         |
|---------------------|-------------|----------------|-----------------------------------------------|
| Flight search       | @bog1200    | Done           | TODO: Allow search only for days with flights |
| Book a flight       | @bog1200    | In progress    |                                               |
| Cancel a flight     | @bog1200    | Planned        |                                               |
| Check flight status | @bog1200    | Planned        |                                               |

#### Passenger interaction:

| Task              | Assigned to | Current Status | Notes |
|-------------------|-------------|----------------|-------|
| Manage passengers |             | Planned        |       |
| Manage luggage    |             | Planned        |       |

#### Admin interaction:

| Task                    | Assigned to | Current Status | Notes |
|-------------------------|-------------|----------------|-------|
| Manage flights          |             | Planned        |       |
| Manage passengers       |             | Planned        |       |
| Manage luggage          |             | Planned        |       |
| Manage airports         |             | Planned        |       |
| Manage airplanes        |             | Planned        |       |
| Manage flight routes    |             | Planned        |       |
| Manage flight schedules |             | Planned        |       |
| Manage staff            |             | Planned        |       |


## REST API

### Getting Started (API)

To get started with the REST API, you need to have [Node.js](https://nodejs.org/en/) installed on your machine. After that, you can clone the repository and install the dependencies:

```bash
git clone https://github.com/bog1200/DB_Airline_Project.git
cd DB_Airline_Project\api
npm install .
```

### Running the API

To run the API, you need to have a [MySQL](https://www.mysql.com/) or [MariaDB](https://mariadb.org/) database running. You can use the [database schema](#database-schema) to create the database. 
It is also necessary to have a `.env` file in the root directory of the project for the environment variables such as the database connection. The `.env` file should contain the following variables:
```env
# The host or ip of the database server
DB_HOST=
# The user and password of the database
DB_USER=
DB_PASS=
# The name of the database table
DB_NAME=
# The port of the database server (optional - default: 3306)
DB_PORT=
```

After that, you can run the API using the following commands:

```bash
npm run build
node build/server.js
```

The API will be available at `http://localhost:6060/`.

### Developing the API

To develop the API, you can use the following commands:

```bash
npm run dev
```

This will start the API in development mode, which means that the API will be restarted every time a file is changed.

#### Adding a new endpoint
The API automatically generates the documentation for the endpoints at each build of the API.

When a new endpoint is added, it is necessary to add the documentation for it. The documentation is written in [YAML](https://yaml.org/) according to the [OpenAPI Specification](https://swagger.io/specification/).

The documentation for each endpoint is located in the same file, above the endpoint.


### Documentation (API)

This project follows the [OpenAPI Specification](https://swagger.io/specification/) for the REST API.

#### API Versioning

| Version  | Current Status | Notes |
|----------|----------------|-------|
| 2        | In progress    |       |
| 1        | Done           |       |



The documentation for the public version is displayed using [Swagger](https://swagger.io/) and can be found [here](https://dbairlines.romail.app/api/v1/docs/).<br>
Each instance of the API also has its own documentation, which can be found at `http://localhost:6060/api/vX/docs/`, where ``X`` is the current API version

## Database Schema

The database schema is written in [SQL](https://www.w3schools.com/sql/). It can be found [here](db.sql).
It contains the following tables:

| Table Name            | Description                                              |
|-----------------------|----------------------------------------------------------|
| ACCOUNT               | Contains the information about the accounts.             |
| ACCOUNT_CARD          | Contains the information about the payment cards         |
| AIRPLANE              | Contains the information about the airplanes.            |
| AIRPLANE_MANUFACTURER | Contains a list of airplane manufacturers.               |
| AIRPLANE_TYPE         | Contains the information about the airplane types.       |
| AIRPORT               | Contains the information about the airports.             |
| AIRPORT_GATE          | Contains the information about the airport gates.        |
| AIRPORT_GATE_TYPE     | Contains a list of airport gate types.                   |
| CITY                  | Contains the information about the cities.               |
| COUNTRY               | Contains the information about the countries.            |
| EMPLOYEE              | Contains the information about the employees.            |
| FLIGHT                | Contains the information about the flights.              |
| FLIGHT_CREW           | Contains the information about the flight crews.         |
| JOB                   | Contains the information about the jobs.                 |
| LUGGAGE               | Contains the information about the luggage.              |
| PASSENGER             | Contains the information about the passengers.           |
| TICKET                | Contains the information about the tickets.              |
| TICKET_PAYMENT        | Contains the information about the ticket payments.      |
| TICKET_PAYMENT_CARD   | Contains the information about the ticket payment cards. |
| TICKET_PAYMENT_METHOD | Contains a list of ticket payment methods.               |

The schema also contains the following views:

| View Name               | Description                                                 |
|-------------------------|-------------------------------------------------------------|
| LAST_MINUTE_TICKETS     | Contains the information about the last minute tickets.     |
| LUGGAGE_STATISTICS      | Contains luggage statistics.                                |
| MONTHLY_INCOME_AIRPORT  | Ranks airports by income.                                   |
| MONTHLY_PASSENGER_COUNT | Contains the information about the monthly passenger count. |
| PAYMENT_STATISTICS      | Contains the information about the payment statistics.      |
| PREFERRED_DESTINATIONS  | Ranks destinations by passenger count.                      |
| TICKETS_PER_FLIGHT      | Contains the information about the flight usage.            |
| TOP_ACCOUNTS            | Ranks accounts by purchase value.                           |
| TOP_AIRPORT_PASSENGERS  | Ranks airports by passenger count.                          |
| TOP_PILOTS              | Ranks the pilots by flight time.                            |

Note: The views are not accessible through the API. They are only used for statistical purposes.

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).




