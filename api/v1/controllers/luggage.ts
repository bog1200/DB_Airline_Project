import {Request, Response} from "express";
import {query} from "../../database";
import Luggage from "../interfaces/Luggage";


/**
 * @openapi
 * paths:
 *     /luggages:
 *         get:
 *             summary: Get a luggage by id
 *             tags:
 *                 - luggages
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: integer
 *                     description: The id of the luggage
 *             responses:
 *                 '200':
 *                     description: A luggage object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Luggage'
 *                 '404':
 *                     description: No luggage found
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
const getLuggage =  async (req: Request, res: Response) => {
   const id = req.query.id;
    if (!id) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    let luggage: any = await query('SELECT * FROM LUGGAGE WHERE id = ?', [id]);
    if (luggage.length == 0) {
        return res.status(404).json({
            message: 'Luggage not found'
        });
    }
    res.status(200).json({
        message: "Luggage found",
        data: luggage as Luggage
    });
}

/**
 * @openapi
 * paths:
 *     /luggages/search:
 *         get:
 *             summary: Get luggages by passenger id or flight id
 *             tags:
 *                 - luggages
 *             parameters:
 *                 - in: query
 *                   name: passenger_id
 *                   schema:
 *                     type: integer
 *                     description: The id of the passenger who owns the luggage
 *                 - in: query
 *                   name: flight_id
 *                   schema:
 *                     type: integer
 *                     description: The id of the flight the luggage is on
 *             responses:
 *                 '200':
 *                     description: A luggage object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Luggage'
 *                 '404':
 *                     description: No luggage found
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
const getLuggages =  async (req: Request, res: Response) => {
    const passenger_id = req.query.passenger_id;
    const flight_id = req.query.flight_id;
    if (!passenger_id && !flight_id) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    let sql = 'SELECT * FROM LUGGAGE WHERE';
    let params = [];
    if(passenger_id){
        sql += ' passenger_id = ?';
        params.push(passenger_id);
    }
    if(flight_id){
        if(params.length > 0){
            sql += ' AND';
        }
        sql += ' flight_id = ?';
        params.push(flight_id);
    }
    let luggage: any = await query(sql, params);
    if (luggage.length == 0) {
        return res.status(404).json({
            message: 'Luggage not found'
        });
    }
    res.status(200).json({
        message: "Luggage found",
        data: luggage as Luggage[]
    });
}

/**
 * @openapi
 * paths:
 *     /luggages/special:
 *         get:
 *             summary: Get all luggages with special mentions by flight id
 *             tags:
 *                 - luggages
 *             parameters:
 *             - in: query
 *               name: flight_id
 *               required: true
 *               schema:
 *                 type: integer
 *                 description: The id of the flight the luggage is on
 *             responses:
 *                 '200':
 *                     description: A luggage object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Luggage'
 *                 '404':
 *                     description: No luggage found
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
const getSpecialLuggages =  async (req: Request, res: Response) => {
    const flight_id = req.query.flight_id;
    if (!flight_id) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    let luggage: any = await query('SELECT * FROM LUGGAGE WHERE flight_id = ? AND special_mentions IS NOT NULL', [flight_id]);
    if (luggage.length == 0) {
        return res.status(404).json({
            message: 'Luggage not found'
        });
    }
    res.status(200).json({
        message: "Luggage found",
        data: luggage as Luggage[]
    }
    );
}

/**
 * @openapi
 * paths:
 *   /luggages:
 *     post:
 *       summary: Create a new luggage
 *       tags:
 *         - luggages
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Luggage'
 *
 *       responses:
 *         '201':
 *           description: Luggage created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Luggage'
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
const addLuggage = async (req: Request, res: Response) => {
    const passenger_id = req.body.passenger_id;
    const flight_id = req.body.flight_id;
    const weight = req.body.weight;
    const special_mentions = req.body.special_mentions;
    if (!passenger_id || !flight_id || !weight) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    ////max 3 luggages per passenger
    const checkLuggageCount: any = await query('SELECT COUNT(*) AS count FROM LUGGAGE WHERE passenger_id = ? AND flight_id = ?', [passenger_id, flight_id]);
    if (checkLuggageCount[0].count >= 3) {
        return res.status(400).json({
            message: 'Bad request',
            error: 'Max 3 luggages per passenger'
        });
    }
    const checkPassenger: any = await query('SELECT * FROM PASSENGER WHERE id = ?', [passenger_id]);
    if (checkPassenger.length == 0) {
        return res.status(400).json({
            message: 'Bad request',
            error: 'Passenger not found'
        });
    }
    if(checkPassenger[0].flight_id != flight_id){
        return res.status(400).json({
            message: 'Bad request',
            error: 'Passenger is not on the flight'
        });
    }

    const checkFlight: any = await query('SELECT * FROM FLIGHT WHERE id = ?', [flight_id]);
    if (checkFlight.length == 0) {
        return res.status(400).json({
            message: 'Bad request',
            error: 'Flight not found'
        });
    }
    let result: any;
    if(special_mentions){
        result = await query('INSERT INTO LUGGAGE (passenger_id, flight_id, weight, special_mentions) VALUES (?, ?, ?, ?)', [passenger_id, flight_id, weight, special_mentions]);
    }else{
        result =  await query('INSERT INTO LUGGAGE (passenger_id, flight_id, weight) VALUES (?, ?, ?)', [passenger_id, flight_id, weight]);

    }
res.status(201).json({
        message: "Luggage added",
        data: {
            id: result.insertId,
            ...req.body
        }
    });
}

/**
 * @openapi
 * paths:
 *     /luggages:
 *         delete:
 *             summary: Delete a luggage by id
 *             tags:
 *                 - luggages
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: integer
 *                     description: The id of the luggage to delete
 *             responses:
 *                 '200':
 *                     description: Luggage deleted
 *                     content:
 *                       application/json:
 *                         schema:
 *                           $ref: '#/components/schemas/Error'
 *                 '404':
 *                     description: No luggage found
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
const deleteLuggage = async (req: Request, res: Response) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    await query('DELETE FROM LUGGAGE WHERE id = ?', [id]);
    res.status(200).json({
        message: "Luggage deleted"
    });
}
export default {addLuggage, getLuggage, getLuggages, getSpecialLuggages, deleteLuggage};
    