import { Request, Response } from 'express';
import { ParsedQs } from 'qs';
import {query} from '../../database'; //connect to the database
import Airplane from "../interfaces/Airplane";
import AirportGate from "../interfaces/AirportGate"; //import the interface

/**
 * @openapi
 * paths:
 *     /airplanes:
 *         get:
 *             summary: Get an airplane by id
 *             tags:
 *                 - airplanes
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: integer
 *                     description: The airplane id
 *             responses:
 *                 '200':
 *                     description: An airplane object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Airplane'
 *                 '404':
 *                     description: No airplane found
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
const getAirplane = async (req: Request, res: Response) => {
    const id = req.query.id;

    query('SELECT * FROM AIRPLANE WHERE id = ?', [id])
        .then((results:any) => {

        if (results.length > 0) {
            return res.status(200).json({
                message: 'Airplane found',
                airport_gate: results[0] as AirportGate //cast
            });
        } else {
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
 *   /airplane:
 *     post:
 *       summary: Create an airplane
 *       tags:
 *         - airplane
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *             example:
 *               type: 1
 *               reg_number: "YU-ABC"
 *               country: 1
 *       responses:
 *         '201':
 *           description: Airplane created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Account'
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
 *
 */

const addAirplane = async (req: Request, res: Response) => {

    // const type = req.query.type;
    // const reg_number = req.query.reg_number;
    // const country = req.query.country;
    const airplane = req.body as Airplane;

    if (!airplane.type || !airplane.reg_number || !airplane.country) {
        return res.status(400).json({
            message: 'Bad request',
            error: 'Missing parameters'
        });
    }

    const current_airplane: any = await query('SELECT * FROM AIRPLANE WHERE reg_number = ? AND type = ? AND country = ?', [airplane.reg_number, airplane.type, airplane.country]);

    if(current_airplane.length > 0) {
        return res.status(400).json({
            message: 'Bad request',
            error: 'Airplane already exists'
        });
    }

    const airplane_type_is_good: any = await query('SELECT id FROM AIRPLANE_TYPE WHERE id = ?', [airplane.type]);

    if(airplane_type_is_good.length == 0) {
        return res.status(400).json({
            message: 'Bad request',
            error: 'Airplane type does not exist'
        });
    }

    const airplane_country_is_good: any = await query('SELECT id FROM COUNTRY WHERE id = ?', [airplane.country]);

    if(airplane_country_is_good.length == 0) {
        return res.status(400).json({
            message: 'Bad request',
            error: 'Country does not exist'
        });
    }

    const new_airplane: any = await query('INSERT INTO AIRPLANE SET ?', [airplane]);

    if(new_airplane.affectedRows > 0) {
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
 *   /airplane:
 *     put:
 *       summary: Update an airplane
 *       tags:
 *         - airplane
 *       parameters:
 *         - in: query
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             format: id
 *             description: The id of the airplane
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Airplane'
 *             example:
 *               type: 1
 *               reg_number: "YU-ABC"
 *               country: 1
 *       responses:
 *         '201':
 *           description: Airplane modified
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Airplane'
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
 *           description: Registration Number already exists
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */

const updateAirplane = async (req: Request, res: Response) => {
    const airplane: Airplane = req.body as Airplane;
    const id = req.query.id;

    if(!airplane.type || !airplane.reg_number || !airplane.country) {
        return res.status(400).json({
            message: 'Bad request',
        });
    }

    let query_string = 'UPDATE AIRPLANE SET ';
    let query_params: any[] = [];
    let result: any = await query('SELECT * FROM AIRPLANE WHERE id = ?', [id])

    if (result.length == 0) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }

    if(airplane.type){
        let result2: any = await query('SELECT * FROM AIRPLANE_TYPE WHERE id = ?', [airplane.type])
        if (result2.length == 0) {
            return res.status(400).json({
                message: 'Bad request',
                error: 'Airplane type does not exist'
            });
        }
            query_string += 'type = ?, ';
            query_params.push(airplane.type);
    }

    if(airplane.reg_number){
        let result3: any = await query('SELECT * FROM AIRPLANE WHERE reg_number = ?', [airplane.reg_number])
        if (result3.length > 0) {
            return res.status(409).json({
                message: 'Bad request',
                error: 'Airplane with this registration number already exists'
            });
        }
        query_string += 'reg_number = ?, ';
        query_params.push(airplane.reg_number);
    }

    if(airplane.country){
        let result4: any = await query('SELECT * FROM COUNTRY WHERE id = ?', [airplane.country])
        if (result4.length == 0) {
            return res.status(400).json({
                message: 'Bad request',
                error: 'Country does not exist'
            });
        }
        query_string += 'country = ?, ';
        query_params.push(airplane.country);
    }


    query_string = query_string.slice(0, -2);

    query_string += ' WHERE id = ?';
    query_params.push(id);

    result = await query(query_string, query_params);

    if(result.affectedRows > 0) {
        return res.status(200).json({
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
 *     /airplane:
 *         delete:
 *             summary: Delete an airplane
 *             tags:
 *                 - airplane
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: string
 *                     format: id
 *                     description: The id of the airplane
 *             responses:
 *                 '200':
 *                     description: Airplane deleted
 *                     content:
 *                       application/json:
 *                         schema:
 *                           $ref: '#/components/schemas/Error'
 *                 '404':
 *                     description: No airplane found
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

const deleteAirplane = async (req: Request, res: Response) => {
    const id = req.query.id;

    query('DELETE FROM AIRPLANE WHERE id = ?', [id])
        .then((results:any) => {
            if(results.affectedRows > 0) {
                return res.status(200).json({
                    message: 'Airplane deleted'
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
 *
 * paths:
 *   /airplane/search:
 *     get:
 *       summary: Search for airplane
 *       tags:
 *         - airplanes
 *       parameters:
 *         - name: city_id
 *           in: query
 *           description: ID of the city for the airplane
 *           schema:
 *             type: number
 *             example: 0
 *         - name: iata
 *           in: query
 *           description: IATA code for the airplane
 *           schema:
 *             type: string
 *             example: "AMS"
 *             minLength: 3
 *             maxLength: 3
 *             pattern: "^[A-Z]{3}$"
 *         - name: icao
 *           in: query
 *           description: ICAO code for the airplane
 *           schema:
 *             type: string
 *             example: "EHAM"
 *             minLength: 4
 *             maxLength: 4
 *             pattern: "^[A-Z]{4}$"
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
 *                     example: airplanes found
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/airplane'
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
 *           description: airplane not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: airplane not found
 */
const searchAirplanes = async (req: Request, res: Response) => {
    const reg_number = req.query.reg_number;
    const type = req.query.type;
    const country = req.query.country;

    if(!reg_number && !type && !country) {
        return res.status(400).json({
            message: 'Bad request',
            error: 'Missing parameters'
        });
    }

    let sql = 'SELECT * FROM AIRPLANE WHERE ';
    let params: any[] = [];

    if(reg_number) {
        sql += 'reg_number = ?';
        params.push(reg_number);
    }

    if(type) {
        if(params.length > 0) {
            sql += ' AND ';
        }
        sql += 'type = ?';
        params.push(type);
    }

    if(country) {
        if(params.length > 0) {
            sql += ' AND ';
        }
        sql += 'country = ?';
        params.push(country);
    }

    query(sql, [params])
        .then((results:any) => {
            if(results.length > 0) {
                return res.status(200).json({
                    message: 'Airplanes found',
                    airplanes: results as Airplane[] //cast
                });
            }
            else {
                return res.status(404).json({
                    message: 'Airplane not found',
                    error: 'Airplanes not found'
                });
            }
        });

}





export default { getAirplane, addAirplane, updateAirplane, deleteAirplane, searchAirplanes };