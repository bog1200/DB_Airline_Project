/**
 * @openapi
 *
 * components:
 *   schemas:
 *     Airplane:
 *       type: object
 *       required:
 *       - id
 *       - reg_number
 *       - type
 *       - country
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the airplane
 *           readOnly: true
 *         reg_number:
 *           type: string
 *           description: Registration number of the airplane
 *         type:
 *           type: integer
 *           description: Type of the airplane
 *         country:
 *           type: integer
 *           description: ID of the country where the airplane is registered
 *           example: 1
 *           default: ""
 */
interface Airplane {
    id?: number;
    reg_number: string;
    type: number;
    country: number;

}
export = Airplane;