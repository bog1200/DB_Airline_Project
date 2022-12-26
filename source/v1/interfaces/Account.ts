/**
 * @openapi
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       required:
 *       - email
 *       - uuid
 *       - password
 *       - first_name
 *       - last_name
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email address associated with the account.
 *           example: 'mail@mail.com'
 *           default: ''
 *         uuid:
 *           type: string
 *           format: uuid
 *           description: The unique id associated with the account.
 *           example: '00000000-0000-0000-0000-000000000000'
 *           default: ''
 *         password:
 *           type: string
 *           format: password
 *           description: The password for the account.
 *           example: 'password'
 *           default: ''
 *           writeOnly: true
 *           minLength: 8
 *           maxLength: 64
 *           pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
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
 *
 *
 */
interface Account {
    id?: number;
    uuid?: string;
    email?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
}
export = Account;
