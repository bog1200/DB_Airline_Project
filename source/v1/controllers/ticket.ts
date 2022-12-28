import {Request, Response} from "express";
import {query} from "../../database";
import Ticket from "../interfaces/Ticket";

/**
 * @openapi
 * paths:
 *     /tickets:
 *         get:
 *             summary: Get a ticket by id
 *             tags:
 *                 - tickets
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: integer
 *                     description: The id of the ticket
 *             responses:
 *                 '200':
 *                     description: A ticket object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Ticket'
 *                 '404':
 *                     description: No ticket found
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
const getTicket = async (req: Request, res: Response) => {
    const {id} = req.query;
    const result: any = await query(`SELECT * FROM TICKET WHERE id = ?`, [id]);
    if (result.length > 0) {
        return res.status(200).json({
            message: "Ticket found",
            data: result[0] as Ticket
        });
    }
    return res.status(404).json({
        message: "Ticket not found",
        data: {}
    });
};

/**
 * @openapi
 * paths:
 *     /tickets/search:
 *         get:
 *             summary: Search for tickets
 *             tags:
 *                 - tickets
 *             parameters:
 *             - in: query
 *               name: code
 *               schema:
 *                 type: string
 *                 description: The code of the ticket
 *             - in: query
 *               name: account_id
 *               schema:
 *                 type: string
 *                 format: uuid
 *                 description: The id of the account that owns the ticket
 *             - in: query
 *               name: passenger_id
 *               schema:
 *                 type: integer
 *                 description: The id of the passenger on the ticket
 *             - in: query
 *               name: flight_id
 *               schema:
 *                 type: integer
 *                 description: The id of the flight the ticket is for
 *             responses:
 *                 '200':
 *                     description: A ticket object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Ticket'
 *                 '404':
 *                     description: No ticket found
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
const searchTickets = async (req: Request, res: Response) => {
    const code = req.query.code;
    const account_id = req.query.account_id;
    const flight_id = req.query.flight_id;
    const passenger_id = req.query.passenger_id;

    if (!code && !account_id && !flight_id && !passenger_id) {
        return res.status(400).json({
            message: "Bad request",
        });
    }
    let sql= `SELECT * FROM TICKET WHERE `;
    let params: any[] = [];
    if (code) {
        sql += `code = ?`;
        params.push(code);
    }
    if (account_id) {
        if (params.length > 0) {
            sql += ` AND `;
        }
        sql += `account_id = ?`;
        params.push(account_id);
    }
    if (flight_id) {
        if (params.length > 0) {
            sql += ` AND `;
        }
        sql += `flight_id = ?`;
        params.push(flight_id);
    }
    if (passenger_id) {
        if (params.length > 0) {
            sql += ` AND `;
        }
        sql += `passenger_id = ?`;
        params.push(passenger_id);
    }
    const result: any = await query(sql, params);
    if (result.length > 0) {
        return res.status(200).json({
            message: "Tickets found",
            data: result as Ticket[]
        });

    }
    return res.status(404).json({
        message: "Tickets not found",
        data: {}
    });
};
/**
 * @openapi
 * paths:
 *   /tickets:
 *     post:
 *       summary: Create a new ticket
 *       tags:
 *         - tickets
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *
 *       responses:
 *         '201':
 *           description: Ticket created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Ticket'
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
const addTicket = async (req: Request, res: Response) => {
    const ticket: Ticket = req.body as Ticket;
    if(!ticket.code || !ticket.account_id || !ticket.flight_id || !ticket.passenger_id) {
        return res.status(400).json({
            message: "Bad request",
        });
    }
    const accountCheck: any = await query(`SELECT * FROM ACCOUNT WHERE uuid = ?`, [ticket.account_id]);
    if (accountCheck.length === 0) {
        return res.status(400).json({
            message: "Bad request",
            error: "Account not found"
        });
    }
    const flightCheck: any = await query(`SELECT * FROM FLIGHT WHERE id = ?`, [ticket.flight_id]);
    if (flightCheck.length === 0) {
        return res.status(400).json({
            message: "Bad request",
            error: "Flight not found"
        });
    }
    const passengerCheck: any = await query(`SELECT * FROM PASSENGER WHERE id = ?`, [ticket.passenger_id]);
    if (passengerCheck.length === 0) {
        return res.status(400).json({
            message: "Bad request",
            error: "Passenger not found"
        });
    }
    const passengerFlightCheck: any = await query(`SELECT * FROM PASSENGER WHERE id = ? AND flight_id = ?`, [ticket.passenger_id, ticket.flight_id]);
    if (passengerFlightCheck.length === 0) {
        return res.status(400).json({
            message: "Bad request",
            error: "Passenger not on flight"
        });
    }
    const checkTicketCode: any = await query(`SELECT * FROM TICKET WHERE code = ?`, [ticket.code]);
    if (checkTicketCode.length > 0) {
        return res.status(400).json({
            message: "Bad request",
            error: "Ticket code already exists"
        });
    }
    const checkDuplicate: any = await query(`SELECT * FROM TICKET WHERE account_id = ? AND flight_id = ? AND passenger_id = ?`, [ticket.account_id, ticket.flight_id, ticket.passenger_id]);
    if (checkDuplicate.length > 0) {
        return res.status(400).json({
            message: "Bad request",
            error: "Ticket already exists for this account, flight and passenger"
        });
    }
    const result: any = await query(`INSERT INTO TICKET (code, account_id, flight_id, passenger_id) VALUES (?, ?, ?, ?)`, [ticket.code, ticket.account_id, ticket.flight_id, ticket.passenger_id]);
    if (result.affectedRows > 0) {
        return res.status(201).json({
            message: "Ticket created",
            data: {
                id: result.insertId,
                ...ticket
            }
        });
    }
    return res.status(500).json({
        message: "Internal server error",
        error: "Ticket not created"
    });
}

/**
 * @openapi
 * paths:
 *     /tickets:
 *         delete:
 *             summary: Delete a ticket by id
 *             tags:
 *                 - tickets
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: integer
 *                     description: The id of the ticket to delete
 *             responses:
 *                 '200':
 *                     description: Ticket deleted
 *                     content:
 *                       application/json:
 *                         schema:
 *                           $ref: '#/components/schemas/Error'
 *                 '404':
 *                     description: No ticket found
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
const deleteTicket = async (req: Request, res: Response) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({
            message: "Bad request",
        });
    }
    const result: any = await query(`DELETE FROM TICKET WHERE id = ?`, [id]);
    if (result.affectedRows > 0) {
        return res.status(200).json({
            message: "Ticket deleted"
        });
    }
    return res.status(404).json({
        message: "Ticket not found"
    });
}
export default {getTicket, searchTickets, addTicket, deleteTicket};