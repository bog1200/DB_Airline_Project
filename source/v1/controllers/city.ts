import { Request, Response, NextFunction } from 'express';
import { query } from '../../database'; //connect to the database
import City from "../interfaces/City";


const getCity = (req: Request, res: Response, next: NextFunction) => {
    const id = req.query.id;

    query('SELECT * FROM CITY WHERE id = ?', [id])
        .then((result: any) => {
            if (result.length > 0) {
                return res.status(200).json({
                    message: 'City found',
                    city: result[0] as City //cast
                });
            } else {
                return res.status(404).json({
                    message: 'City not found'
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

const addCity = (req: Request, res: Response, next: NextFunction) => {
    const city = req.body as City;

    if (!city.name || !city.country) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }

query('SELECT id FROM CITY WHERE name = ? AND country = ?', [city.name, city.country])
        .then((result: any) => {
            if (result.length > 0) {
                return res.status(409).json({
                    message: 'City already exists'
                });
            }
            query('SELECT id FROM COUNTRY WHERE id = ?', [city.country]).then((result: any) => {
                if (result.length == 0) {
                    return res.status(400).json({
                        message: 'Bad Request: Country not found'
                    });
                }
                query('INSERT INTO CITY (name, country) VALUES (?, ?)', [city.name, city.country])
                    .then((result: any) => {
                            return res.status(201).json({
                                message: 'City added',
                                city: {
                                    id: result.insertId,
                                    name: city.name,
                                    country: city.country
                                }
                            });
                    }).catch((err: any) => {
                    return res.status(500).json({
                        message: 'Server error',
                        error: err
                    });
                });
            });
        });

}


const deleteCity = (req: Request, res: Response, next: NextFunction) => {
const id = req.query.id;

    query('DELETE FROM CITY WHERE id = ?', [id])
        .then((result: any) => {

            if(result.affectedRows == 0){
                return res.status(404).json({
                    message: 'City not found'
                });
            } else{
            return res.status(200).json({
                message: 'City deleted'
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

const searchCity = (req: Request, res: Response, next: NextFunction) => {
    const name = req.query.name;
    const country = req.query.country;

    if (!name && !country) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }

    let sql = 'SELECT * FROM CITY WHERE ';
    let params: any[] = [];

    if (name) {
        sql += 'name = ?';
        params.push(name);
    }

    if (country) {
        if (name) {
            sql += ' AND ';
        }
        sql += 'country = ?';
        params.push(country);
    }

    query(sql,params).then((result: any) => {
        if (result.length > 0) {
            return res.status(200).json({
                message: 'City found',
                city: result as City[]
            });
        } else {
            return res.status(404).json({
                message: 'City not found'
            });
        }
    }).catch((err: any) => {
        return res.status(500).json({
            message: 'Server error',
            error: err
        });
    });



}

export default {getCity, addCity, deleteCity, searchCity};