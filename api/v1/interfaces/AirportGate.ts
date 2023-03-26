/**
 * @openapi
 *
 * components:
 *   schemas:
 *     AirportGate:
 *       type: object
 *       required:
 *       - id
 *       - airport_id
 *       - number
 *       - type
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the gate
 *           readOnly: true
 *           example: 1
 *           default: ""
 *         airport_id:
 *           type: string
 *           default: ""
 *           example: "1"
 *           description: ID of the airport
 *         number:
 *           type: integer
 *           description: Gate number
 *           default: ""
 *           example: "1"
 *         type:
 *           type: integer
 *           example: 1
 *           default: ""
 *           description: ID of the gate type
 *
 */
interface AirportGate {
    id?: number;
    airport_id?: number;
    number?: string;
    type?: number;
}
export = AirportGate;