import { Request, Response, NextFunction } from 'express';
import { query } from '../../database'; //connect to the database
import Airport from "../interfaces/Airport";  //import the interface

const getAirport = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
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

const searchAirports = (req: Request, res: Response, next: NextFunction) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }


    query('SELECT * FROM AIRPORT WHERE  city_id = ?', city).then ((result: any) => {
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

const addAirport = (req: Request, res: Response, next: NextFunction) => {
    const airport = req.body as Airport;

    query('SELECT ID FROM CITY WHERE id = ?', [airport.city_id])
    .then((result: any) => {
        if (result.length == 0) {
            return res.status(404).json({
                message: 'City not found'

            });
        }

        if (!airport.name || !airport.city_id || !airport.iata || !airport.icao || !airport.address) {
            return res.status(400).json({
                message: 'Bad request'

            });
        }

        query('INSERT INTO AIRPORT SET ?', [airport])
            .then((result: any) => {
                res.status(201).json({
                    message: 'Airport added',
                    airport:{
                        id: result.insertId,
                        ...airport
                    }
                });
            })

})

}

const deleteAirport = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
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
}



export default {getAirport, searchAirports, addAirport, deleteAirport};
