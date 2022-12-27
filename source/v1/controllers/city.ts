import { Request, Response } from 'express';
import {query} from '../../database'; //connect to the database
import City from "../interfaces/City";


/**
 * @openapi
 * paths:
 *   /cities:
 *     get:
 *       summary: Get a city by id
 *       tags:
 *         - location
 *       parameters:
 *         - in: query
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *             description: The id of the city
 *       responses:
 *         '200':
 *           description: A city object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/City'
 *         '404':
 *           description: No city found
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
const getCity = (req: Request, res: Response) => {
    const id = req.query.id;

    query('SELECT * FROM CITY WHERE id = ?', [id])
        .then((result: any) => {
                if (result.length > 0) {
                    return res.status(200).json({
                        message: 'City found',
                        data: result[0] as City //cast
                    });
                } else {
                    return res.status(404).json({
                        message: 'Bad request',
                        error: 'City not found'
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
 *   /cities/search:
 *     get:
 *       summary: Search for a city by name or country
 *       tags:
 *         - location
 *       parameters:
 *         - in: query
 *           name: name
 *           schema:
 *             type: string
 *             description: The name of the city
 *         - in: query
 *           name: country
 *           schema:
 *             type: integer
 *             description: The id of the country
 *
 *       responses:
 *         '200':
 *           description: A city object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/City'
 *         '404':
 *           description: No city found
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
const searchCity = (req: Request, res: Response) => {
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

    query(sql, params).then((result: any) => {
        if (result.length > 0) {
            return res.status(200).json({
                message: 'City found',
                data: result as City[]
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

/**
 * @openapi
 * paths:
 *   /cities:
 *     post:
 *       summary: Add a new city
 *       tags:
 *         - location
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/City'
 *       responses:
 *         201:
 *           description: City added
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: City added
 *                   data:
 *                     $ref: '#/components/schemas/City'
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
const addCity = (req: Request, res: Response) => {
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
                    message: 'Bad request',
                    error: 'City already exists'
                });
            }
            query('SELECT id FROM COUNTRY WHERE id = ?', [city.country]).then((result: any) => {
                if (result.length == 0) {
                    return res.status(400).json({
                        message: 'Bad request',
                        error: 'Country not found'
                    });
                }
                query('INSERT INTO CITY (name, country) VALUES (?, ?)', [city.name, city.country])
                    .then((result: any) => {
                        return res.status(201).json({
                            message: 'City added',
                            data: {
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

/**
 * @openapi
 * paths:
 *   /cities:
 *     put:
 *       summary: Update a city
 *       tags:
 *         - location
 *       parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *           description: The id of the city
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/City'
 *       responses:
 *         201:
 *           description: City modified
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: City modified
 *                   data:
 *                     $ref: '#/components/schemas/City'
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
const updateCity = (req: Request, res: Response) => {
    const id = req.query.id;
    const city = req.body as City;

    if (!id || (!city.name && !city.country)) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    // noinspection SqlWithoutWhere
    let sql = "UPDATE CITY SET ";
    let values: any[] = [];
    if(city.name){
         query('SELECT id FROM CITY WHERE name = ? AND country = (SELECT country FROM CITY WHERE id = ?)', [city.name, id])
            .then((result: any) => {
                if (result.length > 0) {
                    return res.status(409).json({
                        message: 'Bad request',
                        error: 'City already exists'
                    });
                }
                sql += "name = ?";
                values.push(city.name);
                if(city.country){
                    query('SELECT id FROM COUNTRY WHERE id = ?', [city.country]).then((result: any) => {
                        if (result.length == 0) {
                            return res.status(400).json({
                                message: 'Bad request',
                                error: 'Country not found'
                            });
                        }
                        if(city.name){
                            sql += ", ";
                        }
                        sql += "country = ?";
                        values.push(city.country);
                    });
                }
                sql += " WHERE id = ?";
                values.push(id);
                query(sql, values).then((result: any) => {
                    if (result.affectedRows > 0) {
                        return res.status(200).json({
                            message: 'City updated',
                            data: {
                                id: id,
                                name: city.name,
                                country: city.country
                            }
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
            });
    }

}

/**
 * @openapi
 * paths:
 *     /cities:
 *         delete:
 *             summary: Delete a city by id
 *             tags:
 *               - location
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: number
 *                     description: The id of the city
 *             responses:
 *                 '200':
 *                     description: City deleted
 *                     content:
 *                       application/json:
 *                         schema:
 *                           $ref: '#/components/schemas/Error'
 *                 '404':
 *                     description: No city found
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
const deleteCity = (req: Request, res: Response) => {
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

export default {getCity, addCity,updateCity, deleteCity, searchCity};