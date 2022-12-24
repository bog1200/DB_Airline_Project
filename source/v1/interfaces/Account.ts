/**
 * @openapi
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The email address associated with the account.
 *           example: 'mail@mail.com'
 *           nullable: true
 *           default: ''
 *         uuid:
 *           type: string
 *           format: uuid
 *           description: The unique id associated with the account.
 *           example: 'cbc5c120-860f-4088-a1c2-55931abcf288 '
 *           nullable: true
 *           default: ''
 *         password:
 *           type: string
 *           format: password
 *           description: The password for the account.
 *           example: 'password'
 *           nullable: true
 *           default: ''
 *         first_name:
 *           type: string
 *           description: The first name of the account holder.
 *           required: true
 *           default: ''
 *           example: 'John'
 *           nullable: true
 *         last_name:
 *           type: string
 *           description: The last name of the account holder.
 *           default: ''
 *           example: 'Doe'
 *           nullable: true
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
