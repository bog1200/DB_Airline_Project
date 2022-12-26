/**
 * @openapi
 *
 * components:
 *   schemas:
 *     AirplaneType:
 *       type: object
 *       required:
 *       - id
 *       - name
 *       - manufacturer
 *       - range_km
 *       - seats
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the airplane type
 *           readOnly: true
 *         name:
 *           type: string
 *           default: ""
 *           example: "737-800"
 *           description: Name of the airplane type
 *         manufacturer:
 *           type: integer
 *           description: ID of the airplane manufacturer
 *         range_km:
 *           type: integer
 *           example: 1000
 *           default: ""
 *           description: Range of the airplane type in kilometers
 *         seats:
 *           type: integer
 *           example: 100
 *           default: ""
 *           description: Number of seats in the airplane type
 */
interface AirplaneType {
    id?: number;
    name: string;
    manufacturer: number;
    range_km: number;
    seats: number;

}
export = AirplaneType;