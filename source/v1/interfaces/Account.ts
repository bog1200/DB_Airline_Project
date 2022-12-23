/**
 * @openapi
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The unique identifier for the account.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address associated with the account.
 *         password:
 *           type: string
 *           format: password
 *           description: The password for the account.
 *         first_name:
 *           type: string
 *           description: The first name of the account holder.
 *         last_name:
 *           type: string
 *           description: The last name of the account holder.
 *     NewAccount:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email address associated with the account.
 *           example: 'mail@mail.com'
 *           default: ''
 *         password:
 *           type: string
 *           format: password
 *           description: The password for the account.
 *           example: 'password'
 *           default: ''
 *         first_name:
 *           type: string
 *           description: The first name of the account holder.
 *           required: true
 *           default: ''
 *           example: 'John'
 *         last_name:
 *           type: string
 *           description: The last name of the account holder.
 *           default: ''
 *           example: 'Doe'
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email address associated with the account.
 *           example: ''
 *         password:
 *           type: string
 *           format: password
 *           description: The password for the account.
 *           example: ''
 *
 */
interface Account {
    id?: number;
    email?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
}
export = Account;