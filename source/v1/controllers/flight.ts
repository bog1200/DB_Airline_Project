import { Request, Response } from 'express';
import { query } from '../../database'; //connect to the database
import Flight from "../interfaces/Flight";  //import the interface
import moment from 'moment'; //for date formatting

/**
 * @openapi
 * paths:
 *     /flights:
 *         get:
 *             summary: Get a flight by id
 *             tags:
 *                 - flights
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   schema:
 *                     type: integer
 *                     required: true
 *                     description: The id of the flight
 *             responses:
 *                 '200':
 *                     description: A flight object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Flight'
 *                 '404':
 *                     description: No flight found
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Error'
 *                 '500':
 *                     description: Server error
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Error'
 */
const getFlight = (req: Request, res: Response) => {
    const id = req.query.id;
    query('SELECT * FROM FLIGHT WHERE id = ?', [id])
        .then((result: any) => {
            if (result.length > 0) {

                res.status(200).json({
                    message: 'Flight found',
                    flight: result[0] as Flight //cast
                });
            } else {
                res.status(404).json({
                    message: 'Flight not found'
                });
            }
        })
};
/**
 * @openapi
 * paths:
 *   /flights:
 *     put:
 *       summary: Update a flight
 *       tags:
 *         - flights
 *       parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           description: The flight id
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flight'
 *
 *       responses:
 *         '201':
 *           description: Flight updated
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Flight'
 *         '500':
 *           description: Server error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *         '409':
 *           description: Flight already exists
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */

const updateFlight = async (req: Request, res: Response) => {
    const id = req.query.id;
    const plane_id = req.body.plane_id;
    const origin_id = req.body.origin_id;
    const destination_id = req.body.destination_id;
    const origin_gate_id = req.body.origin_gate_id;
    const destination_gate_id = req.body.destination_gate_id;
    const departure_time = req.body.departure_time;
    const arrival_time = req.body.arrival_time;
    const price = req.body.price;
    if (!(origin_id && origin_gate_id) && !(destination_id && destination_gate_id) &&!plane_id && !departure_time && !arrival_time && !price) {
        return res.status(400).json({
            message: "Bad request"
        });
    }
    const currentFlight: any = await query('SELECT * FROM FLIGHT WHERE id = ?', [id]);
    if (currentFlight.length == 0) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    // noinspection SqlWithoutWhere
    let sql: any = 'UPDATE FLIGHT SET ';
    let params: any = [];

    if (origin_id && origin_gate_id) {
        const origin: any = await query('SELECT * FROM AIRPORT WHERE id = ?', [origin_id]);
        if (origin.length == 0) {
            return res.status(400).json({
                message: "Bad request",
                error: "Origin airport not found"
            });
        }
        //check if the origin is the same as the destination
        if (origin_id == currentFlight[0].destination_id) {
            return res.status(400).json({
                message: "Bad request",
                error: "Origin and destination cannot be the same"

            });
        }
        const originGate: any = await query('SELECT airport_id FROM AIRPORT_GATE WHERE id = ?', [origin_gate_id]);
        if (originGate.length == 0) {
            return res.status(400).json({
                message: "Bad request",
                error: "Origin gate not found"

            });
        }
        if (originGate[0].airport_id != origin_id) {
            return res.status(400).json({
                message: "Bad request",
                error: "Origin gate does not belong to the origin airport"

            });

        }
        sql += 'origin_id = ?, origin_gate_id = ?, ';
        params.push(origin_id, origin_gate_id);
    }
    if (destination_id && destination_gate_id) {
        const destination: any = await query('SELECT * FROM AIRPORT WHERE id = ?', [destination_id]);
        if (destination.length == 0) {
            return res.status(400).json({
                message: "Bad request",
                error: "Destination airport not found"
            });
        }
        //check if the origin is the same as the destination
        if (destination_id == currentFlight[0].origin_id) {
            return res.status(400).json({
                message: "Bad request",
                error: "Origin and destination cannot be the same"

            });
        }
        const destinationGate: any = await query('SELECT airport_id FROM AIRPORT_GATE WHERE id = ?', [destination_gate_id]);
        if (destinationGate.length == 0) {
            return res.status(400).json({
                message: "Bad request",
                error: "Destination gate not found"

            });
        }
        if (destinationGate[0].airport_id != destination_id) {
            return res.status(400).json({
                message: "Bad request",
                error: "Destination gate does not belong to the destination airport"

            });

        }
        sql += 'destination_id = ?, destination_gate_id = ?, ';
        params.push(destination_id, destination_gate_id);
    }
    if (plane_id) {
        const plane: any = await query('SELECT * FROM AIRPLANE WHERE id = ?', [plane_id]);
        if (plane.length == 0) {
            return res.status(400).json({
                message: "Bad request",
                error: "Plane not found"
            });
        }
        sql += 'plane_id = ?, ';
        params.push(plane_id);
    }
    if (departure_time || arrival_time) {
        //convert time to UTC and format time to YYYY-MM-DD HH:MM
        const departureTimeFormatted = moment(departure_time).utc().format('YYYY-MM-DD HH:mm');
        const arrivalTimeFormatted = moment(arrival_time).utc().format('YYYY-MM-DD HH:mm');
        if(departure_time && arrival_time){

            if(departure_time >= arrival_time){
                return res.status(400).json({
                    message: "Bad request",
                    error: "Departure time cannot be after arrival time"
                });
            }
            sql += 'departure_time = ?, arrival_time = ?, ';
            params.push(departureTimeFormatted, arrivalTimeFormatted);
        } else if(departure_time){
            if(departure_time >= currentFlight[0].arrival_time){
                return res.status(400).json({
                    message: "Bad request",
                    error: "Departure time cannot be after arrival time"
                });
            }
            sql += 'departure_time = ?, ';
            params.push(departureTimeFormatted);

        } else {
            if(currentFlight[0].departure_time >= arrival_time){
                return res.status(400).json({
                    message: "Bad request",
                    error: "Departure time cannot be after arrival time"
                });
            }
            sql += 'arrival_time = ?, ';
            params.push(arrivalTimeFormatted);
        }
    }
    if (price) {
        if (price < 0 || price > 100000) {
            return res.status(400).json({
                message: "Bad request",
                error: "Price must be between 0 and 100000"
            });
        }
        sql += 'price = ?, ';
        params.push(price);
    }
    sql = sql.slice(0, -2);
    sql += ' WHERE id = ?';
    params.push(id);
    let update: any = await query(sql, params);
    if (update.affectedRows == 1) {
        return res.status(200).json({
            message: "Flight updated"
        });
    }
    return res.status(500).json({
        message: "Internal server error",
    });

}

