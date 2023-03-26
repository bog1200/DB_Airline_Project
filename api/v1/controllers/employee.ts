import {Request, Response} from "express";
import {query, RowDataPacket, OkPacket} from "../../database";
import Employee from "../interfaces/Employee";

/**
 * @openapi
 * paths:
 *     /employees/all:
 *         get:
 *             summary: Get a list of all account employees
 *             tags:
 *                 - employees
 *             responses:
 *                 '200':
 *                     description: An employee object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Employee'
 *
 *                 '500':
 *                     description: Server error
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Error'
 */
const getEmployees = async (req: Request, res: Response) => {
    const result: RowDataPacket[] = <RowDataPacket[]>await query("SELECT * FROM EMPLOYEE");
    if (result.length > 0) {
        return res.status(200).json({
            message: "Employees found",
            data: result as Employee[]
        });
    }
    return res.status(500).json({
        message: "Server error"
    });
}

/**
 * @openapi
 * paths:
 *     /employees:
 *         get:
 *             summary: Get an employee by id
 *             tags:
 *                 - employees
 *             parameters:
 *              - in: query
 *                name: id
 *                required: true
 *                schema:
 *                  type: integer
 *                  description: The id of the employee
 *             responses:
 *                 '200':
 *                     description: An employee object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Employee'
 *
 *                 '500':
 *                     description: Server error
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Error'
 */
const getEmployee = async (req: Request, res: Response) => {
    const id = req.query.id;
    const result: RowDataPacket[] = <RowDataPacket[]>await query("SELECT * FROM EMPLOYEE WHERE ID = ?", [id]);
    if (result.length > 0) {
        return res.status(200).json({
            message: "Employee found",
            data: result as Employee[]
        });
    }
    return res.status(404).json({
        message: "Employee not found",
        data: {}
    });
}
/**
 * @openapi
 * paths:
 *     /employees/search:
 *         get:
 *             summary: Search an employee
 *             tags:
 *                 - employees
 *             parameters:
 *              - in: query
 *                name: first_name
 *                schema:
 *                  type: integer
 *                  description: The first name of the employee
 *              - in: query
 *                name: last_name
 *                schema:
 *                  type: integer
 *                  description: The last_name of the employee
 *              - in: query
 *                name: email
 *                schema:
 *                  type: integer
 *                  description: The email of the employee
 *              - in: query
 *                name: phone
 *                schema:
 *                  type: integer
 *                  description: The phone of the employee
 *              - in: query
 *                name: job_id
 *                schema:
 *                  type: integer
 *                  description: The job_id of the employee
 *             responses:
 *                 '200':
 *                     description: An employee object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Employee'
 *
 *                 '500':
 *                     description: Server error
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Error'
 */
const searchEmployee = async (req: Request, res: Response) => {
        //search by first name, last name or email or phone or job_id
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;
    const email = req.query.email;
    const phone = req.query.phone;
    const job_id = req.query.job_id;
    if(!first_name && !last_name && !email && !phone && !job_id){
        return res.status(400).json({
            message: "Bad request"
        });
    }
    let sql = 'SELECT * FROM EMPLOYEE WHERE ';
    let params: any = [];
    if(first_name){
        sql += ' FIRST_NAME = ? ';
        params.push(first_name);
    }
    if(last_name){
        if(params.length > 0){
            sql += ' AND ';
        }
        sql += ' LAST_NAME = ? ';
        params.push(last_name);
    }
    if(email){
        if(params.length > 0){
            sql += ' AND ';
        }
        sql += ' EMAIL = ? ';
        params.push(email);
    }
    if(phone){
        if(params.length > 0){
            sql += ' AND ';
        }
        sql += ' PHONE = ? ';
        params.push(phone);
    }
    if(job_id){
        if(params.length > 0){
            sql += ' AND ';
        }
        sql += ' JOB_ID = ? ';
        params.push(job_id);
    }
    const result: RowDataPacket[] = <RowDataPacket[]>await query(sql, params);
    if (result.length > 0) {
        return res.status(200).json({
            message: "Employee found",
            data: result as Employee[]
        });
    }
    return res.status(404).json({
        message: "Employee not found",
        data: {}
    });
}

