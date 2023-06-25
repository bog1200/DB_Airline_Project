import { Request, Response} from 'express';
import { query } from '../../database'; //connect to the database
import Account from '../interfaces/Account'; //import the interface
import JWT, {JwtPayload} from 'jsonwebtoken';
import axios from 'axios';
import fs from 'fs';



/**
 * @openapi
 * paths:
 *     /accounts:
 *         get:
 *             summary: Get an account by uuid (both local and SSO)
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
const getAccount = (req: Request, res: Response) => {
    const uuid = req.query.uuid;
    query('SELECT uuid, email, first_name, last_name FROM ACCOUNT WHERE sso_uuid = ?', [uuid])
        .then((result: any) => {
            if (result.length == 0) {
                return res.status(404).json({
                    message: 'No valid entry found for provided uuid'
                });
            }
            res.status(200).json(result[0] as Account);
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
 *     /accounts/loginExternal:
 *         get:
 *             summary: Login with SSO account
 *             tags:
 *                 - accounts
 *             parameters:
 *                 - in: query
 *                   name: code
 *                   required: true
 *                   schema:
 *                     type: string
 *                     description: The code from the SSO
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
const loginExternalAccount = async (req: Request, res: Response) => {
    const code = req.query.code;
    const state = req.query.state || "test" ;

    if (!code || !state) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }


    const data = {
        grant_type: 'authorization_code',
        client_id: process.env.SSO_CLIENT_ID,
        client_secret: process.env.SSO_CLIENT_SECRET,
        code: code
    };

     await axios.post("https://auth.romail.app/oauth2/token", data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(async (response: any) => {
         const {access_token} = response.data;
         if (!access_token) {
             return res.status(400).json({
                 message: 'Bad request'
             });
         }
         const decoded_token = decodeToken(access_token);
            if (!decoded_token) {
                return res.status(400).json({
                    message: 'Bad request'
                });
            }
            const uuid = decoded_token.sub!;
            const checkAccount: any = await query('SELECT sso_uuid FROM ACCOUNT WHERE sso_uuid = ?', [uuid]);
            if (checkAccount.length == 0) {
                const account: Account = {
                    sso_uuid: uuid
                };
                const createAccount: any = await query('INSERT INTO ACCOUNT (sso_uuid) VALUES (?)', [account.sso_uuid]);
                if (createAccount.affectedRows == 0) {
                    return res.status(500).json({
                        message: 'Internal server error'
                    });
                }

                return res.status(200).json( {
                    message: 'Authentication successful',
                    data: {
                        access_token: access_token
                    }
                });
            }
            const loginTime =new Date();
            const account: Account = {
                sso_uuid: uuid,
                // convert Date to timestamp
                last_login: loginTime
            };
            const updateAccount: any = await query('UPDATE ACCOUNT SET last_login = ? WHERE sso_uuid = ?', [loginTime.toISOString().slice(0, 19).replace('T', ' '), account.sso_uuid]);
            if (updateAccount.affectedRows == 0) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }
            return res.status(200).json({
                message: 'Authentication successful',
                data: {
                    access_token: access_token
                }
            });



    }).catch((err: any) => {
        console.log(err);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
    );



      // const uuid = decoded.sub;
      // const checkAccount: any = await query('SELECT sso_uuid FROM ACCOUNT WHERE sso_uuid = ?', [uuid]);
      // if (checkAccount.length == 0) {
      //     const account: Account = {
      //         sso_uuid: uuid,
      //         last_login: new Date()
      //     };
      //     const createAccount: any = await query('INSERT INTO ACCOUNT SET ?', [account]);
      //     if (createAccount.affectedRows == 0) {
      //         return res.status(500).json({
      //             message: 'Internal server error'
      //         });
      //     }
      //     account.first_name = decoded.first_name;
      //     account.last_name = decoded.last_name;
      //     account.email = decoded.email;
      //
      //     return res.status(200).json(account);
      // }
      // const account: Account = {
      //     sso_uuid: uuid,
      //     first_name: decoded.first_name,
      //     last_name: decoded.last_name,
      //     email: decoded.email,
      //     last_login: new Date()
      // };
      // const updateAccount: any = await query('UPDATE ACCOUNT SET last_login = ? WHERE sso_uuid = ?', [account.last_login!.valueOf() / 1000, uuid]);
      // if (updateAccount.affectedRows == 0) {
      //     return res.status(500).json({
      //         message: 'Internal server error'
      //     });
      // }
      // return res.status(200).json(account);
      //

}
const decodeToken = (token: string)  => {
    const publicKey = fs.readFileSync('keys/public.key', 'utf8');
    const decoded = JWT.verify(token, publicKey, { algorithms: ['RS256'] });
    return decoded as JwtPayload;

}


export default { getAccount, loginExternalAccount};