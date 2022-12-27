import {Request, Response} from "express";
import {query} from "../../database";
import Job from "../interfaces/Job";

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
const searchJob = (req: Request, res: Response) => {
    //search by position or salary
    const position = req.query.position;
    const salary = req.query.salary;
    if (!position && !salary) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    query('SELECT * FROM JOB WHERE position = ? OR salary =?', [position, salary])
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
    query_string += 'WHERE id = ?';
    query_params.push(id);
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
const addJob = (req: Request, res: Response) => {
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
    query('INSERT INTO JOB (position, salary) VALUES (?, ?)', [position, salary])
        .then((result: any) => {
            res.status(201).json({
                message: 'Job created',
                id: result.insertId
            });
        });
}
const deleteJob = (req: Request, res: Response) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({
            message: 'Bad request'
        });
    }
    query('DELETE FROM JOB WHERE id = ?', [id])
        .then((result: any) => {
            if (result.affectedRows > 0) {
                res.status(200).json({
                    message: 'Job deleted'
                })
            }
            })
        .catch((err: any) => {
            return res.status(500).json({
                message: 'Server error',
                error: err
            });
        });
}

export default {getJobs, getJob, searchJob, updateJob, addJob, deleteJob};
