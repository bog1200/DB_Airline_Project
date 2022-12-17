import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
//connect to the database
import { query } from '../../database';
//import the interface

interface Account {
    id?: number;
    email: string;
    password?: string;
    first_name: string;
    last_name: string;
}

const addAccount = (req: Request, res: Response, next: NextFunction) => {
    //hash the password
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
    //create the account
    const account: Account = {
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    };
    query(`INSERT INTO ACCOUNT SET ?`, account)
        .then((result: any) => {
            account.id = result.insertId;
            console.log(result);
            res.status(201).json({
                message: 'Account created',
                createdAccount: account
            });
        })
        .catch((err: any) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

const getAccount = (req: Request, res: Response, next: NextFunction) => {
    const id = req.query.id;
    query('SELECT id, first_name, last_name FROM ACCOUNT WHERE id = ?', [id])
        .then((result: any) => {
            if (result.length > 0) {
                res.status(200).json(result[0]);
            } else {
                res.status(404).json({
                    message: 'No valid entry found for provided ID'
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

export default { addAccount, getAccount };