import {Request, Response} from "express";
import {query} from "../../database";
import TicketPaymentMethod from "../interfaces/TicketPaymentMethod";

const getTicketPaymentMethods = async (req: Request, res: Response) => {
    const result : any = await query('SELECT * FROM TICKET_PAYMENT_METHOD');
    if(result.length > 0) {
        return res.status(200).json({
            message: 'Ticket Payment Methods found',
            data: result as TicketPaymentMethod[]
        });
    }
    return res.status(500).json({
        message: 'Server error'
    });
}
const getTicketPaymentMethod = (req: Request, res: Response) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    query('SELECT * FROM TICKET_PAYMENT_METHOD WHERE id = ?', [id])
        .then((result: any) => {
            if (result.length == 0) {
                res.status(400).json({
                    message: "Bad request",
                    error: "Ticket Payment Method not found"
                });
            } else {
                res.status(200).json(result as TicketPaymentMethod[]);
            }
        });
}
const searchTicketPaymentMethods = (req: Request, res: Response) => {
    //search by method
    const method = req.query.method;
    if (!method) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    query('SELECT * FROM TICKET_PAYMENT_METHOD WHERE method = ?', [method])
        .then((result: any) => {
            if (result.length == 0) {
                res.status(404).json({
                    message: 'Ticket Payment Method not found'
                });
            } else {
                res.status(200).json(result as TicketPaymentMethod[]);
            }
        });
}
const updateTicketPaymentMethod = async (req: Request, res: Response) => {
    const id = req.query.id;
    const method = req.body.method;
    if (!method) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
   //check if ticket payment method exists
    const ticketPaymentMethod : any = await query('SELECT * FROM TICKET_PAYMENT_METHOD WHERE id = ?', [id]);
    if (ticketPaymentMethod.length == 0) {
      return res.status(400).json({
        message: "Bad request",
        error: "Ticket Payment Method not found"
  });

    }
    //check if the method is duplicated
    const duplicatedTicketPaymentMethod : any =  await query('SELECT * FROM TICKET_PAYMENT_METHOD WHERE method = ?', [method]);
    if (duplicatedTicketPaymentMethod.length > 0) {
        return res.status(409).json({
            message: 'Ticket Payment Method already exists'
        });
    }
    const result : any = await query('UPDATE TICKET_PAYMENT_METHOD SET method = ? WHERE id = ?', [method, id]);
    if(result.affectedRows > 0) {
        return res.status(200).json({
            message: 'Ticket Payment Method updated',
            data: {
                id: id,
                method: method
            }
        });
    }
    return res.status(500).json({
        message: 'Server error'
    });
}
const addTicketPaymentMethod = async (req: Request, res: Response) => {
    const method = req.body.method;
    if (!method) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    const duplicatedTicketPaymentMethod : any = await query('SELECT * FROM TICKET_PAYMENT_METHOD WHERE method = ?', [method]);
    if (duplicatedTicketPaymentMethod.length > 0) {
        return res.status(409).json({
            message: 'Bad request'
            error:"Ticket Payment Method already exists"
        });
    }
    const result : any = await query('INSERT INTO TICKET_PAYMENT_METHOD (method) VALUES (?)', [method]);
    if(result.affectedRows > 0) {
        return res.status(200).json({
            message: 'Ticket Payment Method added',
            data: {
                id: result.insertId,
                method: method
            }
        });
    }
    return res.status(500).json({
        message: 'Server error'
    });
}
const deleteTicketPaymentMethod = async (req: Request, res: Response) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    const ticketPaymentMethod : any = await query('SELECT * FROM TICKET_PAYMENT_METHOD WHERE id = ?', [id]);
    if (ticketPaymentMethod.length == 0) {
        return res.status(404).json({
            message: 'Ticket Payment Method not found'
        });
    }
    const result : any = await query('DELETE FROM TICKET_PAYMENT_METHOD WHERE id = ?', [id]);
    if(result.affectedRows > 0) {
        return res.status(200).json({
            message: 'Ticket Payment Method deleted',
            data: {
                id: id
            }
        });
    }
    return res.status(500).json({
        message: 'Server error'
    });
}

export default {getTicketPaymentMethods, getTicketPaymentMethod, searchTicketPaymentMethods, updateTicketPaymentMethod, addTicketPaymentMethod, deleteTicketPaymentMethod};