/**
 * @openapi
 * paths:
 *   /employees:
 *     post:
 *       summary: Create an employee
 *       tags:
 *         - employees
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       responses:
 *         201:
 *           description: Employee created
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Employee created
 *                   data:
 *                     $ref: '#/components/schemas/Employee'
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
const addEmployee = async (req: Request, res: Response) => {
    const employee: Employee = req.body;
    if(!employee.first_name || !employee.last_name ||!employee.job_id ||!employee.crew_id) {
        return res.status(400).json({
            message: "Bad request",
            data: {}
        });
    }
    const phone = req.body.phone || null;
    const email = req.body.email || null;
    const JobCheck: RowDataPacket[] = <RowDataPacket[]>await query("SELECT * FROM JOB WHERE id = ?", [employee.job_id]);
    if (JobCheck.length === 0) {
        return res.status(400).json({
            message: "Bad request",
            error: 'Job does not exist'
        });
    }
    const FlightCrewCheck: RowDataPacket[] = <RowDataPacket[]>await query("SELECT * FROM FLIGHT_CREW WHERE id = ?", [employee.crew_id]);
    if (FlightCrewCheck.length === 0) {
        return res.status(400).json({
            message: "Bad request",
            error: 'Flight Crew does not exist'
        });
    }
    const duplicateCheck: RowDataPacket[] = <RowDataPacket[]>await query("SELECT * FROM EMPLOYEE WHERE first_name = ? AND last_name = ? AND email = ? AND phone = ? AND job_id = ?", [employee.first_name, employee.last_name, employee.email, employee.phone, employee.job_id]);
    if (duplicateCheck.length > 0) {
        return res.status(400).json({
            message: "Bad request",
            error: 'Employee already exists'
        });
    }
    const result: OkPacket = <OkPacket>await query("INSERT INTO EMPLOYEE (first_name, last_name, email, phone, job_id, crew_id) VALUES (?, ?, ?, ?, ?, ?)", [employee.first_name, employee.last_name, email, phone, employee.job_id, employee.crew_id]);
    if (result.affectedRows > 0) {
        return res.status(201).json({
            message: "Employee added",
            data:{
                id: result.insertId,
                ...employee
            }
        });
    }
    return res.status(500).json({
        message: "Internal server error",
        error: 'Employee not added'
    });
}
/**
 * @openapi
 * paths:
 *   /employees:
 *     put:
 *       summary: Update an employee
 *       tags:
 *         - employees
 *       parameters:
 *              - in: query
 *                name: id
 *                required: true
 *                schema:
 *                  type: integer
 *                  description: The id of the employee
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       responses:
 *         201:
 *           description: Employee updated
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Employee updated
 *                   data:
 *                     $ref: '#/components/schemas/Employee'
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
const updateEmployee = async (req: Request, res: Response) => {
    const id = req.query.id;
    const employee: Employee = req.body;
    if(!employee.first_name && !employee.last_name && !employee.email && !employee.phone && !employee.job_id ) {
        return res.status(400).json({
            message: "Bad request",
            data: {}
        });
    }
    const EmployeeCheck: RowDataPacket[] = <RowDataPacket[]>await query("SELECT * FROM EMPLOYEE WHERE id = ?", [id]);
    if (EmployeeCheck.length === 0) {
        return res.status(400).json({
            message: "Bad request",
            error: 'Employee does not exist'
        });
    }
    let sql = 'UPDATE EMPLOYEE SET ';
    let params = [];
    if (employee.first_name) {
        sql += "first_name = ?, ";
        params.push(employee.first_name);
    }
    if (employee.last_name) {
        sql += "last_name = ?, ";
        params.push(employee.last_name);
    }
    if (employee.email) {
        sql += "email = ?, ";
        params.push(employee.email);
    }
    if (employee.phone) {
        sql += "phone = ?, ";
        params.push(employee.phone);
    }
    if (employee.job_id) {
        //check if job exists
        const JobCheck: RowDataPacket[] = <RowDataPacket[]>await query("SELECT * FROM JOB WHERE id = ?", [employee.job_id]);
        if (JobCheck.length === 0) {
            return res.status(400).json({
                message: "Bad request",
                error: 'Job does not exist'
            });
        }
        sql += "job_id = ?, ";
        params.push(employee.job_id);
    }
    if(employee.crew_id){
        const FlightCrewCheck: RowDataPacket[] = <RowDataPacket[]>await query("SELECT * FROM FLIGHT_CREW WHERE id = ?", [employee.crew_id]);
        if (FlightCrewCheck.length === 0) {
            return res.status(400).json({
                message: "Bad request",
                error: 'Flight Crew does not exist'
            });
        }
        sql+="crew_id = ?,  ";
        params.push(employee.crew_id);
    }
    sql = sql.slice(0, -2);
    sql += " WHERE id = ?";
    params.push(id);
    const result: OkPacket = <OkPacket>await query(sql, params);
    if (result.affectedRows > 0) {
        return res.status(200).json({
            message: "Employee updated",
        });
    }
    return res.status(500).json({
        message: "Internal server error",
        error: 'Employee not updated'
    });
}

/**
 * @openapi
 * paths:
 *     /employees:
 *         delete:
 *             summary: Delete an employee by id
 *             tags:
 *               - employees
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: number
 *                     description: The id of the employee
 *             responses:
 *                 '200':
 *                     description: Employee deleted
 *                     content:
 *                       application/json:
 *                         schema:
 *                           $ref: '#/components/schemas/Error'
 *                 '404':
 *                     description: No country found
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
const deleteEmployee = async (req: Request, res: Response) => {
    const id = req.query.id;
    const result: OkPacket = <OkPacket>await query("DELETE FROM EMPLOYEE WHERE id = ?", [id]);
    if (result.affectedRows > 0) {
        return res.status(200).json({
            message: "Employee deleted",
            data: {
                id: id
            }
        });
    }
    return res.status(500).json({
        message: "Internal server error",
        error: 'Employee not deleted'
    });
}

export default {getEmployees, getEmployee, searchEmployee, addEmployee, updateEmployee, deleteEmployee};