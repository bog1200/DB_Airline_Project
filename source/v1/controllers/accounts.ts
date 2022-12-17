import { Request, Response, NextFunction } from 'express';
import { query } from '../../database'; //connect to the database
import Account from '../interfaces/account'; //import the interface
import bcrypt from 'bcrypt'; //password encryption


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
            if (result.length == 0) {
                return res.status(404).json({
                    message: 'No valid entry found for provided ID'
                });
            }
            res.status(200).json(result[0]);
        })
        .catch((err: any) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

const loginAccount = (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        res.status(400).json({
            message: 'Email and password are required'
        });
    }
    query('SELECT * FROM ACCOUNT WHERE email = ?', [email])
        .then((result: any) => {
            if (result.length == 0) {
                return res.status(401).json({
                    message: 'Authentication failed' //email not found
                });
            }
            if (!bcrypt.compareSync(password, <string>result[0].password)) {
                return res.status(401).json({
                    message: 'Authentication failed' //password incorrect
                });
            }
             const account: Account = {
                id: result[0].id,
                email: result[0].email,
                first_name: result[0].first_name,
                last_name: result[0].last_name,
            };

            res.status(200).json({
                message: 'Authentication successful',
                account: account
            });
        })
        .catch((err: any) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

    // const loginAccount = (req: Request, res: Response, next: NextFunction) => {
    //     const email = req.body.email;
    //     const password = req.body.password;
    // if(email && password) {
    //     query('SELECT * FROM ACCOUNT WHERE email = ?', [email])
    //         .then((result: any) => {
    //             if (result.length > 0) {
    //                 const account: Account = {
    //                     id: result[0].ID,
    //                     email: result[0].EMAIL,
    //                     first_name: result[0].FIRST_NAME,
    //                     last_name: result[0].LAST_NAME,
    //                 };
    //                 if (bcrypt.compareSync(password, <string>result[0].PASSWORD)) {
    //                     res.status(200).json({
    //                         message: 'Authentication successful',
    //                         account: account
    //                     });
    //                 } else {
    //                     res.status(401).json({
    //                         message: 'Authentication failed'
    //                     });
    //                 }
    //             } else {
    //                 res.status(401).json({
    //                     message: 'Authentication failed'
    //                 });
    //             }
    //         })
    //         .catch((err: any) => {
    //             console.log(err);
    //             res.status(500).json({
    //                 error: err
    //             });
    //         });
    // } else {
    //     res.status(401).json({
    //         message: 'Authentication failed'
    //     });
    // }

export default { addAccount, getAccount, loginAccount };