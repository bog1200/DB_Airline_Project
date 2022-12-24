

import { Request, Response, NextFunction } from 'express';
import { query } from '../../database'; //connect to the database
import Account from '../interfaces/Account'; //import the interface
import bcrypt from 'bcrypt'; //password encryption
import {v4 as uuidv4} from 'uuid'; //unique account id

/**
 * @openapi
 * paths:
 *   /accounts:
 *     post:
 *       summary: Create an account
 *       tags:
 *         - accounts
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *             example:
 *               email: "johndoe@example.com"
 *               password: "1234"
 *               first_name: "John"
 *               last_name: "Doe"
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
    if (!req.body.email || !req.body.password || !req.body.first_name || !req.body.last_name) {
        return res.status(400).json({
            message: 'Email, password, first name, and last name are required'
        });
    }
    query(`SELECT ID FROM ACCOUNT WHERE email = ?`, [req.body.email])
        .then((result: any) => {
            if (result.length > 0) {
                return res.status(409).json({
                    message: 'Email already exists'
                });
            }
            const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

            const account: Account = {
                uuid: uuidv4(),
                email: req.body.email,
                password: hash,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
            };

            query(`INSERT INTO ACCOUNT (email, uuid, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)`, [account.email, account.uuid, account.password, account.first_name, account.last_name])
                .then((result: any) => {
                    return res.status(201).json({message: 'Account created'});
                })
                .catch((err: any) => {
                    console.log(err);
                    return res.status(500).json({
                        error: err
                    });
                });
        })
        .catch((err: any) => {
            console.log(err);
            return res.status(500).json({
                error: err
            });
        });
}

/**
 * @openapi
 * paths:
 *     /accounts:
 *         get:
 *             summary: Get an account by uuid
 *             tags:
 *                 - accounts
 *             parameters:
 *                 - in: query
 *                   name: uuid
 *                   schema:
 *                     type: string
 *                     format: uuid
 *                     required: true
 *                     description: The uuid of the account
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
    const uuid = req.query.uuid;
    query('SELECT uuid, first_name, last_name FROM ACCOUNT WHERE uuid = ?', [uuid])
        .then((result: any) => {
            if (result.length == 0) {
                return res.status(404).json({
                    message: 'No valid entry found for provided uuid'
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
 *   /accounts/login:
 *     post:
 *       summary: Login to an account
 *       tags:
 *         - login
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
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
                uuid: result[0].uuid,
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

/**
 * @openapi
 * paths:
 *     /accounts:
 *         delete:
 *             summary: Delete an account by uuid
 *             tags:
 *                 - accounts
 *             parameters:
 *                 - in: query
 *                   name: uuid
 *                   required: true
 *                   schema:
 *                     type: string
 *                     format: uuid
 *                     description: The uuid of the account
 *             responses:
 *                 '200':
 *                     description: Account deleted
 *                     content:
 *                       application/json:
 *                         schema:
 *                           $ref: '#/components/schemas/Error'
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
const deleteAccount = (req: Request, res: Response, next: NextFunction) => {
    const uuid = req.query.uuid;
    query('DELETE FROM ACCOUNT WHERE uuid = ?', [uuid])
        .then((result: any) => {
            if(result.affectedRows == 0) {
                return res.status(404).json({
                    message: 'No valid entry found for provided uuid'
                });
            }
            res.status(200).json({
                message: 'Account deleted'
            });
        })
        .catch((err: any) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}


export default { addAccount, getAccount, loginAccount, deleteAccount };