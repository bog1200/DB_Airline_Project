/**
 * @openapi
 *
 * components:
 *   schemas:
 *     Passenger:
 *       type: object
 *       required:
 *       - id
 *       - flight_id
 *       - first_name
 *       - last_name
 *       - country
 *       - id_number
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the passenger
 *           readOnly: true
 *           example: 1
 *           default: ""
 *         flight_id:
 *           type: integer
 *           default: ""
 *           example: "1"
 *           description: ID of the flight to which the passenger belongs to
 *         first_name:
 *           type: string
 *           default: ""
 *           example: "John"
 *           description: First name of the passenger
 *         last_name:
 *           type: string
 *           default: ""
 *           example: "Doe"
 *           description: Last name of the passenger
 *         country:
 *           type: integer
 *           default: ""
 *           example: "1"
 *           description: ID of the country to which the passenger belongs to
 *         id_number:
 *           type: string
 *           default: ""
 *           example: "123456789"
 *           description: ID number of the passenger
 *         phone:
 *           type: string
 *           format: phone
 *           default: ""
 *           example: "+123456789"
 *           description: Phone number of the passenger
 *         email:
 *           type: string
 *           format: email
 *           default: ""
 *           example: "1"
 *           description: Email of the passenger
 */
interface Passenger {
    id?: number;
    flight_id: number;
    first_name: string;
    last_name: string;
    country: number;
    id_number: string;
    phone?: string;
    email?: string;

}
export = Passenger;