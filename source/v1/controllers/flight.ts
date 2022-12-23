import { Request, Response, NextFunction } from 'express';
import { query } from '../../database'; //connect to the database
import Flight from "../interfaces/Flight";  //import the interface

const getFlights = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
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

const searchFlights = (req: Request, res: Response, next: NextFunction) => {
    const origin_id = req.query.origin_id;
    const destination_id = req.query.destination_id;
    const departure_time = req.query.departure_time;
    if (!origin_id && !destination_id && !departure_time) {
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

    if(departure_time) {
        if(values.length == 0)
            sql_query += ` departure_time = ?`;
        else
            sql_query += ` AND departure_time = ?`;
        values.push(departure_time);
    }



    query(sql_query, values)
        .then((result: any) => {
            if (result.length == 0) {
                return res.status(404).json({
                    message: 'Flight not found'
                });
            }
            res.status(200).json({
                message: 'Flight found',
                flights: result as Flight[]
            })
        })
};
const addFlight = (req: Request, res: Response, next: NextFunction) => {
    const flight: Flight = req.body;
    if (!flight) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    query('INSERT INTO FLIGHT SET ?', [flight])
        .then((result: any) => {
            res.status(201).json({
                message: 'Flight added',
                flight: {
                    id: result.insertId,
                    ...flight
                }
            });
        })
}
const deleteFlight = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
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

export default {getFlights, searchFlights, addFlight, deleteFlight};

