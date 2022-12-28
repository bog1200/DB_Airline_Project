import {Request, Response} from "express";
import {query} from "../../database";
import Job from "../interfaces/Job";

/**
 * @openapi
 * paths:
 *     /jobs/all:
 *         get:
 *             summary: Get all jobs
 *             tags:
 *                 - jobs
 *             responses:
 *                 '200':
 *                     description: A job object
 *                     content:
 *                         application/json:
 *                             schema:
 *                                 $ref: '#/components/schemas/Job'
 *                 '404':
 *                     description: No jobs found
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
const getJobs =  (req: Request, res: Response) => {
    query('SELECT * FROM JOB')
        .then((result: any) => res.status(200).json(result as Job[]))
        .catch((err: any) => {
            return res.status(500).json({
                message: 'Server error',
                error: err
            });
        });
}

/**
 * @openapi
 * paths:
 *     /jobs:
 *         get:
 *             summary: Get a job by id
 *             tags:
 *                 - jobs
 *             parameters:
 *             - in: query
 *               name: id
 *               required: true
 *               schema:
 *                 type: integer
 *                 description: The id of the job
 *             responses:
 *                 '200':
 *                     description: A job object
 *                     content:
 *                         application/json:
 *                           schema:
 *                             $ref: '#/components/schemas/Job'
 *                 '404':
 *                     description: No job found
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
const getJob = (req: Request, res: Response) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    query('SELECT * FROM JOB WHERE id = ?', [id])
        .then((result: any) => {
            if (result.length == 0) {
                res.status(404).json({
                    message: 'Job not found'
                });
            } else {
                res.status(200).json(result as Job[]);
            }
        });
}
/**
 * @openapi
 *
 * paths:
 *   /jobs/search:
 *     get:
 *       summary: Search for jobs
 *       tags:
 *         - jobs
 *       parameters:
 *         - name: position
 *           in: query
 *           description: Name of the job position
 *           schema:
 *             type: string
 *         - name: salary_min
 *           in: query
 *           description: Minimum salary
 *           schema:
 *             type: number
 *             minimum: 0
 *         - name: salary_max
 *           in: query
 *           description: Maximum salary
 *           schema:
 *             type: number
 *             minimum: 0
 *       responses:
 *         200:
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Job found
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Job'
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
 *         404:
 *           description: Job not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Job not found
 */
const searchJob = async (req: Request, res: Response) => {
    //search by position or salary
    const position = req.query.position;
    const salary_min = req.query.salary_min;
    const salary_max = req.query.salary_max;
    if (!position && !salary_min && !salary_max) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    let sql = 'SELECT * FROM JOB WHERE ';
    let params = [];
    if (position) {
        sql += 'position = ?';
        params.push(position);
    }
    if (salary_min) {
        if (params.length > 0) {
            sql += ' AND ';
        }
        sql += 'salary >= ?';
        params.push(salary_min);
    }
    if (salary_max) {
        if (params.length > 0) {
            sql += ' AND ';
        }
        sql += 'salary <= ?';
        params.push(salary_max);
    }
    const queryResult: any = await query(sql, params);
    if (queryResult.length == 0) {
        return res.status(404).json({
            message: 'Job not found'
        });
    }
    return res.status(200).json({
        message: 'Job found',
        data: queryResult as Job[]
    });
}

/**
 * @openapi
 * paths:
 *   /jobs:
 *     put:
 *       summary: Update a job
 *       tags:
 *         - jobs
 *       parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           description: The job id
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *
 *       responses:
 *         '201':
 *           description: Job updated
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Job'
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
 *         '409':
 *           description: Job already exists
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */
const updateJob = async (req: Request, res: Response) => {
    const id = req.query.id;
    const position = req.body.position;
    const salary = req.body.salary;
    if (!position && !salary) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    //noinspection SqlWithoutWhere
    let query_string = 'UPDATE JOB SET ';
    let query_params: any[] = [];
    let result: any = await query('SELECT * FROM JOB WHERE id = ?', [id]);
    if (result.length == 0) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    if(position){
         result = await query('SELECT * FROM JOB WHERE position = ?', [position]);
        if(result.length > 0){
            return res.status(400).json({
                message: 'Bad request',
                error: 'Position already exists'
            });
        }
        query_string += 'position = ?, ';
        query_params.push(position);
    }
    if(salary){
        if(salary > 0 && salary < 10000){

            query_string += 'salary = ?';
            query_params.push(salary);
        }
    }
    query_string += ' WHERE id = ?';
    query_params.push(id);
    const checkDuplicate: any = query('SELECT * FROM JOB WHERE position = ?', [position]);
    if (checkDuplicate.length > 0) {
        return res.status(400).json({
            message: 'Bad request',
            error: 'Position already exists'
        });
    }
    result = await query(query_string, query_params);
    if(result.affectedRows > 0) {
        return res.status(201).json({
            message: 'Job updated',
            data: {
                id: id,
                position: position,
                salary: salary
            }
        });
    }
}

/**
 * @openapi
 * paths:
 *   /jobs:
 *     post:
 *       summary: Create a new job
 *       tags:
 *         - jobs
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *
 *       responses:
 *         '201':
 *           description: Job created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Job'
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
const addJob = async (req: Request, res: Response) => {
    const position = req.body.position;
    const salary = req.body.salary;
    if (!position || !salary) {
        return res.status(400).json({
            message: 'Job position and salary are required'
        });
    }
    if(salary < 0 || salary > 10000){
     return res.status(400).json({
        message: 'Bad request',
        error: 'Invalid salary'
        });
     }

    const checkDuplicate: any = await query('SELECT * FROM JOB WHERE position = ?', [position]);
    if (checkDuplicate.length > 0) {
        return res.status(400).json({
            message: 'Bad request',
            error: 'Position already exists'
        });
    }
    query('INSERT INTO JOB (position, salary) VALUES (?, ?)', [position, salary])
        .then((result: any) => {
            res.status(201).json({
                message: 'Job created',
                data: {
                    id: result.insertId,
                    ...req.body
                }
            });
        });
}

/**
 * @openapi
 * paths:
 *     /jobs:
 *         delete:
 *             summary: Delete a job by id
 *             tags:
 *                 - jobs
 *             parameters:
 *                 - in: query
 *                   name: id
 *                   required: true
 *                   schema:
 *                     type: integer
 *                     description: The id of the job to delete
 *             responses:
 *                 '200':
 *                     description: Job deleted
 *                     content:
 *                       application/json:
 *                         schema:
 *                           $ref: '#/components/schemas/Error'
 *                 '404':
 *                     description: Job not found
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
const deleteJob = (req: Request, res: Response) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
   let result: any = query('DELETE  FROM JOB WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
        return res.status(200).json({
            message: 'Job deleted'
        });
    }
    return res.status(404).json({
        message: 'Job not found'
    });
}

export default {getJobs, getJob, searchJob, updateJob, addJob, deleteJob};
