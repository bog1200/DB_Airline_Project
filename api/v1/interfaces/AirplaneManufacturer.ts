/**
 * @openapi
 *
 * components:
 *   schemas:
 *     AirplaneManufacturer:
 *       type: object
 *       required:
 *       - id
 *       - name
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the airplane
 *           readOnly: true
 *         name:
 *           type: string
 *           description: Name of the airplane manufacturer
 *           example: "Boeing"
 *           default: ""
 *           required: true
 */
interface AirplaneManufacturer {
    id?: number;
    name: string;
}
export = AirplaneManufacturer;