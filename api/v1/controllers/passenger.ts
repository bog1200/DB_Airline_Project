import {Request, Response} from "express";
import {query, OkPacket, RowDataPacket} from "../../database";
import Passenger from "../interfaces/Passenger";

/**
 * @openapi
 * paths:
 *     /passengers/:
 *         get:
 *             summary: Get passenger by id
 *             tags:
 *                 - passengers
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: integer
 *                     description: The id of the passenger
 *             responses:
 *                 '200':
 *                     description: A passenger object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Passenger'
 *                 '404':
 *                     description: No passenger found
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
const getPassenger = async (req: Request, res: Response) => {
    const id = req.query.id;
    const result: RowDataPacket[] = <RowDataPacket[]> await query('SELECT * FROM PASSENGER WHERE id = ?', [id]);
    if (result.length > 0) {
        return res.status(200).json({
            message: 'Passenger found',
            data: result[0] as Passenger
        });
    }
    return res.status(404).json({
        message: 'Passenger not found',
        data: {}
    });
}

/**
 * @openapi
 * paths:
 *     /passengers/search:
 *         get:
 *             summary: Get passenger by flight id
 *             tags:
 *                 - passengers
 *             parameters:
 *                 - in: query
 *                   name: flight_id
 *                   required: true
 *                   schema:
 *                     type: integer
 *                     description: The id of the flight the passenger is on
 *             responses:
 *                 '200':
 *                     description: A passenger object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Passenger'
 *                 '404':
 *                     description: No passenger found
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
const getPassengersByFlight = async (req: Request, res: Response) => {
    const flight_id = req.query.flight_id;
    const result: RowDataPacket[] = <RowDataPacket[]> await query('SELECT * FROM PASSENGER WHERE flight_id = ?', [flight_id]);
    if (result.length > 0) {
        return res.status(200).json({
            message: 'Passengers found',
            data: result as Passenger[]
        });
    }
    return res.status(404).json({
        message: 'Passengers not found',
        data: {}
    });
}

/**
 * @openapi
 * paths:
 *   /passengers:
 *     post:
 *       summary: Create a new passenger
 *       tags:
 *         - passengers
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Passenger'
 *
 *       responses:
 *         '201':
 *           description: Passenger created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Passenger'
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
 */
const addPassenger = async (req: Request, res: Response) => {
    const passenger: Passenger = req.body;
    if(!passenger.flight_id || !passenger.first_name || !passenger.last_name || !passenger.country || !passenger.id_number) {
        return res.status(400).json({
            message: 'Bad request',
            data: {}
        });
    }
    const flightCheck: RowDataPacket[] = <RowDataPacket[]> await query('SELECT * FROM FLIGHT WHERE id = ?', [passenger.flight_id]);
    if(flightCheck.length === 0) {
        return res.status(400).json({
            message: 'Bad request',
            error: 'Flight does not exist',
        });
    }
    const countryCheck: RowDataPacket[] = <RowDataPacket[]> await query('SELECT * FROM COUNTRY WHERE id = ?', [passenger.country]);
    if(countryCheck.length === 0) {
        return res.status(400).json({
            message: 'Bad request',
            error: 'Country does not exist',
        });
    }
    const duplicateCheck: RowDataPacket[] = <RowDataPacket[]> await query('SELECT * FROM PASSENGER WHERE flight_id = ? AND id_number = ?', [passenger.flight_id, passenger.id_number]);
    if(duplicateCheck.length > 0) {
        return res.status(400).json({
            message: 'Bad request',
            error: 'Passenger already exists',
        });
    }
    const phone = req.body.phone || null;
    const email = req.body.email || null;
    const result: OkPacket = <OkPacket> await query('INSERT INTO PASSENGER (flight_id, first_name, last_name, country, id_number, phone, email) VALUES (?, ?, ?, ?, ?, ?, ?)', [passenger.flight_id, passenger.first_name, passenger.last_name, passenger.country, passenger.id_number, phone, email]);
    if (result.affectedRows > 0) {
        return res.status(201).json({
            message: 'Passenger created',
            data: {
                id: result.insertId,
                ...passenger
            }
        });
    }
    return res.status(500).json({
        message: 'Internal server error',
        error: 'Passenger not created'
    });
}

/**
 * @openapi
 * paths:
 *   /passengers:
 *     put:
 *       summary: Update a passenger
 *       tags:
 *         - passengers
 *       parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: The id of the passenger to update
 *           example: 1
 *           minimum: 1
 *           default: ""
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Passenger'
 *
 *       responses:
 *         '201':
 *           description: Passenger updated
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Passenger'
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
 */
const updatePassenger = async (req: Request, res: Response) => {
    const id = req.query.id;
    const passenger: Passenger = req.body;
    if(!passenger.first_name && !passenger.last_name && !passenger.phone && !passenger.email) {
        return res.status(400).json({
            message: 'Bad request',
            data: {}
        });
    }
    // Check if passenger exists
    const passengerCheck: RowDataPacket[] = <RowDataPacket[]> await query('SELECT * FROM PASSENGER WHERE id = ?', [id]);
    if(passengerCheck.length === 0) {
        return res.status(400).json({
            message: 'Bad request',
            error: 'Passenger does not exist',
        });
    }
    let sql = 'UPDATE PASSENGER SET ';
    let params = [];
    if(passenger.first_name) {
        sql += 'first_name = ?, ';
        params.push(passenger.first_name);
    }
    if(passenger.last_name) {
        sql += 'last_name = ?, ';
        params.push(passenger.last_name);
    }
    if(passenger.phone) {
        sql += 'phone = ?, ';
        params.push(passenger.phone);
    }
    if(passenger.email) {
        sql += 'email = ?, ';
        params.push(passenger.email);
    }
    sql = sql.slice(0, -2); // Remove last comma
    sql += ' WHERE id = ?';
    params.push(id);
    const result: OkPacket = <OkPacket> await query(sql, params);
    if (result.affectedRows > 0) {
        return res.status(200).json({
            message: 'Passenger updated'
        });
    }
    return res.status(500).json({
        message: 'Internal server error',
        error: 'Passenger not updated'
    });
}

/**
 * @openapi
 * paths:
 *     /passengers:
 *         delete:
 *             summary: Delete a passenger by id
 *             tags:
 *                 - passengers
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: integer
 *                     description: The id of the passenger to delete
 *             responses:
 *                 '200':
 *                     description: Passenger deleted
 *                     content:
 *                       application/json:
 *                         schema:
 *                           $ref: '#/components/schemas/Error'
 *                 '404':
 *                     description: No ticket found
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
const deletePassenger = async (req: Request, res: Response) => {
    const id = req.query.id;
    const result: OkPacket = <OkPacket> await query('DELETE FROM PASSENGER WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
        return res.status(200).json({
            message: 'Passenger deleted',
            data: {
                id: id
            }
        });
    }
    return res.status(500).json({
        message: 'Internal server error',
        error: 'Passenger not deleted'
    });
}


export default {getPassenger, getPassengersByFlight, addPassenger, updatePassenger, deletePassenger};

