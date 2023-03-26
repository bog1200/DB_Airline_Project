/**
 * @openapi
 *
 * components:
 *   schemas:
 *     AccountCard:
 *       type: object
 *       required:
 *       - id
 *       - account_id
 *       - cardholder_first_name
 *       - cardholder_last_name
 *       - card_number
 *       - exp_month
 *       - exp_year
 *       - cvv
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the account card
 *           readOnly: true
 *         account_id:
 *           type: string
 *           format: uuid
 *           description: UUID of the account to which the card belongs
 *           example: "00000000-0000-0000-0000-000000000000"
 *         cardholder_first_name:
 *           type: string
 *           description: First name of the cardholder
 *         cardholder_last_name:
 *           type: string
 *           description: Last name of the cardholder
 *         card_number:
 *           type: string
 *           description: Card number
 *         exp_month:
 *           type: integer
 *           description: Expiration month of the card (1-12)
 *         exp_year:
 *           type: integer
 *           description: Expiration year of the card
 *           example: 2020
 *         cvv:
 *           type: string
 *           description: Card verification value
 *           example: "123"
 *           minLength: 3
 *           maxLength: 4
 *           pattern: "^[0-9]{3,4}$"
 */
interface AccountCard {
    id?: number;
    account_id: number;
    cardholder_first_name: string;
    cardholder_last_name: string;
    card_number: string;
    exp_month: number;
    exp_year: number;
    cvv: string;
}
export = AccountCard;