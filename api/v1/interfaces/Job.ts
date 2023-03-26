/**
 * @openapi
 *
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *       - id
 *       - position
 *       - salary
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the job
 *           readOnly: true
 *           example: 1
 *           default: ""
 *         position:
 *           type: string
 *           default: ""
 *           example: "CEO"
 *           description: Name of the job position
 *         salary:
 *           type: integer
 *           format: double
 *           description: Salary of the job
 *           default: ""
 *           example: "1000"
 *           minimum: 0
 *           exclusiveMinimum: true
 *
 */
interface Job {
    id?: number;
    position: string;
    salary: number;
}
export = Job;