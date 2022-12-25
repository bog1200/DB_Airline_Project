import { Request, Response, NextFunction } from 'express';
import { query } from '../../database'; //connect to the database
import Airport from "../interfaces/Airport";  //import the interface

/**
 * @openapi
 * paths:
 *     /airports:
 *         get:
 *             summary: Get an airport by id
 *             tags:
 *                 - airports
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   schema:
 *                     type: integer
 *                     required: true
 *                     description: The id of the airport
 *             responses:
 *                 '200':
 *                     description: A airport object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Airport'
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
const getAirport = (req: Request, res: Response, next: NextFunction) => {
    const id = req.query.id;
    query('SELECT * FROM AIRPORT WHERE id = ?', [id])
        .then((result: any) => {
            if (result.length > 0) {
                res.status(200).json({
                    message: 'Airport found',
                    airport: result[0] as Airport //cast
                });
            } else {
                res.status(404).json({
                    message: 'Airport not found'
                });
            }
        })
};

/**
 * @openapi
 *
 * paths:
 *   /airports/search:
 *     get:
 *       summary: Search for airports
 *       tags:
 *         - airports
 *       parameters:
 *         - name: city_id
 *           in: query
 *           description: ID of the city for the airport
 *           schema:
 *             type: number
 *             example: 0
 *         - name: iata
 *           in: query
 *           description: IATA code for the airport
 *           schema:
 *             type: string
 *             example: "AMS"
 *             minLength: 3
 *             maxLength: 3
 *             pattern: "^[A-Z]{3}$"
 *         - name: icao
 *           in: query
 *           description: ICAO code for the airport
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
 *                     example: Airports found
 *                   flights:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Airport'
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
 *           description: Airport not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Airport not found
 */
const searchAirports = (req: Request, res: Response, next: NextFunction) => {
    const city_id = req.query.city_id;
    const iata = req.query.iata;
    const icao = req.query.icao;

    if (!city_id && !iata && !icao) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }

    let sql = 'SELECT * FROM AIRPORT WHERE ';
    let params: any[] = [];

    if (city_id) {
        sql += 'city_id = ?';
        params.push(city_id);
    }
    if(iata) {
        if (params.length > 0) {
            sql += ' AND ';
        }
        sql += 'iata = ?';
        params.push(iata);
    }
    if(icao) {
        if (params.length > 0) {
            sql += ' AND ';
        }
        sql += 'icao = ?';
        params.push(icao);
    }


    query(sql, params).then ((result: any) => {
        if (result.length == 0) {
            res.status(404).json({
                message: 'Airport not found'
            });
        } else {
            res.status(200).json({
                message: 'Airport found',
                airports: result as Airport[]
            });
        }
    }
    )


}

/**
 * @openapi
 * paths:
 *   /airports:
 *     post:
 *       summary: Add a new airport
 *       tags:
 *         - airports
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Airport'
 *       responses:
 *         201:
 *           description: Airport added
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Airport added
 *                   airport:
 *                     $ref: '#/components/schemas/Airport'
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
const addAirport = (req: Request, res: Response, next: NextFunction) => {
    const airport = req.body as Airport;
    if (!airport.name || !airport.city_id || !airport.iata || !airport.icao || !airport.address || airport.icao.length != 4 || airport.iata.length != 3) {
        return res.status(400).json({
            message: 'Bad request'

        });
    }
    query("SELECT id FROM CITY WHERE id = ?", [airport.city_id]).then((result: any) => {
        if (result.length == 0) {
            return res.status(400).json({
                message: 'Bad request'
            });
        }
        query('SELECT * FROM AIRPORT WHERE iata = ? OR icao = ?', [airport.iata, airport.icao])
            .then((result: any) => {
                    if (result.length > 0) {
                        return res.status(400).json({
                            message: 'Bad request'
                        });
                    } else {
                        query('INSERT INTO AIRPORT SET ?', [airport])
                            .then((result: any) => {
                                res.status(201).json({
                                    message: 'Airport added',
                                    airport: result[0] as Airport
                                });
                            })
                    }
                }
            )
        }
    );

}


/**
 * @openapi
 * paths:
 *     /airports:
 *         delete:
 *             summary: Delete an airport by id
 *             tags:
 *                 - airports
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: number
 *                     description: The id of the airport
 *             responses:
 *                 '200':
 *                     description: Airport deleted
 *                     content:
 *                       application/json:
 *                         schema:
 *                           $ref: '#/components/schemas/Error'
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

const deleteAirport = (req: Request, res: Response, next: NextFunction) => {
    const id = req.query.id;
    query('DELETE FROM AIRPORT WHERE id = ?', [id])
        .then((result: any) => {
            if (result.affectedRows > 0) {
                res.status(200).json({
                    message: 'Airport deleted'
                });
            } else {
                res.status(404).json({
                    message: 'Airport not found'
                });
            }
        })
        .catch((err: any) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });


}



export default {getAirport, searchAirports, addAirport, deleteAirport};
