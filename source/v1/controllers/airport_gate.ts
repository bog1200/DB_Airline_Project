import { Request, Response } from 'express';
import { ParsedQs } from 'qs';
import {query} from '../../database'; //connect to the database
import AirportGate from "../interfaces/AirportGate"; //import the interface

/**
 * @openapi
 * paths:
 *     /airport/gates:
 *         get:
 *             summary: Get an airport gate by id
 *             tags:
 *                 - gates
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   schema:
 *                     type: integer
 *                     required: true
 *                     description: The id of the airport gate
 *             responses:
 *                 '200':
 *                     description: An airport gate object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/AirportGate'
 *                 '404':
 *                     description: No airport found
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
const getAirportGate = (req: Request, res: Response) => {
    const id = req.query.id;

    query('SELECT * FROM AIRPORT_GATE WHERE id = ?', [id])
        .then((result: any) => {
                if (result.length > 0) {
                    return res.status(200).json({
                        message: 'Airport gate found',
                        airport_gate: result[0] as AirportGate //cast
                    });
                } else {
                    return res.status(404).json({
                        message: 'Bad request',
                        error: 'Airport gate not found'
                    });
                }
            }
        ).catch((err: any) => {
        return res.status(500).json({
            message: 'Server error',
            error: err
        });
    });
}

/**
 * @openapi
 * paths:
 *   /airport/gates:
 *     post:
 *       summary: Add a new airport gate
 *       tags:
 *         - gates
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AirportGate'
 *       responses:
 *         201:
 *           description: Airport gate added
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Airport gate added
 *                   data:
 *                     $ref: '#/components/schemas/AirportGate'
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
 */
const addAirportGate = (req: Request, res: Response) => {
    const airport_gate = req.body as AirportGate;

    if (!airport_gate.airport_id || !airport_gate.number || !airport_gate.type) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    query('SELECT ID FROM AIRPORT_GATE WHERE airport_id = ? AND number = ? AND type = ?', [airport_gate.airport_id, airport_gate.number, airport_gate.type])
        .then((result: any) => {
            if (result.length > 0) {
                return res.status(409).json({
                    message: 'Bad request',
                    error: 'Airport gate already exists'
                });
            }
            query('SELECT id FROM AIRPORT WHERE id = ?', [airport_gate.airport_id])
                .then((result: any) => {
                    if (result.length == 0) {
                        return res.status(400).json({
                            message: 'Bad request',
                            error: 'Airport not found'
                        });
                    }

                    query('SELECT id FROM AIRPORT_GATE_TYPE WHERE id = ?', [airport_gate.type])
                        .then((result: any) => {
                            if (result.length == 0) {
                                return res.status(400).json({
                                    message: 'Bad request',
                                    error: 'Airport Gate Type not found'
                                });
                            }

                            query('INSERT INTO AIRPORT_GATE SET ?', airport_gate).then((result: any) => {
                                return res.status(201).json({
                                    message: 'Airport gate created',
                                    data: {
                                        id: result.insertId,
                                        airport_id: airport_gate.airport_id,
                                        number: airport_gate.number,
                                        type: airport_gate.type
                                    }
                                });
                            });

                        });
                });
        });

}
/**
 * @openapi
 * paths:
 *   /airport/gates:
 *     put:
 *       summary: Update an airport gate
 *       tags:
 *         - gates
 *       parameters:
 *        - in: query
 *          name: id
 *          required: true
 *          schema:
 *            type: number
 *            description: The id of the airport gate
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AirportGate'
 *       responses:
 *         201:
 *           description: Airport gate updated
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Airport gate updated
 *                   data:
 *                     $ref: '#/components/schemas/AirportGate'
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
 */
