import {Request, Response} from "express";
import {query, OkPacket, RowDataPacket} from "../../database";
import FlightCrew from "../interfaces/FlightCrew";
import Employee from "../interfaces/Employee";

/**
 * @openapi
 * paths:
 *     /flight/crews:
 *         get:
 *             summary: Get a flight crew by id
 *             tags:
 *                 - flights
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: integer
 *                     description: The id of the flight crew
 *             responses:
 *                 '200':
 *                     description: A flight crew object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/FlightCrew'
 *                 '404':
 *                     description: No flight crew found
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
const getFlightCrew = async (req: Request, res: Response) => {
    const id = req.query.id;
    if(!id) {
        return res.status(400).send({message: "Bad request"});
    }
    const result: RowDataPacket[] = <RowDataPacket[]> await query("SELECT * FROM FLIGHT_CREW WHERE id = ?", [id]);
    if (result.length > 0) {
        return res.status(200).send({
            message: "Flight crew found",
            data: result[0] as FlightCrew
        });
    }
    return res.status(404).send({
        message: "Flight crew not found",
        data: {}
    });
}

/**
 * @openapi
 * paths:
 *     /flight/crews/search:
 *         get:
 *             summary: Get a flight crew by flight id
 *             tags:
 *                 - flights
 *             parameters:
 *                 - in: query
 *                   name: flight_id
 *                   required: true
 *                   schema:
 *                     type: integer
 *                     required: true
 *                     description: The id of the flight
 *             responses:
 *                 '200':
 *                     description: A flight crew object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/FlightCrew'
 *                 '404':
 *                     description: No flight crew found
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
const searchFlightCrew = async (req: Request, res: Response) => {
    const flight_id = req.query.flight_id;
    if(!flight_id) {
        return res.status(400).send({message: "Bad request"});
    }
    const result: RowDataPacket[] = <RowDataPacket[]> await query("SELECT * FROM FLIGHT_CREW WHERE flight_id = ?", [flight_id]);
    if (result.length > 0) {
        return res.status(200).send({
            message: "Flight crew found",
            data: result as FlightCrew[]
        });
    }
    return res.status(404).send({
        message: "Flight crew not found",
        data: {}
    });
}

/**
 * @openapi
 * paths:
 *     /flight/crews/getMembers:
 *         get:
 *             summary: Get a flight crew members by crew id or flight id (if both are provided, crew id is used)
 *             tags:
 *                 - flights
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   schema:
 *                     type: integer
 *                     description: The id of the flight crew
 *                 - in: query
 *                   name: flight_id
 *                   schema:
 *                     type: integer
 *                     description: The id of the flight
 *             responses:
 *                 '200':
 *                     description: An Employee object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Employee'
 *                 '400':
 *                     description: Bad request
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Error'
 *                 '404':
 *                     description: No flight crew found
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
const getFlightCrewMembers = async (req: Request, res: Response) => {
    const flight_id = req.query.flight_id;
    const id = req.query.id;
    if(!flight_id && !id) {
        return res.status(400).send({message: "Bad request"});
    }
    let checkCrew: RowDataPacket[] = <RowDataPacket[]> await query("SELECT * FROM FLIGHT_CREW WHERE id = ? OR flight_id = ?", [id||null, flight_id||null]);
    if (checkCrew.length == 0) {
        return res.status(400).send({
            message: "Bad request",
            error: "Flight crew does not exist"
        });
    }

    let result: RowDataPacket[];
    if(id) {
        result = <RowDataPacket[]> await query("SELECT * FROM EMPLOYEE WHERE crew_id = ?", [id]);
    }
    else {
        result = <RowDataPacket[]> await query("SELECT * FROM EMPLOYEE WHERE crew_id = (SELECT id FROM FLIGHT_CREW WHERE flight_id = ?)", [flight_id]);
    }
    if (result.length > 0) {
        return res.status(200).send({
            message: "Flight crew found",
            data: result as Employee[]
        });
    }
    return res.status(404).send({
        message: "Flight crew not found",
        data: {}
    });
}
/**
 * @openapi
 * paths:
 *     /flight/crews/getNoCrew:
 *         get:
 *             summary: Get all employees that are not in a flight crew
 *             tags:
 *                 - flights
 *             responses:
 *                 '200':
 *                     description: An Employee object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Employee'
 *                 '400':
 *                     description: Bad request
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Error'
 *                 '404':
 *                     description: No flight crew found
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
const getFlightNoCrewMembers = async (req: Request, res: Response) => {
    const result: RowDataPacket[] = <RowDataPacket[]> await query("SELECT * FROM EMPLOYEE WHERE crew_id IS NULL");
    if (result.length > 0) {
        return res.status(200).send({
            message: "Employees found",
            data: result as Employee[]
        });
    }
    return res.status(404).send({
        message: "No employees found",
        data: {}
    });
}

/**
 * @openapi
 * paths:
 *   /flight/crews:
 *     post:
 *       summary: Create a flight crew
 *       tags:
 *         - flights
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FlightCrew'
 *       responses:
 *         201:
 *           description: Flight crew created
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: flight crew created
 *                   data:
 *                     $ref: '#/components/schemas/FlightCrew'
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Bad request
 */
