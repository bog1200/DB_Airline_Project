import { Request, Response } from 'express';
import { ParsedQs } from 'qs';
import {query, RowDataPacket} from '../../database'; //connect to the database
import AirplaneType from "../interfaces/AirplaneType";


/**
 * @openapi
 * paths:
 *     /airplane_type:
 *         get:
 *             summary: Get an airplane type by id
 *             tags:
 *                 - airplane_type
 *             parameters:
 *                 - in: query
 *                 name: id
 *                 schema:
 *                 type: integer
 *                 required: true
 *                 description: The id of the airplane type
 *             responses:
 *                 '200':
 *                     description: An airplane type object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/AirplaneType'
 *                 '404':
 *                     description: No airplane type found
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
const getAirplaneType = async (req: Request, res: Response) => {
    const id = req.query.id;
    query('SELECT * FROM AIRPLANE_TYPE WHERE id = ?', [id])
        .then((results:any) => {

            if (results.length > 0) {
                return res.status(200).json({
                    message: 'Airplane Type found',
                    airplane_type: results[0] as AirplaneType //cast
                });
            }
            else {
                return res.status(404).json({
                    message: 'Bad request',
                    error: 'Airplane not found'
                });
            }

        }).catch((error: any) => {
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    });
}

/**
 * @openapi
 * paths:
 *   /airplane_type:
 *     post:
 *       summary: Create an airplane type
 *       tags:
 *         - airplane_type
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AirplaneType'
 *             example:
 *               name: Boeing 737
 *               manufacturer: 1
 *               seats: 150
 *               range_km: 5000
 *       responses:
 *         '201':
 *           description: Airplane Type created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/AirplaneType'
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
 *         description: Conflict
 *         content:
 *         application/json:
 *         schema:
 *         $ref: '#/components/schemas/Error'
 *
 */
const addAirplaneType = async (req: Request, res: Response) => {
    const airplane_type = req.body;

if(!airplane_type.name || !airplane_type.manufacturer || !airplane_type.seats || !airplane_type.range_km) {
        return res.status(400).json({
            message: 'Bad request',
            error: 'Parameters required'
        });
    }

    const current_airplane_type: RowDataPacket[] = <RowDataPacket[]> await query('SELECT * FROM AIRPLANE_TYPE WHERE name = ? AND manufacturer = ? AND seats = ? AND range_km = ?', [airplane_type.name, airplane_type.manufacturer, airplane_type.seats, airplane_type.range_km]);

    if(current_airplane_type.length > 0) {
        return res.status(409).json({
            message: 'Conflict',
            error: 'Airplane Type already exists'
        });
    }

    const airplane_manufacturer_is_good: RowDataPacket[] = <RowDataPacket[]> await query('SELECT * FROM AIRPLANE_MANUFACTURER WHERE id = ?', [airplane_type.manufacturer]);

    if(airplane_manufacturer_is_good.length == 0) {
        return res.status(400).json({
            message: 'Bad request',
            error: 'Airplane manufacturer does not exist'
        });
    }


    const new_airplane_type: any = await query('INSERT INTO AIRPLANE_TYPE (name, manufacturer, range_km, seats) VALUES (?,?,?,?)', [airplane_type.name, airplane_type.manufacturer, airplane_type.range_km, airplane_type.seats]);

    if(new_airplane_type.affectedRows > 0) {
        return res.status(200).json({
            message: 'Airplane added'
        });
    }
    else {
        return res.status(500).json({
            message: 'Internal server error',
            error: 'Could not add airplane'
        });
    }
}

/**
 * @openapi
 * paths:
 *   /airplane_type:
 *     put:
 *       summary: Update an airplane type
 *       tags:
 *         - airplane_type
 *       parameters:
 *         - in: query
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             format: id
 *             description: The id of the airplane type
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AirplaneType'
 *             example:
 *               name: Boeing 737
 *               manufacturer: 1
 *               seats: 150
 *               range_km: 5000
 *       responses:
 *         '201':
 *           description: Airplane Type modified
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/AirplaneType'
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
 *           description: Conflict
 *           content:
 *           application/json:
 *           schema:
 *           $ref: '#/components/schemas/Error'
 */

