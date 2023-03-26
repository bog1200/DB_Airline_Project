/**
 * @openapi
 *
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       required:
 *       - id
 *       - code
 *       - account_id
 *       - passenger_id
 *       - flight_id
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the ticket
 *           readOnly: true
 *           example: 1
 *           default: ""
 *         code:
 *           type: string
 *           default: ""
 *           example: "ABC123"
 *           description: Code of the ticket
 *         account_id:
 *           type: string
 *           format: uuid
 *           default: ""
 *           example: "00000000-0000-0000-0000-000000000000"
 *           description: ID of the account which bought the ticket
 *         passenger_id:
 *           type: integer
 *           default: ""
 *           example: "0"
 *           description: ID of the passenger to which the ticket belongs to
 *         flight_id:
 *           type: integer
 *           default: ""
 *           example: "0"
 *           description: ID of the flight to which the ticket belongs to
 */
interface Ticket {
    id?: number;
    code: string;
    account_id: string;
    passenger_id: number;
    flight_id: number ;
}
export = Ticket;