const updateAirportGate = async (req: Request, res: Response) => {
    const id = req.query.id;
    const airport_gate = req.body as AirportGate;

    if (!airport_gate.number && !airport_gate.type) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }

    // noinspection SqlWithoutWhere
    let query_string = 'UPDATE AIRPORT_GATE SET ';
    let query_params: any[] = [];
    let result: any = await query('SELECT * FROM AIRPORT_GATE WHERE id = ?', [id])
    if (result.length == 0) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    if (airport_gate.number) {
        let result2: any = await query('SELECT ID FROM AIRPORT_GATE WHERE airport_id = ? AND number = ? AND type = ?', [result[0].airport_id, airport_gate.number, result[0].type])
        if (result2.length > 0) {
            return res.status(409).json({
                message: 'Bad request',
                error: 'Airport gate already exists'
            });
        }
        query_string += 'number = ?, ';
        query_params.push(airport_gate.number);

    }
    if (airport_gate.type) {
        let result2: any = await query('SELECT * FROM AIRPORT_GATE_TYPE WHERE id = ?', [airport_gate.type])
        if (result2.length == 0) {
            return res.status(400).json({
                message: 'Bad request',
                error: 'Airport Gate Type not found'
            });
        }
        let result3: any = await query('SELECT ID FROM AIRPORT_GATE WHERE airport_id = ? AND number = ? AND type = ?', [result2[0].airport_id, result2[0].number, airport_gate.type])
        if (result3.length > 0) {
            return res.status(409).json({
                message: 'Bad request',
                error: 'Airport gate already exists'
            });
        }
        query_string += 'type = ?';
        query_params.push(airport_gate.type);

    }

    query_string += ' WHERE id = ?';
    query_params.push(id);
    let result4: any= await query(query_string, query_params);
    if (result4.affectedRows > 0) {
        return res.status(201).json({
            message: 'Airport gate updated',
            data: {
                id: id,
                airport_id: result[0].airport_id,
                number: airport_gate.number ? airport_gate.number : result[0].number,
                type: airport_gate.type ? airport_gate.type : result[0].type
            }
        });

    }
}



/**
 * @openapi
 * paths:
 *     /airport/gates:
 *         delete:
 *             summary: Delete an airport gate by id
 *             tags:
 *               - gates
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: number
 *                     description: The id of the airport gate
 *             responses:
 *                 '200':
 *                     description: Airport gate deleted
 *                     content:
 *                       application/json:
 *                         schema:
 *                           $ref: '#/components/schemas/Error'
 *                 '404':
 *                     description: No airport gate found
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
const deleteAirportGate = (req: Request, res: Response) => {
    const id = req.query.id;
    query('DELETE FROM AIRPORT_GATE WHERE id = ?', [id])
        .then((result: any) => {

            if (result.affectedRows > 0) {
                return res.status(200).json({
                    message: 'Airport Gate deleted'
                });

            } else {
                return res.status(404).json({
                    message: 'Airport Gate not found'
                });
            }
            }).catch((err: any) => {
                return res.status(500).json({
                message: 'Server error',
                error: err
        });
    });

    }

/**
 * @openapi
 *
 * paths:
 *   /airport/gates/search:
 *     get:
 *       summary: Search for airport gates
 *       tags:
 *         - gates
 *       parameters:
 *         - name: airport_id
 *           in: query
 *           description: ID of the airport
 *           schema:
 *             type: number
 *         - name: number
 *           in: query
 *           description: gate number
 *           schema:
 *             type: number
 *         - name: type
 *           in: query
 *           description: gate type
 *           schema:
 *             type: number
 *
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
 *                     example: Airport Gates found
 *                   airport_gates:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/AirportGate'
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
 *           description: Airport gate not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Airport gate not found
 */
const searchAirportGates = (req: Request, res: Response) => {
    const airport_id = req.query.airport_id;
    const number = req.query.number;
    const type = req.query.type;

    if(!airport_id && !number && !type) {
        return res.status(400).json({
            message: 'Invalid search parameters'
        });
    }

    let sql = 'SELECT * FROM AIRPORT_GATE WHERE ';
    let params: any[] = [];

    if(airport_id) {
        sql += 'airport_id = ?';
        params.push(airport_id);
    }

    if(number) {
        if (params.length > 0) {
            sql += ' AND ';
        }
        sql += 'number = ?';
        params.push(number);
    }

    if(type) {
        if (params.length > 0) {
            sql += ' AND ';
        }
        sql += 'type = ?';
        params.push(type);
    }

    query(sql, params).then((result: any) => {
        if(result.length > 0) {
            return res.status(200).json({
                message: 'Airport gates found',
                data: result as AirportGate[]
            });
        }
        else {
            return res.status(404).json({
                message: 'Airport gates not found',
                data: []
            });
        }
    }
    ).catch((err: any) => {
        return res.status(500).json({
            message: 'Server error',
            err: err
        });
    });

}










export default {getAirportGate, searchAirportGates, addAirportGate,updateAirportGate, deleteAirportGate};