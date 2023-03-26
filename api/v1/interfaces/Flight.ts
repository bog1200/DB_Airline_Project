/**
 * @openapi
 *
 * components:
 *   schemas:
 *     Flight:
 *       type: object
 *       required:
 *       - id
 *       - plane_id
 *       - origin_id
 *       - destination_id
 *       - origin_gate_id
 *       - destination_gate_id
 *       - departure_time
 *       - arrival_time
 *       - price
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the flight
 *           readOnly: true
 *         plane_id:
 *           type: integer
 *           description: The ID of the airplane used for the flight
 *         origin_id:
 *           type: integer
 *           description: The ID of the airport where the flight originated
 *         destination_id:
 *           type: integer
 *           description: The ID of the airport where the flight is going to
 *         origin_gate_id:
 *           type: integer
 *           description: The ID of the gate at the origin airport where the flight departs from
 *         destination_gate_id:
 *           type: integer
 *           description: The ID of the gate at the destination airport where the flight arrives at
 *         departure_time:
 *           type: string
 *           format: date-time
 *           description: The scheduled departure time of the flight
 *         arrival_time:
 *           type: string
 *           format: date-time
 *           description: The scheduled arrival time of the flight
 *         price:
 *           type: number
 *           description: The price of the flight
 *           example: 100.00
 *           minimum: 0
 *           maximum: 100000
 *           exclusiveMinimum: true
 *           exclusiveMaximum: true
 *
 */
interface Flight {
    id?: number;
    plane_id: number ;
    origin_id: number;
    destination_id: number;
    origin_gate_id: number;
    destination_gate_id: number;
    departure_time: Date;
    arrival_time: Date;
    price: number;
}
export = Flight;