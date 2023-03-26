/**
 * @openapi
 *
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *       - id
 *       - first_name
 *       - last_name
 *       - job_id
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the employee
 *           readOnly: true
 *         first_name:
 *           type: string
 *           description: First name of the employee
 *         last_name:
 *           type: string
 *           description: Last name of the employee
 *         phone:
 *           type: string
 *           format: phone
 *           description: Phone number of the employee
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the employee
 *         job_id:
 *           type: integer
 *           description: ID of the job
 *         crew_id:
 *           type: integer
 *           description: ID of the flight crew
 *
 */
interface Employee {
    id?: number;
    first_name: string;
    last_name: string;
    phone?: string;
    email?: string;
    job_id: number;
    crew_id?: number;
}
export = Employee;