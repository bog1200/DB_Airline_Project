/**
 * @openapi
 *
 * components:
 *   schemas:
 *     Luggage:
 *       type: object
 *       required:
 *       - id
 *       - passenger_id
 *       - flight_id
 *       - weight
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the luggage
 *           readOnly: true
 *           example: 1
 *           default: ""
 *         passenger_id:
 *           type: integer
 *           default: ""
 *           example: "1"
 *           description: ID of the passenger to which the luggage belongs
 *         flight_id:
 *           type: integer
 *           default: ""
 *           example: "1"
 *           description: ID of the flight to which the luggage belongs to
 *         weight:
 *           type: double
 *           default: ""
 *           example: "1.0"
 *           description: Weight of the luggage
 *         special_mentions:
 *           type: string
 *           default: ""
 *           example: "Live animals"
 *           description: Special mentions for the luggage
 *
 *
 */
interface Passenger {
    id?: number;
    flight_id: number;
    first_name?: string;
    last_name?: string;
    country: number;
    id_number: string;
    phone?: string;
    email?: string;

}
export = Passenger;