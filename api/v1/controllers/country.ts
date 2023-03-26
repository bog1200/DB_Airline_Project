import {Request, Response} from "express";
import {query} from "../../database";
import Country from "../interfaces/Country";

/**
 * @openapi
 * paths:
 *   /countries/all:
 *     get:
 *       summary: Get all countries
 *       tags:
 *         - location
 *       responses:
 *         '200':
 *           description: A country object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Country'
 *         '500':
 *           description: Server error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */
const getCountries = (req: Request, res: Response) => {
    query('SELECT * FROM COUNTRY')
        .then((result: any) => res.status(200).json(result as Country[]))
        .catch((err: any) => {
        return res.status(500).json({
            message: 'Server error',
            error: err
        });
    });
}
/**
 * @openapi
 * paths:
 *   /countries:
 *     get:
 *       summary: Get a country by id
 *       tags:
 *         - location
 *       parameters:
 *         - in: query
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *             description: The id of the country
 *       responses:
 *         '200':
 *           description: A country object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Country'
 *         '404':
 *           description: No country found
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
const getCountry = (req: Request, res: Response) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    query('SELECT * FROM COUNTRY WHERE id = ?', [id])
        .then((result: any) => {
            if (result.length == 0) {
                return res.status(404).json({
                    message: 'Country not found'
                });
            } else {
                return res.status(200).json(result as Country[]);
            }
        });
}
const searchCountry = (req: Request, res: Response) => {
    //search by name or icao
    const name = req.query.name;
    const icao = req.query.icao;
    if (!name && !icao) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    query('SELECT * FROM COUNTRY WHERE name LIKE ? OR icao LIKE ?', [`%${name}%`, `%${icao}%`])
        .then((result: any) => {
            if (result.length == 0) {
                return res.status(404).json({
                    message: 'Country not found'
                });
            } else {
                return res.status(200).json(result as Country[]);
            }
        });
}
/**
 * @openapi
 * paths:
 *   /countries:
 *     post:
 *       summary: Add a new country
 *       tags:
 *         - location
 *       parameters:
 *         - in: query
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *             description: The id of the country
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Country'
 *       responses:
 *         201:
 *           description: Country added
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Country added
 *                   data:
 *                     $ref: '#/components/schemas/Country'
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
const addCountry = (req: Request, res: Response) => {
    const icao = req.body.icao;
    const name = req.body.name;
    if (!icao || !name) {
        return res.status(400).json({
            message: 'Country ICAO and name are required'
        });
    }
    //icao must have only letters and be 3 characters long
    if (!/^[A-Z]{3}$/.test(icao)) {
        return res.status(400).json({
            message: 'Invalid ICAO code'
        });
    }
    query('INSERT INTO COUNTRY(icao, name) VALUES (?, ?)', [icao, name])
        .then((result: any) => {
            if (result.affectedRows == 1) {
                return res.status(201).json({message: 'Country created'});
            }
            return res.status(500).json({message: 'Server error'});
        })
        .catch((err: any) => {
            if (err.errno == 1062) {
                return res.status(409).json({message: 'Country already exists'});
            }
            return res.status(500).json({message: 'Server error'});
        });
}

/**
 * @openapi
 * paths:
 *   /countries:
 *     put:
 *       summary: Update country name
 *       tags:
 *         - location
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Country'
 *       responses:
 *         201:
 *           description: Country modified
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Country modified
 *                   data:
 *                     $ref: '#/components/schemas/Country'
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
const updateCountry = (req: Request, res: Response) => {
    const id = req.query.id;
    const name = req.body.name;
    if (!id || !name) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    query('UPDATE COUNTRY SET name = ? WHERE id = ?', [name, id])
        .then((result: any) => {
            if (result.affectedRows == 1) {
                return res.status(201).json({message: 'Country modified'});
            }
            return res.status(500).json({message: 'Server error'});
        })
        .catch((err: any) => {
            if (err.errno == 1062) {
                return res.status(409).json({message: 'Country already exists'});
            }
            return res.status(500).json({message: 'Server error'});
        });
}

/**
 * @openapi
 * paths:
 *     /countries:
 *         delete:
 *             summary: Delete a country by id
 *             tags:
 *               - location
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: number
 *                     description: The id of the country
 *             responses:
 *                 '200':
 *                     description: Country deleted
 *                     content:
 *                       application/json:
 *                         schema:
 *                           $ref: '#/components/schemas/Error'
 *                 '404':
 *                     description: No country found
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
const deleteCountry = (req: Request, res: Response) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({
            message: 'Country ID is required'
        });
    }
    query('DELETE FROM COUNTRY WHERE id = ?', [id])
        .then((result: any) => {
            if (result.affectedRows == 1) {
                return res.status(200).json({message: 'Country deleted'})
            }
            return res.status(404).json({message: 'Country not found'});
        })
        .catch((err: any) => {
        return res.status(500).json({
            message: 'Server error',
            error: err
        });
    });
}

export default {getCountries, getCountry, searchCountry, addCountry,updateCountry, deleteCountry};