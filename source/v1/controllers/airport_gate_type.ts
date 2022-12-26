import { Request, Response, NextFunction } from 'express';
import { query } from '../../database'; //connect to the database
import AirportGateType from "../interfaces/AirportGateType";


const getAirportGateType = (req: Request, res: Response, next: NextFunction) => {
    const id = req.query.id;

    query('SELECT * FROM AIRPORT_GATE_TYPE WHERE id = ?', [id])
        .then((result: any) => {
            if (result.length > 0) {
                return res.status(200).json({
                    message: 'Airport gate type found',
                    airport_gate_type: result[0] as AirportGateType //cast
                });
            } else {
                return res.status(404).json({
                    message: 'Airport gate type not found'
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

const addAirportGateType = (req: Request, res: Response, next: NextFunction) => {
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

const deleteAirportGateType = (req: Request, res: Response, next: NextFunction) => {
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
                    return res.status(200).json({
                        message: 'Airport gate type deleted'
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

const searchAirportGateTypes = (req: Request, res: Response, next: NextFunction) => {
    const type = req.query.type;

    if(!type) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    query('SELECT * FROM AIRPORT_GATE_TYPE WHERE type = ?', [type])
        .then((result: any) => {
            if (result.length > 0) {
                return res.status(200).json({
                    message: 'Airport gate types found',
                    airport_gate_types: result as AirportGateType[] //cast
                });
            } else {
                return res.status(404).json({
                    message: 'Airport gate types not found'
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

export default {getAirportGateType, addAirportGateType, deleteAirportGateType, searchAirportGateTypes};
