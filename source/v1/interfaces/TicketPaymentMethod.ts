/**
 * @openapi
 *
 * components:
 *   schemas:
 *     TicketPaymentMethod:
 *       type: object
 *       required:
 *       - id
 *       - method
 *       - payment_method_id
 *       - date
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the ticket payment method
 *           readOnly: true
 *           example: 1
 *           default: ""
 *         method:
 *           type: string
 *           default: ""
 *           example: "CASH"
 *           description: Name of the payment method
 */
interface TicketPaymentMethod {
    id?: number;
    method: string;
}
export = TicketPaymentMethod;