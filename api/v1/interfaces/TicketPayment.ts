/**
 * @openapi
 *
 * components:
 *   schemas:
 *     TicketPayment:
 *       type: object
 *       required:
 *       - id
 *       - ticket_id
 *       - payment_method_id
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the ticket payment
 *           readOnly: true
 *           example: 1
 *           default: ""
 *         ticket_id:
 *           type: integer
 *           default: ""
 *           example: "1"
 *           description: ID of the ticket to which the payment belongs to
 *
 *         payment_method_id:
 *           type: integer
 *           default: ""
 *           example: "1"
 *           description: ID of the payment method used to pay for the ticket
 *         date:
 *           type: integer
 *           format: timestamp
 *           default: ""
 *           example: "1560000000"
 *           description: Timestamp of when the payment was made
 */
interface TicketPayment {
    id?: number;
    ticket_id: number;
    payment_method_id: number;
    date?: Date;
}
export = TicketPayment;