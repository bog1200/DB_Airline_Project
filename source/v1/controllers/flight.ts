import { Request, Response, NextFunction } from 'express';
import { query } from '../../database'; //connect to the database
import Flight from "../interfaces/Flight";  //import the interface

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
 *                                 $ref: '#/components/schemas/Account'
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
const getFlight = (req: Request, res: Response, next: NextFunction) => {
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
 *                   flights:
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
const searchFlights = (req: Request, res: Response, next: NextFunction) => {
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
const addFlight = (req: Request, res: Response, next: NextFunction) => {
    const flight: Flight = req.body;
    if (!flight.origin_id || !flight.destination_id || !flight.origin_gate_id || !flight.destination_id ||!flight.departure_time || !flight.price) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    query('SELECT COUNT(*) FROM FLIGHT WHERE origin_id = ? AND destination_id = ? AND origin_gate_id = ? AND destination_gate_id = ? AND departure_time = ? AND price = ?',
        [flight.origin_id, flight.destination_id, flight.origin_gate_id, flight.destination_gate_id, flight.departure_time, flight.price])
        .then((result: any) => {
            if (result[0]['COUNT(*)'] != 0) {
                return res.status(409).json({
                    message: 'Flight already exists'
                });
            }
            query('INSERT INTO FLIGHT SET ?', flight)
                .then((result: any) => {
                    res.status(201).json({
                        message: 'Flight created',
                        flight: flight
                    });
                })
                .catch((err: any) => {
                    res.status(500).json({
                        message: 'Server error',
                        error: err
                    });
                });
        });

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
 *                     type: string
 *                     format: uuid
 *                     description: The id of the flight
 *             responses:
 *                 '200':
 *                     description: Account deleted
 *                     content:
 *                       application/json:
 *                         schema:
 *                           $ref: '#/components/schemas/Error'
 *                 '404':
 *                     description: No account found
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
const deleteFlight = (req: Request, res: Response, next: NextFunction) => {
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

export default {getFlight, searchFlights, addFlight, deleteFlight};

