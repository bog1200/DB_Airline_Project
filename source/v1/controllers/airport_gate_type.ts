import { Request, Response } from 'express';
import { query } from '../../database'; //connect to the database
import AirportGateType from "../interfaces/AirportGateType";

/**
 * @openapi
 * paths:
 *   /airport/gate/types:
 *     get:
 *       summary: Get an airport gate type by id or type
 *       tags:
 *         - gates
 *       parameters:
 *         - in: query
 *           name: id
 *           schema:
 *             type: integer
 *             description: The id of the airport gate type
 *         - in: query
 *           name: type
 *           schema:
 *             type: string
 *             description: The type of the airport gate
 *       responses:
 *         '200':
 *           description: An airport gate type object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/AirportGateType'
 *         '404':
 *           description: No airport found
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *         '500':
 *           description: Server error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */
const getAirportGateType = (req: Request, res: Response) => {
    const id = req.query.id;
    const type = req.query.type;

    if(!id && !type) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    if(id) {
        query('SELECT * FROM AIRPORT_GATE_TYPE WHERE id = ?', [id])
        .then((result: any) => {
            if (result.length > 0) {
                return res.status(200).json({
                    message: 'Airport gate type found',
                    data: result[0] as AirportGateType //cast
                });
            } else {
                return res.status(404).json({
                    message: 'Airport gate type not found'
                });
            }
        }).catch((err: any) => {
            return res.status(500).json({
            message: 'Server error',
            error: err
        });
    });

    }
    else{
        query('SELECT * FROM AIRPORT_GATE_TYPE WHERE type = ?', [type])
        .then((result: any) => {
            if (result.length > 0) {
                return res.status(200).json({
                    message: 'Airport gate type found',
                    data: result[0] as AirportGateType //cast
                });
            } else {
                return res.status(404).json({
                    message: 'Airport gate type not found'
                });
            }
        }).catch((err: any) => {
            return res.status(500).json({
            message: 'Server error',
            error: err
        });
    });
    }
}

/**
 * @openapi
 * paths:
 *   /airport/gate/types:
 *     post:
 *       summary: Add a new airport gate type
 *       tags:
 *         - gates
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AirportGateType'
 *       responses:
 *         201:
 *           description: Airport gate type added
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
const addAirportGateType = (req: Request, res: Response) => {
    const airport_gate_type = req.body as AirportGateType;

    if (!airport_gate_type.type) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    query('SELECT id FROM AIRPORT_GATE_TYPE WHERE type = ?', [airport_gate_type.type])
        .then((result: any) => {
            if (result.length > 0) {
                return res.status(409).json({
                    message: 'Airport gate type already exists'
                });
            }
            query('INSERT INTO AIRPORT_GATE_TYPE (type) VALUES (?)', [airport_gate_type.type])
                .then((result: any) => {
                    return res.status(200).json({
                        message: 'Airport gate type added',
                        airport_gate_type: result[0] as AirportGateType //cast
                    });
                }).catch((err: any) => {
                    return res.status(500).json({
                    message: 'Server error',
                    error: err
                });
            });
        }).catch((err: any) => {
            return res.status(500).json({
            message: 'Server error',
            error: err
        });
    });
}
/**
 * @openapi
 * paths:
 *   /airport/gate/types:
 *     put:
 *       summary: Modify an airport gate type
 *       tags:
 *         - gates
 *       parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *           description: The id of the airport gate type
 *           required: true
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AirportGateType'
 *       responses:
 *         201:
 *           description: Airport gate type modified
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Airport gate type modified
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
const updateAirportGateType = (req: Request, res: Response) => {
    const id = req.query.id;
    const airport_gate_type = req.body as AirportGateType;
    if (!airport_gate_type.type) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    query('SELECT id FROM AIRPORT_GATE_TYPE WHERE type = ?', [airport_gate_type.type])
        .then((result: any) => {
            if (result.length > 0) {
                return res.status(409).json({
                    message: 'Airport gate type already exists'
                });
            }
            query("UPDATE AIRPORT_GATE_TYPE SET type = ? WHERE id = ?", [airport_gate_type.type, id])
                .then((result: any) => {
                    return res.status(201).json({
                        message: 'Airport gate type modified',
                        airport_gate_type: result[0] as AirportGateType //cast
                    });
                }).catch((err: any) => {
                return res.status(500).json({
                    message: 'Server error',
                    error: err
                });
            });
        }).catch((err: any) => {
        return res.status(500).json({
            message: 'Server error',
            error: err
        });
    });
}
/**
 * @openapi
 * paths:
 *     /airport/gate/types:
 *         delete:
 *             summary: Delete an airport gate type by id
 *             tags:
 *               - gates
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: number
 *                     description: The id of the airport gate type
 *             responses:
 *                 '200':
 *                     description: Airport gate type deleted
 *                     content:
 *                       application/json:
 *                         schema:
 *                           $ref: '#/components/schemas/Error'
 *                 '404':
 *                     description: No airport gate type found
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
const deleteAirportGateType = (req: Request, res: Response) => {
    const id = req.query.id;

    query('SELECT id FROM AIRPORT_GATE_TYPE WHERE id = ?', [id])
        .then((result: any) => {
            if (result.length == 0) {
                return res.status(404).json({
                    message: 'Airport gate type not found'
                });
            }
            query('DELETE FROM AIRPORT_GATE_TYPE WHERE id = ?', [id])
                .then((result: any) => {
                    if (result.affectedRows > 0) {
                        return res.status(200).json({
                            message: 'Airport gate type deleted'
                        });
                    }
                    return res.status(500).json({
                        message: 'Server error'
                    });
                }).catch((err: any) => {
                    return res.status(500).json({
                    message: 'Server error',
                    error: err
                });
            });
        }).catch((err: any) => {
            return res.status(500).json({
            message: 'Server error',
            error: err
        });
    });
}



export default {getAirportGateType, addAirportGateType, updateAirportGateType, deleteAirportGateType};
