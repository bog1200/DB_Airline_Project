/**
 * @openapi
 *
 * components:
 *   schemas:
 *     FlightCrew:
 *       type: object
 *       required:
 *       - id
 *       - flight_id
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the flight crew
 *           readOnly: true
 *           example: 1
 *           default: ""
 *         flight_id:
 *           type: integer
 *           default: ""
 *           example: "1"
 *           description: ID of the flight to which the crew belongs
 *
 */
interface FlightCrew {
    id?: number;
    flight_id: number;
}
export = FlightCrew;