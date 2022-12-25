import { Request, Response, NextFunction } from 'express';
import { query } from '../../database'; //connect to the database
import AirportGate from "../interfaces/AirportGate";
import airport from "./airport";  //import the interface

const getAirportGate = (req: Request, res: Response, next: NextFunction) => {
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
                    message: 'Airport gate not found'
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

const addAirportGate = (req: Request, res: Response, next: NextFunction) => {
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
                    message: 'Airport gate already exists'
                });
            }
            query('SELECT id FROM AIRPORT WHERE id = ?', [airport_gate.airport_id])
                .then((result: any) => {
                    if (result.length == 0) {
                        return res.status(400).json({
                            message: 'Bad Request: Airport not found'
                        });
                    }

                    query('SELECT id FROM AIRPORT_GATE_TYPE WHERE id = ?', [airport_gate.type])
                        .then((result: any) => {
                            if (result.length == 0) {
                                return res.status(400).json({
                                    message: 'Bad Request: Airport Gate Type not found'
                                });
                            }

                            query('INSERT INTO AIRPORT_GATE SET ?', airport_gate).then((result: any) => {
                                return res.status(201).json({
                                    message: 'Airport gate created',
                                    airport_gate: {
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









const deleteAirportGate = (req: Request, res: Response, next: NextFunction) => {
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
                message: 'Server error'
        });
    });

    }

const searchAirportGates = (req: Request, res: Response, next: NextFunction) => {
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
                airport_gates: result as AirportGate[]
            });
        }
        else {
            return res.status(404).json({
                message: 'Airport gates not found',
                airport_gates: []
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










export default {getAirportGate, searchAirportGates, addAirportGate, deleteAirportGate};