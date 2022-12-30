import {Request, Response} from "express";
import {query, RowDataPacket, OkPacket} from "../../database";
import TicketPaymentCard from "../interfaces/TicketPaymentCard";
/**
 * @openapi
 * paths:
 *     /ticket/payment/cards/all:
 *         get:
 *             summary: Get all ticket payment cards
 *             tags:
 *                 - payments
 *             responses:
 *                 '200':
 *                     description: A ticket payment card object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/TicketPaymentCard'
 *                 '500':
 *                     description: Server error
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Error'
 */
const getTicketPaymentsCard = async (req: Request, res: Response) => {
    const result: RowDataPacket[] = <RowDataPacket[]> await query("SELECT * FROM TICKET_PAYMENT_CARD");
    if (result.length > 0) {
        return res.status(200).json({
            message: "Ticket Payment Card found",
            data: result as TicketPaymentCard[]
        });
    }
    return res.status(500).json({
        message: 'Server Error'
    });
}
/**
 * @openapi
 * paths:
 *     /ticket/payment/cards:
 *         get:
 *             summary: Get ticket payment card by id
 *             tags:
 *                 - payments
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: integer
 *                     description: The id of the ticket payment card
 *             responses:
 *                 '200':
 *                     description: A ticket payment card object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/TicketPaymentCard'
 *                 '404':
 *                     description: No ticket payment card found
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
const getTicketPaymentCard= async (req: Request, res: Response) => {
    const id = req.query.id;
    const result: RowDataPacket[] = <RowDataPacket[]> await query("SELECT * FROM TICKET_PAYMENT_CARD WHERE ID = ?", [id]);
    if(result.length > 0){
        return res.status(200).json({
            message: "Ticket Payment Card found",
            data: result as TicketPaymentCard[]
        });
    }
    return res.status(404).json({
        message: 'Ticket Payment Card not found',
        data: {}
    });
}
/**
 * @openapi
 * paths:
 *     /ticket/payment/cards/search:
 *         get:
 *             summary: Search for tickets payment cards
 *             tags:
 *                 - payments
 *             parameters:
 *               - in: query
 *                 name: ticket_id
 *                 schema:
 *                    type: string
 *                    description: The ticket_id of the ticket payment card\
 *               - in: query
 *                 name: card_id
 *                 schema:
 *                    type: string
 *                    description: The card_id of the ticket payment card
 *             responses:
 *                 '200':
 *                     description: A ticket payment card object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/TicketPaymentCard'
 *                 '404':
 *                     description: No ticket payment card found
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
const searchTicketPaymentCard = async (req: Request, res: Response) => {
    //search by ticket_id or card_id
    const ticket_id = req.query.ticket_id;
    const card_id = req.query.card_id;
    if(!ticket_id && !card_id){
        return res.status(400).json({
            message: 'Bad Request'
        });
    }
    let sql = "SELECT * FROM TICKET_PAYMENT_CARD WHERE ";
    let params : any[] = [];
    if(ticket_id){
        if(params.length > 0){
            sql += " AND ";
        }
        sql += "TICKET_ID = ?";
        params.push(ticket_id);
    }
    if(card_id){
        if(params.length > 0){
            sql += " AND ";
        }
        sql += "CARD_ID = ?";
        params.push(card_id);
    }
    const result: RowDataPacket[] = <RowDataPacket[]> await query(sql, params);
    if(result.length > 0){
        return res.status(200).json({
            message: "Ticket Payment Card found",
            data: result as TicketPaymentCard[]
        });
    }
    return res.status(404).json({
        message: 'Ticket Payment Card not found',
        data: {}
    });
}
/**
 * @openapi
 * paths:
 *   /ticket/payment/cards:
 *     post:
 *       summary: Create a new ticket payment card
 *       tags:
 *         - payments
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketPaymentCard'
 *       responses:
 *         '201':
 *           description: Ticket payment card created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/TicketPaymentCard'
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
const addTicketPaymentCard = async (req: Request, res: Response) => {
    const TicketPaymentCard: TicketPaymentCard = req.body;
    if(!TicketPaymentCard.ticket_id || !TicketPaymentCard.card_id){
        return res.status(400).json({
            message: 'Bad Request'
        });
    }
    const ticketPaymentCheck: RowDataPacket[] = <RowDataPacket[]> await query("SELECT * FROM TICKET WHERE id = ?", [TicketPaymentCard.ticket_id]);
    if(ticketPaymentCheck.length == 0){
        return res.status(400).json({
            message: 'Bad Request',
            error: 'Ticket Payment Card not found'
        });
    }
    const AccountCardCheck: RowDataPacket[] = <RowDataPacket[]> await query("SELECT * FROM ACCOUNT_CARD WHERE id = ?", [TicketPaymentCard.card_id]);
    if(AccountCardCheck.length == 0){
        return res.status(400).json({
            message: 'Bad Request',
            error: 'Account Card not found'
        });
    }
    const duplicateCheck: RowDataPacket[] = <RowDataPacket[]> await query("SELECT * FROM TICKET_PAYMENT_CARD WHERE ticket_id = ? AND card_id = ?", [TicketPaymentCard.ticket_id, TicketPaymentCard.card_id]);
    if(duplicateCheck.length > 0){
        return res.status(400).json({
            message: 'Bad Request',
            error: 'Duplicate Ticket Payment Card'
        });
    }
    const result: OkPacket = <OkPacket> await query("INSERT INTO TICKET_PAYMENT_CARD (ticket_id, card_id) VALUES (?,?)", [TicketPaymentCard.ticket_id, TicketPaymentCard.card_id]);
    if(result.affectedRows > 0){
        return res.status(201).json({
            message: "Ticket Payment Card created",
            data: {
                id: result.insertId,
                ...TicketPaymentCard
            }
        });
    }
    return res.status(500).json({
        message: 'Internal Server Error',
        error: 'Ticket Payment Card not created'
    });
}
/**
 * @openapi
 * paths:
 *     /ticket/payment/cards:
 *         delete:
 *             summary: Delete a ticket payment card by id
 *             tags:
 *                 - payments
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: integer
 *                     description: The id of the ticket payment card to delete
 *             responses:
 *                 '200':
 *                     description: Ticket payment card deleted
 *                     content:
 *                       application/json:
 *                         schema:
 *                           $ref: '#/components/schemas/Error'
 *                 '404':
 *                     description: No ticket payment card found
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
const deleteTicketPaymentCard = async (req: Request, res: Response) => {
    const id = req.query.id;
    const result: OkPacket = <OkPacket> await query("DELETE FROM TICKET_PAYMENT_CARD WHERE id = ?", [id]);
    if(result.affectedRows > 0){
        return res.status(200).json({
            message: "Ticket Payment Card deleted"
        });
    }
    return res.status(500).json({
        message: 'Internal Server Error',
        error: 'Ticket Payment Card not deleted'
    });
}

export default { getTicketPaymentsCard, getTicketPaymentCard, searchTicketPaymentCard, addTicketPaymentCard, deleteTicketPaymentCard };