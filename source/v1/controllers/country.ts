import {Request, Response, NextFunction} from "express";
import {query} from "../../database";
import Country from "../interfaces/Country";

const getCountries = (req: Request, res: Response, next: NextFunction) => {
    query('SELECT * FROM COUNTRY')
        .then((result: any) => res.status(200).json(result as Country[]))
        .catch((err: any) => {
        return res.status(500).json({
            message: 'Server error',
            error: err
        });
    });```
}

const getCountry = (req: Request, res: Response, next: NextFunction) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    query('SELECT * FROM COUNTRY WHERE id = ?', [id])
        .then((result: any) => {
            if (result.length == 0) {
                res.status(404).json({
                    message: 'Country not found'
                });
            } else {
                res.status(200).json(result as Country[]);
            }
        });
}
const searchCountry = (req: Request, res: Response, next: NextFunction) => {
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
                res.status(404).json({
                    message: 'Country not found'
                });
            } else {
                res.status(200).json(result as Country[]);
            }
        });
}
const addCountry = (req: Request, res: Response, next: NextFunction) => {
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
        .then((result: any) => res.status(201).json({message: 'Country created'}))
        .catch((err: any) => {
        return res.status(500).json({
            message: 'Server error',
            error: err
        });
    });
}

const deleteCountry = (req: Request, res: Response, next: NextFunction) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({
            message: 'Country ID is required'
        });
    }
    query('DELETE FROM COUNTRY WHERE id = ?', [id])
        .then((result: any) => res.status(200).json({message: 'Country deleted'}))
        .catch((err: any) => {
        return res.status(500).json({
            message: 'Server error',
            error: err
        });
    });
}

export default {getCountries, getCountry, searchCountry, addCountry, deleteCountry};