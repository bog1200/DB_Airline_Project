import {Request, Response} from 'express';
import {query} from '../../database'; //connect to the database
import AccountCard from '../interfaces/AccountCard'; //import the interface\


/**
 * @openapi
 * paths:
 *     /account/cards:
 *         get:
 *             summary: Get a list of all account cards
 *             tags:
 *                 - cards
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
 *                     description: A card object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/AccountCard'
 *                 '400':
 *                     description: Invalid request
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Error'
 *                 '404':
 *                     description: No cards found
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
const getAccountCard =  (req: Request, res: Response) => {
    const account_id = req.query.uuid;
    if(!account_id){
        return res.status(400).json({
            message: 'Account ID is required'
        });
    }
    query('SELECT * FROM ACCOUNT_CARD WHERE account_id = ?', [account_id])
        .then((results: any) => {
           if(results.length == 0) {
               return res.status(404).json({
                   message: 'No account card found'
               });
           }
               return res.status(200).json({
                   message: 'Account card found', data: results as AccountCard[]
               })
           })
        .catch((err: any) => {
                console.log(err);
                res.status(500).json({
                    message: 'Server error',
                    error: err
                });
        });
}

/**
 * @openapi
 * paths:
 *   /account/cards:
 *     post:
 *       summary: Add a new account card
 *       tags:
 *       - cards
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccountCard'
 *       responses:
 *         200:
 *           description: Card added
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Card added
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: All fields are required
 *         404:
 *           description: Account not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Account not found
 *         500:
 *           description: Server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Server error
 *                   error:
 *                     type: object
 */

const addAccountCard = (req: Request, res: Response) => {
    const account_id = req.body.account_id;
    const cardholder_first_name = req.body.cardholder_first_name;
    const cardholder_last_name = req.body.cardholder_last_name;
    const card_number = req.body.card_number;
    const exp_month = req.body.exp_month;
    const exp_year = req.body.exp_year;
    const cvv = req.body.cvv;
    if (!account_id || !cardholder_first_name || !cardholder_last_name || !card_number || !exp_month || !exp_year || !cvv) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    //check if the user with the specified uuid already exists
    query('SELECT uuid FROM ACCOUNT WHERE uuid = ?', [account_id])
        .then((results: any) => {
            if (results.length == 0) {
                return res.status(404).json({
                    message: 'Bad request',
                    error: 'Account not found'
                });
            }
            if (!isLuhnValid(card_number)) {
                return res.status(400).json({
                    message: 'Bad request',
                    error: 'Invalid card number'
                });
            }
            if (exp_month > 12 || exp_month < 1) {
                return res.status(400).json({
                    message: 'Bad request',
                    error: 'Invalid month'
                });
            }
            //compare the expiration date to the current date
            const currentMonth = new Date().getMonth() + 1;
            const currentYear = new Date().getFullYear();
            if (exp_year < currentYear || (exp_year == currentYear && exp_month < currentMonth)) {
                return res.status(400).json({
                    message: 'Bad request',
                    error: 'Card has expired'
                });
            }
            if (cvv.length != 3) {
                return res.status(400).json({
                    message: 'Bad request',
                    error: 'Invalid CVV'
                });
            }
            //check if the card already exists
            query('SELECT id FROM ACCOUNT_CARD WHERE card_number = ? AND account_id = ?', [card_number, account_id])
                .then((results: any) => {
                    if (results.length > 0) {
                        return res.status(400).json({
                            message: 'Bad request',
                            error: 'Card already exists'
                        });
                    }
                    //add the card to the database
                    query('INSERT INTO ACCOUNT_CARD (account_id, cardholder_first_name, cardholder_last_name, card_number, exp_month, exp_year, cvv) VALUES (?, ?, ?, ?, ?, ?, ?)', [account_id, cardholder_first_name, cardholder_last_name, card_number, exp_month, exp_year, cvv])
                        .then((results: any) => {
                            return res.status(200).json({
                                message: 'Card added'
                            });
                        })
                        .catch((err: any) => {
                            console.log(err);
                            res.status(500).json({
                                message: 'Server error',
                                error: err
                            });
                        });
                }
                )
        }
        )
}

/**
 * @openapi
 * paths:
 *   /account/cards:
 *     delete:
 *       summary: Delete an account card
 *       tags:
 *         - cards
 *       parameters:
 *       - in: query
 *         name: account_id
 *         description: Account ID
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: card_id
 *         description: Card ID
 *         required: true
 *         schema:
 *           type: integer
 *
 *       responses:
 *         200:
 *           description: Account card deleted
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Account card deleted
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: All fields are required
 *         404:
 *           description: No account card found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: No account card found
 *         500:
 *           description: Server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Server error
 *                   error:
 *                     type: object
 */

const deleteAccountCard = (req: Request, res: Response) => {
    const account_id = req.query.account_id;
    const card_id = req.query.card_id;
    if (!account_id || !card_id) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    query('DELETE FROM ACCOUNT_CARD WHERE account_id = ? AND id = ?', [account_id, card_id])
        .then((results: any) => {
           if(results.affectedRows == 0) {
               return res.status(404).json({
                   message: 'No account card found'
               });
           }
           return res.status(200).json({
               message: 'Account card deleted'
           });
        })

        .catch((err: any) => {
            console.log(err);
            res.status(500).json({
                message: 'Server error',
                error: err
            });
        });
}


export default {addAccountCard, getAccountCard, deleteAccountCard};

function checkLuhn(strToTest: string): number
{
    let digit: number = 0;
    let sum: number = 0;
    let length: number = strToTest.length;
    let odd: boolean = false;

    for (let i: number = (length - 1); i >= 0; i--)
    {
        digit = parseInt(strToTest[i], 10) | 0;

        if (odd)
        {
            digit = digit * 2 | 0;
        }
        if (digit > 9)
        {
            digit = digit - 9;
        }
        odd = !odd;
        sum += digit;
    }
    let res: number = sum % 10;
    if (res === 0)
    {
        return 0;
    }
    return 10 - (res);
}
function isLuhnValid(strToTest: string): boolean
{
    if (strToTest.length === 0)
    {
        return false;
    }
    return (checkLuhn(strToTest) === 0);
}

