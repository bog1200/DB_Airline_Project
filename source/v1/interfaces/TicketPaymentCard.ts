/**
 * @openapi
 *
 * components:
 *   schemas:
 *     TicketPaymentCard:
 *       type: object
 *       required:
 *       - id
 *       - ticket_id
 *       - card_id
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the ticket payment card
 *           readOnly: true
 *           example: 1
 *           default: ""
 *         ticket_id:
 *           type: integer
 *           default: ""
 *           example: "1"
 *           description: ID of the ticket to which the payment belongs to
 *         card_id:
 *           type: integer
 *           default: ""
 *           example: "1"
 *           description: ID of the card used to pay for the ticket
 */
interface TicketPaymentCard {
    id?: number;
    ticket_id: number;
    card_id: number;
}
export = TicketPaymentCard;