const createFlightCrew = async (req: Request, res: Response) => {
    const flight_id = req.body.flight_id;
    if(!flight_id ) {
        return res.status(400).send({message: "Bad request"});
    }

    const checkFlight: RowDataPacket[] = <RowDataPacket[]> await query("SELECT id FROM FLIGHT WHERE id = ?", [flight_id]);
    if (checkFlight.length === 0) {
        return res.status(400).send({
            message: "Bad request",
            error: "Flight not found"
        });
    }
    const duplicateCheck: RowDataPacket[] = <RowDataPacket[]> await query("SELECT id FROM FLIGHT_CREW WHERE flight_id = ?", [flight_id]);
    if (duplicateCheck.length > 0) {
        return res.status(400).send({
            message: "Bad request",
            error: "Flight crew already exists"
        });
    }
    const result: OkPacket = <OkPacket> await query("INSERT INTO FLIGHT_CREW(flight_id) VALUES(?)", [flight_id]);
    if (result.affectedRows > 0) {
        return res.status(200).send({
            message: "Flight crew created",
            data: {id: result.insertId, flight_id: flight_id}
        });
    }
    return res.status(500).send({
        message: "Flight crew not created",
        data: {}
    });
}

/**
 * @openapi
 * paths:
 *   /flight/crews:
 *     put:
 *       summary: Update a flight crew
 *       tags:
 *         - flights
 *       parameters:
 *         - in: query
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *             description: The id of the flight crew
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FlightCrew'
 *       responses:
 *         201:
 *           description: Flight crew updated
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: flight crew updated
 *                   data:
 *                     $ref: '#/components/schemas/FlightCrew'
 *         400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Bad request
 */
const updateFlightCrew = async (req: Request, res: Response) => {
    const id = req.query.id;
    const flight_id = req.body.flight_id;
    if(!flight_id) {
        return res.status(400).send({message: "Bad request"});
    }
    const checkCrew: RowDataPacket[] = <RowDataPacket[]> await query("SELECT id FROM FLIGHT_CREW WHERE id = ?", [id]);
    if (checkCrew.length == 0) {
        return res.status(400).send({
            message: "Bad request",
            error: "Invalid crew"
        });
    }
    const checkFlight: RowDataPacket[] = <RowDataPacket[]> await query("SELECT * FROM FLIGHT WHERE id = ?", [flight_id]);
    if (checkFlight.length === 0) {
        return res.status(400).send({
            message: "Bad request",
            error: "Flight not found"
        });
    }
    const duplicateCheck: RowDataPacket[] = <RowDataPacket[]> await query("SELECT id FROM FLIGHT_CREW WHERE flight_id = ?", [flight_id]);
    if (duplicateCheck.length > 0) {
        return res.status(400).send({
            message: "Bad request",
            error: "Flight crew already exists"
        });
    }
    const result: OkPacket = <OkPacket> await query("UPDATE FLIGHT_CREW SET flight_id = ? WHERE id = ?", [flight_id, req.query.id]);
    if (result.affectedRows > 0) {
        return res.status(200).send({
            message: "Flight crew updated",
            data: {id: req.body.id, flight_id: flight_id}
        });
    }
    return res.status(500).send({
        message: "Flight crew not updated",
        data: {}
    });
}

/**
 * @openapi
 * paths:
 *     /flight/crews:
 *         delete:
 *             summary: Delete a flight crew by id
 *             tags:
 *                 - flights
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: integer
 *                     description: The id of the flight crew to delete
 *             responses:
 *                 '200':
 *                     description: Flight crew deleted
 *                     content:
 *                       application/json:
 *                         schema:
 *                           $ref: '#/components/schemas/Error'
 *                 '404':
 *                     description: No flight crew found
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
const deleteFlightCrew = async (req: Request, res: Response) => {
    const id = req.query.id;
    if(!id) {
        return res.status(400).send({message: "Bad request"});
    }
    const updateEmployee: OkPacket = <OkPacket> await query("UPDATE EMPLOYEE SET crew_id = NULL WHERE crew_id = ?", [id]);
    if (updateEmployee.warningCount > 0) {
        return res.status(500).send({
            message: "Flight crew not deleted",
            data: {}
        });
    }
    const result: OkPacket = <OkPacket> await query("DELETE FROM FLIGHT_CREW WHERE id = ?", [id]);
    if (result.affectedRows > 0) {
        return res.status(200).send({
            message: "Flight crew deleted"
        });
    }
    return res.status(500).send({
        message: "Server error",
        error: "Flight crew not deleted"
    });
}

export default {getFlightCrew, searchFlightCrew, getFlightNoCrewMembers, getFlightCrewMembers, createFlightCrew, updateFlightCrew, deleteFlightCrew};