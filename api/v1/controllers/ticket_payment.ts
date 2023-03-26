import {Request, Response} from "express";
import {query} from "../../database";
import TicketPayment from "../interfaces/TicketPayment";
/**
 * @openapi
 * paths:
 *     /ticket/payments/all:
 *         get:
 *             summary: Get all ticket payments
 *             tags:
 *                 - payments
 *             responses:
 *                 '200':
 *                     description: A ticket payment object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/TicketPayment'
 *                 '500':
 *                     description: Server error
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Error'
 */
const getTicketPayments = async (req: Request, res: Response) => {
    const result : any = await query('SELECT * FROM TICKET_PAYMENT');
    if(result.length > 0) {
        return res.status(200).json({
            message: 'Ticket Payments found',
            data: result as TicketPayment[]
        });
    }
    return res.status(500).json({
        message: 'Server error'
    });
}
/**
 * @openapi
 * paths:
 *     /ticket/payments:
 *         get:
 *             summary: Get a ticket payment by id
 *             tags:
 *                 - payments
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: integer
 *                     description: The id of the ticket payment
 *             responses:
 *                 '200':
 *                     description: A ticket payment object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/TicketPayment'
 *                 '404':
 *                     description: No ticket payment found
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
const getTicketPayment = async (req: Request, res: Response) => {
    const id = req.query.id;
    const result : any = await query('SELECT * FROM TICKET_PAYMENT WHERE ID = ?', [id]);
    if(result.length > 0) {
        return res.status(200).json({
            message: 'Ticket Payment found',
            data: result[0] as TicketPayment
        });
    }
    return res.status(404).json({
        message: 'Ticket Payment not found',
        data: {}
    });
}
/**
 * @openapi
 * paths:
 *     /ticket/payments/search:
 *         get:
 *             summary: Search for tickets payment
 *             tags:
 *                 - payments
 *             parameters:
 *               - in: query
 *                 name: ticket_id
 *                 schema:
 *                    type: integer
 *                    description: The ticket id of the ticket payment
 *               - in: query
 *                 name: payment_method_id
 *                 schema:
 *                    type: string
 *                    description: The payment method of the ticket payment
 *             responses:
 *                 '200':
 *                     description: A ticket payment object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/TicketPayment'
 *                 '404':
 *                     description: No ticket payment found
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
const searchTicketPayments = async (req: Request, res: Response) => {
    //search by method or by ticket id
    const ticket_id = req.query.ticket_id;
    const payment_method_id = req.query.payment_method_id;

    if (!ticket_id && !payment_method_id) {
        return res.status(400).json({
            message: "Bad request"
        });
    }
    let sql = 'SELECT * FROM TICKET_PAYMENT WHERE ';
    let params : any[] = [];
    if (ticket_id) {
        sql += 'ticket_id = ?';
        params.push(ticket_id);
    }
    if (payment_method_id) {
        if(params.length > 0) {
            sql += ` AND `;
        }
        sql += 'payment_method_id = ?';
        params.push(payment_method_id);
    }
    const result : any = await query(sql, params);
    if(result.length > 0) {
        return res.status(200).json({
            message: 'Ticket Payments found',
            data: result as TicketPayment[]
        });
    }
    return res.status(404).json({
        message: 'Ticket Payments not found',
        data: {}
    });
};
/**
 * @openapi
 * paths:
 *   /ticket/payments:
 *     post:
 *       summary: Create a new ticket payment
 *       tags:
 *         - payments
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketPayment'
 *
 *       responses:
 *         '201':
 *           description: Ticket payment created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/TicketPayment'
 *         '500':
 *           description: Server error
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */
const addTicketPayment = async (req: Request, res: Response) => {
    const TicketPayment = req.body as TicketPayment;
    if(!TicketPayment.ticket_id || !TicketPayment.payment_method_id) {
        return res.status(400).json({
            message: "Bad request",
        });
    }
    const ticketPaymentCheck : any = await query('SELECT * FROM TICKET WHERE id = ?', [TicketPayment.ticket_id]);
    if(ticketPaymentCheck.length == 0) {
        return res.status(400).json({
            message: 'Bad request',
            error: 'Ticket not found'
        });
    }
    const paymentMethodCheck : any = await query('SELECT * FROM TICKET_PAYMENT_METHOD WHERE id = ?', [TicketPayment.payment_method_id]);
    if(paymentMethodCheck.length == 0) {
        return res.status(400).json({
            message: 'Bad request',
            error: 'Payment Method not found'
        });
    }
    const checkDuplicate : any = await query('SELECT * FROM TICKET_PAYMENT WHERE ticket_id = ? AND payment_method_id = ?', [TicketPayment.ticket_id, TicketPayment.payment_method_id]);
    if(checkDuplicate.length > 0) {
        return res.status(400).json({
            message: 'Bad request',
            error: 'Ticket Payment already exists'
        });
    }
    const result : any = await query('INSERT INTO TICKET_PAYMENT (ticket_id, payment_method_id) VALUES (?, ?)', [TicketPayment.ticket_id, TicketPayment.payment_method_id]);
    if(result.affectedRows > 0) {
        return res.status(201).json({
            message: 'Ticket Payment created',
            data: {
                id: result.insertId,
                ticket_id: TicketPayment.ticket_id,
                payment_method_id: TicketPayment.payment_method_id
            }
        });
    }
    return res.status(500).json({
        message: 'Internal server error',
        error: 'Ticket Payment not created'
    });
}
/**
 * @openapi
 * paths:
 *     /ticket/payments:
 *         delete:
 *             summary: Delete a ticket payment by id
 *             tags:
 *                 - payments
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: integer
 *                     description: The id of the ticket payment to delete
 *             responses:
 *                 '200':
 *                     description: Ticket payment deleted
 *                     content:
 *                       application/json:
 *                         schema:
 *                           $ref: '#/components/schemas/Error'
 *                 '404':
 *                     description: No ticket payment found
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
const deleteTicketPayment = async (req: Request, res: Response) => {
    const id = req.query.id;
    if(!id) {
        return res.status(400).json({
            message: "Bad request",
        });
    }
    const result : any = await query('DELETE FROM TICKET_PAYMENT WHERE id = ?', [id]);
    if(result.affectedRows > 0) {
        return res.status(200).json({
            message: 'Ticket Payment deleted',
            data: {
                 id: id
            }
        });
    } else {
    return res.status(404).json({
            message: 'Ticket Payment not found'
            });
    }
    
    return res.status(500).json({
        message: 'Server error'
    });
}

export default {getTicketPayments, getTicketPayment, searchTicketPayments, addTicketPayment, deleteTicketPayment};