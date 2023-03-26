/**
 * @openapi
 *
 * components:
 *   schemas:
 *     AirportGateType:
 *       type: object
 *       required:
 *       - id
 *       - type
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the gate type
 *           readOnly: true
 *           example: 1
 *           default: ""
 *         type:
 *           type: string
 *           default: ""
 *           example: "Big"
 *           description: Name of the gate type
 *
 */
interface AirportGateType {
    id?: number;
    type?: string;
}
export = AirportGateType;