const updateAirplaneType = async (req: Request, res: Response) => {
    const id = req.query.id;
    const airplane_type = req.body;

    if(!airplane_type.name || !airplane_type.manufacturer || !airplane_type.seats || !airplane_type.range_km) {
        return res.status(400).json({
            message: 'Bad request',
            error: 'Name is required'
        });
    }

    let query_string = 'UPDATE AIRPLANE_TYPE SET ';
    let query_params: any[] = [];
    let result: any = await query('SELECT * FROM AIRPLANE_TYPE WHERE id = ?', [id])

    if (result.length == 0) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }

    const current_airplane_type: RowDataPacket[] = <RowDataPacket[]> await query('SELECT * FROM AIRPLANE_TYPE WHERE name = ? AND manufacturer = ? AND seats = ? AND range_km = ?', [airplane_type.name, airplane_type.manufacturer, airplane_type.seats, airplane_type.range_km]);

    if(current_airplane_type.length > 0) {
        return res.status(409).json({
            message: 'Conflict',
            error: 'Airplane Type already exists'
        });
    }


    const airplane_manufacturer_is_good: RowDataPacket[] = <RowDataPacket[]> await query('SELECT * FROM AIRPLANE_MANUFACTURER WHERE id = ?', [airplane_type.manufacturer]);

    if(airplane_manufacturer_is_good.length == 0) {
        return res.status(400).json({
            message: 'Bad request',
            error: 'Airplane manufacturer does not exist'
        });
    }

    let sql = 'UPDATE AIRPLANE_TYPE SET ';
    let params = [];

    if(airplane_type.name) {
        sql += 'name = ?, ';
        params.push(airplane_type.name);
    }

    if(airplane_type.manufacturer) {
        let result1: any = await query('SELECT * FROM AIRPLANE_MANUFACTURER WHERE id = ?', [airplane_type.manufacturer]);
        if(result1.length == 0) {
            return res.status(400).json({
                message: 'Bad request',
                error: 'Airplane manufacturer does not exist'
            });
        }
        sql += 'manufacturer = ?, ';
        params.push(airplane_type.manufacturer);
    }

    if(airplane_type.seats) {
        sql += 'seats = ?, ';
        params.push(airplane_type.seats);
    }

    if(airplane_type.range_km) {
        sql += 'range_km = ?, ';
        params.push(airplane_type.range_km);
    }

    sql = sql.slice(0, -2);

    sql += ' WHERE id = ?';
    params.push(id);

    const updated_airplane_type: any = await query(sql, params);

    if(updated_airplane_type.affectedRows > 0) {
        return res.status(200).json({
            message: 'Airplane updated'
        });
    }
    else {
        return res.status(500).json({
            message: 'Internal server error',
            error: 'Could not update airplane'
        });
    }
}

/**
 * @openapi
 * paths:
 *     /airplane_type:
 *         delete:
 *             summary: Delete an airplane type
 *             tags:
 *                 - airplane_type
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: string
 *                     format: id
 *                     description: The id of the airplane type
 *             responses:
 *                 '200':
 *                     description: Airplane Type deleted
 *                     content:
 *                       application/json:
 *                         schema:
 *                           $ref: '#/components/schemas/Error'
 *                 '404':
 *                     description: No airplane type found
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

const deleteAirplaneType = async (req: Request, res: Response) => {
    const id = req.query.id;
    const deleted_airplane_type: any = await query('DELETE FROM AIRPLANE_TYPE WHERE id = ?', [id]);

    if(deleted_airplane_type.affectedRows > 0) {
        return res.status(200).json({
            message: 'Airplane deleted'
        });
    }
    else {
        return res.status(500).json({
            message: 'Internal server error',
            error: 'Could not delete airplane'
        });
    }
}

/**
 * @openapi
 *
 * paths:
 *   /airplane_type/search:
 *     get:
 *       summary: Search for airplane types
 *       tags:
 *         - airplane_type
 *       parameters:
 *         - in: query
 *         name: name
 *         schema:
 *         type: string
 *          description: The name of the airplane type
 *          required: false
 *          example: Boeing 737
 *
 *          - in: query
 *          name: manufacturer
 *          schema:
 *          type: string
 *          description: The manufacturer of the airplane type
 *          required: false
 *          example: Boeing
 *
 *          - in: query
 *          name: seats
 *          schema:
 *          type: integer
 *          description: The number of seats of the airplane type
 *          required: false
 *          example: 200
 *
 *          - in: query
 *          name: range_km
 *          schema:
 *          type: integer
 *          description: The range of the airplane type
 *          required: false
 *          example: 10000
 *
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
 *                     example: airplane types found
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/AirplaneType'
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
 *           description: airplane type not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: airplane type not found
 */

const searchAirplaneTypes = async (req: Request, res: Response) => {
    const name = req.body.name;
    const manufacturer_id = req.body.manufacturer_id;
    const seats = req.body.seats;
    const range = req.body.range;

    if(!name && !manufacturer_id && !seats && !range) {
        return res.status(400).json({
            message: 'Bad request',
            error: 'Missing parameters'
        });
    }

    let sql = 'SELECT * FROM AIRPLANE_TYPE WHERE ';
    let params: any[] = [];

    if(name) {

        sql += 'name = ?';
        params.push(name);
    }

    if(manufacturer_id) {
        if(params.length > 0) {
            sql += ' AND ';
        }
        sql += 'manufacturer_id = ? ';
        params.push(manufacturer_id);
    }

    if(seats) {
        if(params.length > 0) {
            sql += ' AND ';
        }
        sql += 'seats = ?';
        params.push(seats);
    }

    if(range) {
        if(params.length > 0) {
            sql += ' AND ';
        }
        sql += 'range = ?';
        params.push(range);
    }

    const results: RowDataPacket[] = <RowDataPacket[]> await query(sql, params);

    if(results.length > 0) {
        return res.status(200).json({
            message: 'Airplane Type found',
            airplane_types: results
        });
    }
    else {
        return res.status(404).json({
            message: 'Airplane Type not found'
        });
    }
}


export default {getAirplaneType, addAirplaneType, updateAirplaneType, deleteAirplaneType, searchAirplaneTypes};