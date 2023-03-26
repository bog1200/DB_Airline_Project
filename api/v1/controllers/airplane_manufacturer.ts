import { Request, Response } from 'express';
import {OkPacket, query, RowDataPacket} from '../../database'; //connect to the database
import AirplaneManufacturer from "../interfaces/AirplaneManufacturer";


/**
 * @openapi
 * paths:
 *     /airplane/manufacturers:
 *         get:
 *             summary: Get an airplane manufacturer by id
 *             tags:
 *                - airplanes
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: integer
 *                     description: The airplane manufacturer's id
 *             responses:
 *                 '200':
 *                     description: An airplane manufacturer object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/AirplaneManufacturer'
 *                 '404':
 *                     description: No airplane manufacturer found
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
const getAirplaneManufacturer = async (req: Request, res: Response) => {
    const id = req.query.id;
    query('SELECT * FROM AIRPLANE_MANUFACTURER WHERE id = ?', [id])
        .then((results:any) => {

            if (results.length > 0) {
                return res.status(200).json({
                    message: 'Airplane Manufacturer found',
                    data: results[0] as AirplaneManufacturer //cast
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
 *   /airplane/manufacturers:
 *     post:
 *       summary: Create an airplane manufacturer
 *       tags:
 *        - airplanes
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AirplaneManufacturer'
 *       responses:
 *         '201':
 *           description: Airplane manufacturer created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/AirplaneManufacturer'
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
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *
 */

const addAirplaneManufacturer = async (req: Request, res: Response) => {
    const airplane_manufacturer = req.body as AirplaneManufacturer;

    if(!airplane_manufacturer.name) {
        return res.status(400).json({
            message: 'Bad request',
        });
    }

    const current_airplane_manufacturer: RowDataPacket[] = <RowDataPacket[]> await query('SELECT * FROM AIRPLANE_MANUFACTURER WHERE name = ?', [airplane_manufacturer.name]);

    if(current_airplane_manufacturer.length > 0) {
        return res.status(409).json({
            message: 'Conflict',
            error: 'Airplane Manufacturer already exists'
        });
    }

    const new_airplane_manufacturer: OkPacket = <OkPacket> await query('INSERT INTO AIRPLANE_MANUFACTURER (name) VALUES (?)', [airplane_manufacturer.name]);

    if(new_airplane_manufacturer.affectedRows > 0) {
        return res.status(200).json({
            message: 'Airplane added'
        });
    }
    else {
        return res.status(500).json({
            message: 'Internal server error',
            error: 'Airplane not added'
        });
    }
}

/**
 * @openapi
 * paths:
 *   /airplane/manufacturers:
 *     put:
 *       summary: Update an airplane manufacturer
 *       tags:
 *        - airplanes
 *       parameters:
 *         - in: query
 *           name: id
 *           required: true
 *           schema:
 *             format: integer
 *             description: The id of the airplane manufacturer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AirplaneManufacturer'
 *             example:
 *               name: Boeing
 *       responses:
 *         '201':
 *           description: Airplane Manufacturer modified
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/AirplaneManufacturer'
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

const updateAirplaneManufacturer = async (req: Request, res: Response) => {
    const id = req.query.id;
    const airplane_manufacturer = req.body;

    if(!airplane_manufacturer.name) {
        return res.status(400).json({
            message: 'Bad request',
            error: 'Name is required'
        });
    }

    let query_string = 'UPDATE AIRPLANE_MANUFACTURER SET ';
    let query_params: any[] = [];
    let result: any = await query('SELECT * FROM AIRPLANE_MANUFACTURER WHERE id = ?', [id])

    if (result.length == 0) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }


    query_string += 'name = ?';
    query_params.push(airplane_manufacturer.name);

    query_string += ' WHERE id = ?';
    query_params.push(id);

    result = await query(query_string, query_params);

    if(result.affectedRows > 0) {
        return res.status(201).json({
            message: 'Airplane updated'
        });
    }
    else {
        return res.status(500).json({
            message: 'Internal server error',
            error: 'Airplane not updated'
        });
    }
}

/**
 * @openapi
 * paths:
 *     /airplane/manufacturers:
 *         delete:
 *             summary: Delete an airplane manufacturer
 *             tags:
 *                - airplanes
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: integer
 *                     description: The id of the airplane manufacturer
 *             responses:
 *                 '200':
 *                     description: Airplane Manufacturer deleted
 *                     content:
 *                       application/json:
 *                         schema:
 *                           $ref: '#/components/schemas/Error'
 *                 '404':
 *                     description: No airplane manufacturer found
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

const deleteAirplaneManufacturer = async (req: Request, res: Response) => {
    const id = req.query.id;
    query('DELETE FROM AIRPLANE_MANUFACTURER WHERE id = ?', [id])
        .then((results:any) => {
            if(results.affectedRows > 0) {
                return res.status(200).json({
                    message: 'Airplane Manufacturer deleted'
                });
            }
            else {
                return res.status(404).json({
                    message: 'Bad request',
                    error: 'Airplane Manufacturer not found'
                });
            }
        });
}

/**
 * @openapi
 *
 * paths:
 *   /airplane/manufacturers/search:
 *     get:
 *       summary: Search for airplane manufacturers
 *       tags:
 *        - airplanes
 *       parameters:
 *         - in: query
 *           name: name
 *           required: true
 *           schema:
 *             type: string
 *             description: The name of the airplane manufacturer
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
 *                     example: airplane manufacturer found
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/airplane_manufacturer'
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
 *           description: airplane manufacturer not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: airplane manufacturer not found
 */

const searchAirplaneManufacturers = async (req: Request, res: Response) => {

    const name = req.query.name;

    if(!name) {
        return res.status(400).json({
            message: 'Bad request',
            error: 'Missing parameters'
        });
    }

    let sql = 'SELECT * FROM AIRPLANE_MANUFACTURER WHERE name = ?';

    query(sql, [name])
        .then((results:any) => {
            if(results.length > 0) {
                return res.status(200).json({
                    message: 'Airplane Manufacturer found',
                    data: results as AirplaneManufacturer[]
                });
            }
            else {
                return res.status(404).json({
                    message: 'Bad request',
                    error: 'Airplane Manufacturer not found'
                });
            }
        }
        ).catch((error: any) => {
        return res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    });
}





export default {getAirplaneManufacturer, addAirplaneManufacturer, updateAirplaneManufacturer, deleteAirplaneManufacturer, searchAirplaneManufacturers};