/**
 * @openapi
 *
 * paths:
 *   /flights/search:
 *     get:
 *       summary: Search for flights
 *       tags:
 *         - flights
 *       parameters:
 *         - name: origin_id
 *           in: query
 *           description: ID of the origin airport
 *           schema:
 *             type: number
 *         - name: plane_id
 *           in: query
 *           description: ID of the plane to search for
 *           schema:
 *             type: number
 *         - name: destination_id
 *           in: query
 *           description: ID of the destination airport
 *           schema:
 *             type: number
 *         - name: departure_time
 *           in: query
 *           description: Departure time for the flight
 *           schema:
 *             type: string
 *             format: date-time
 *         - name: price_min
 *           in: query
 *           description: Minimum price for the flight
 *           schema:
 *             type: number
 *             format: double
 *         - name: price_max
 *           in: query
 *           description: Maximum price for the flight
 *           schema:
 *             type: number
 *             format: double
 *       responses:
 *         200:
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Flight found
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Flight'
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Bad request
 *         404:
 *           description: Flight not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Flight not found
 */
const searchFlights = (req: Request, res: Response) => {
    const origin_id = req.query.origin_id;
    const plane_id = req.query.plane_id;
    const destination_id = req.query.destination_id;
    const departure_time = req.query.departure_time;
    const price_min = req.query.price_min;
    const price_max = req.query.price_max;
    if (!origin_id && !plane_id && !destination_id && !departure_time && !price_min && !price_max) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    if (price_min && price_max && price_min > price_max) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }

    /////
    let sql_query='SELECT * FROM FLIGHT WHERE';
    let values = [];
    if(origin_id) {
        sql_query += ' origin_id = ?';
        values.push(origin_id);
    }
    if(destination_id) {
        if (values.length == 0)
            sql_query += ` destination_id = ?`;
        else
            sql_query += ` AND destination_id = ?`;
        values.push(destination_id);
    }
    if(plane_id) {
        if (values.length == 0)
            sql_query += ` plane_id = ?`;
        else
            sql_query += ` AND plane_id = ?`;
        values.push(plane_id);
    }

    if(departure_time) {
        if(values.length == 0)
            sql_query += ` departure_time = ?`;
        else
            sql_query += ` AND departure_time = ?`;
        values.push(departure_time);
    }

    if(price_min) {
        if(values.length == 0)
            sql_query += ` price >= ?`;
        else
            sql_query += ` AND price >= ?`;
        values.push(price_min);
    }

    if(price_max) {
        if(values.length == 0)
            sql_query += ` price <= ?`;
        else
            sql_query += ` AND price <= ?`;
        values.push(price_max);
    }



    query(sql_query, values)
        .then((result: any) => {
            if (result.length == 0) {
                return res.status(404).json({
                    message: 'Flight not found',
                    flights: {}
                });
            }
            res.status(200).json({
                message: 'Flights found',
                flights: result as Flight[]
            })
        })
};

