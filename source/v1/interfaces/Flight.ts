
import Airplane from './Airplane';
import Airport from './Airport';
import AirportGate from './AirportGate';

/**
 * @openapi
 *
 * components:
 *   schemas:
 *     Flight:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           nullable: true
 *         plane_id:
 *           type: integer
 *           nullable: true
 *           description: The ID of the airplane used for the flight
 *         origin_id:
 *           type: integer
 *           nullable: true
 *           description: The ID of the airport where the flight originated
 *         destination_id:
 *           type: integer
 *           nullable: true
 *           description: The ID of the airport where the flight is going to
 *         origin_gate_id:
 *           type: integer
 *           nullable: true
 *           description: The ID of the gate at the origin airport where the flight departs from
 *         destination_gate_id:
 *           type: integer
 *           nullable: true
 *           description: The ID of the gate at the destination airport where the flight arrives at
 *         departure_time:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: The scheduled departure time of the flight
 *         arrival_time:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: The scheduled arrival time of the flight
 *         price:
 *           type: number
 *           nullable: true
 *           description: The price of the flight
 *           example: 100.00
 *           minimum: 0
 *           maximum: 100000
 *           multipleOf: 0.01
 *           exclusiveMinimum: true
 *           exclusiveMaximum: true
 *           exclusiveMultipleOf: true
 *
 */
interface Flight {
    id?: number;
    plane_id?: number ;
    origin_id?: number;
    destination_id?: number;
    origin_gate_id?: number;
    destination_gate_id?: number;
    departure_time?: Date;
    arrival_time?: Date;
    price?: number;
}
export = Flight;