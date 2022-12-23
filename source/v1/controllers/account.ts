

import { Request, Response, NextFunction } from 'express';
import { query } from '../../database'; //connect to the database
import Account from '../interfaces/Account'; //import the interface
import bcrypt from 'bcrypt'; //password encryption

/**
 * @openapi
 * paths:
 *   /api/v1/accounts:
 *     post:
 *       summary: Create an account
 *       tags:
 *         - accounts
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewAccount'
 *       responses:
 *         '201':
 *           description: Account created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Account'
 *         '500':
 *           description: Server error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *         '409':
 *           description: Email already exists
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */


const addAccount = (req: Request, res: Response, next: NextFunction) => {
    //hash the password
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
    //create the account
    if (!req.body.email || !req.body.password || !req.body.first_name || !req.body.last_name) {
        return res.status(400).json({
            message: 'Email, password, first name, and last name are required'
        });
    }
    const account: Account = {
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    };
    query(`SELECT ID FROM ACCOUNT WHERE email = ?`, [account.email])
        .then((result: any) => {
            if (result.length > 0) {
                return res.status(409).json({
                    message: 'Email already exists'
                });
            }
            query(`INSERT INTO ACCOUNT (email, password, first_name, last_name) VALUES (?, ?, ?, ?)`, [account.email, account.password, account.first_name, account.last_name])
                .then((result: any) => {
                    return res.status(201).json({
                        message: 'Account created',
                        account: account
                    });
                })
                .catch((err: any) => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        });
}

/**
 * @openapi
 * paths:
 *     /api/v1/accounts:
 *         get:
 *             summary: Get an account by id
 *             tags:
 *                 - accounts
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   schema:
 *                     type: integer
 *                     required: true
 *                     description: The id of the account
 *             responses:
 *                 '200':
 *                     description: A account object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Account'
 *                 '404':
 *                     description: No account found
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

/**
 * @openapi
 * paths:
 *   /api/v1/accounts/login:
 *     post:
 *       summary: Login to an account
 *       tags:
 *         - accounts
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *             example:
 *               email:
 *               password:
 *       responses:
 *         '200':
 *           description: Login successful
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Account'
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *         '401':
 *           description: Login failed
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

const loginAccount = (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).json({
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