/**
 * @openapi
 * paths:
 *   /flights:
 *     post:
 *       summary: Create an flight
 *       tags:
 *         - flights
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Flight'
 *
 *       responses:
 *         '201':
 *           description: Flight created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Flight'
 *         '500':
 *           description: Server error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *         '409':
 *           description: Flight already exists
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */
const addFlight = (req: Request, res: Response) => {
    const flight: Flight = req.body;
    if (!flight.origin_id || !flight.destination_id || !flight.origin_gate_id || !flight.destination_gate_id ||!flight.departure_time || !flight.arrival_time || !flight.price) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    //format the date
    const departure_time = moment(flight.departure_time).utc().format('YYYY-MM-DD HH:mm');
    const arrival_time = moment(flight.arrival_time).utc().format('YYYY-MM-DD HH:mm');
    //Check if the flight already exists
    query('SELECT * FROM FLIGHT WHERE origin_id = ? AND destination_id = ? AND origin_gate_id = ? AND destination_gate_id = ? AND departure_time = ? AND arrival_time = ? AND price = ? AND plane_id = ?', [flight.origin_id, flight.destination_id, flight.origin_gate_id, flight.destination_gate_id, departure_time, arrival_time, flight.price, flight.plane_id])
        .then((result: any) => {
            if (result.length != 0) {
                return res.status(409).json({
                    message: 'Bad request',
                    error: 'Flight already exists'
                });
            }
            if (flight.origin_id == flight.destination_id || flight.origin_gate_id == flight.destination_gate_id ) {
                return res.status(400).json({
                    message: 'Bad request',
                    error: 'Origin and destination cannot be the same'
                });
            }
            // Check if time is valid
            if (moment(departure_time).isAfter(arrival_time)) {
                return res.status(400).json({
                    message: 'Bad request',
                    error: 'Departure time cannot be after arrival time'
                });
            }
            //Check if both airports exists
            query('SELECT * FROM AIRPORT WHERE id = ? OR id = ?', [flight.origin_id, flight.destination_id])
                .then((result: any) => {
                    if (result.length != 2) {
                        return res.status(400).json({
                            message: 'Bad request',
                            error: 'Airport not found'
                        });
                    }
                    //Check if both gates exists and are in the right airport
                    query('SELECT id FROM AIRPORT_GATE WHERE id = ? AND airport_id = ? OR id = ? AND airport_id = ?', [flight.origin_gate_id, flight.origin_id, flight.destination_gate_id, flight.destination_id])
                        .then((result: any) => {
                            if (result.length != 2) {
                                return res.status(400).json({
                                    message: 'Bad request',
                                    error: 'Invalid gates'
                                });
                            }

                            //Check if the plane exists
                            query('SELECT id FROM AIRPLANE WHERE id = ?', [flight.plane_id])
                                .then((result: any) => {
                                    if (result.length != 1) {
                                        return res.status(400).json({
                                            message: 'Bad request',
                                            error: 'Plane not found'
                                        });
                                    }
                                    //Insert the flight
                                    query('INSERT INTO FLIGHT SET ?',{origin_id: flight.origin_id, destination_id: flight.destination_id, origin_gate_id: flight.origin_gate_id, destination_gate_id: flight.destination_gate_id, departure_time: departure_time, arrival_time: arrival_time, price: flight.price, plane_id: flight.plane_id})
                                        .then((result: any) => {
                                            res.status(201).json({
                                                message: 'Flight created',
                                                flight: {
                                                    id: result.insertId,
                                                    ...flight
                                                }
                                            })
                                        })
                                        .catch((err: any) => {
                                            res.status(500).json({
                                                message: 'Server error',
                                                error: err
                                            })
                                        })
                                })
                                .catch((err: any) => {
                                    res.status(500).json({
                                        message: 'Server error',
                                        error: err
                                    })
                                }
                            )
                        })
                        .catch((err: any) => {
                            res.status(500).json({
                                message: 'Server error',
                                error: err
                            })

                        }
                    )
                })
                .catch((err: any) => {
                    res.status(500).json({
                        message: 'Server error',
                        error: err
                    })
                }
            )
        })
        .catch((err: any) => {
            res.status(500).json({
                message: 'Server error',
                error: err
            })
        }
    )
}


/**
 * @openapi
 * paths:
 *     /flights:
 *         delete:
 *             summary: Delete a flight by id
 *             tags:
 *                 - flights
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: integer
 *                     description: The id of the flight
 *             responses:
 *                 '200':
 *                     description: Flight deleted
 *                     content:
 *                       application/json:
 *                         schema:
 *                           $ref: '#/components/schemas/Error'
 *                 '404':
 *                     description: No flight found
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Error'
 *                 '500':
 *                     description: Server error
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Error'
 */
const deleteFlight = (req: Request, res: Response) => {
    const id = req.query.id;
    query('DELETE FROM FLIGHT WHERE id = ?', [id])
        .then((result: any) => {
            if (result.affectedRows == 0) {
                return res.status(404).json({
                    message: 'Flight not found'
                });
            }
            res.status(200).json({
                message: 'Flight deleted'
            });
        })
}

export default {getFlight, searchFlights, addFlight,updateFlight, deleteFlight};

