/**
 * @openapi
 *
 * components:
 *   schemas:
 *     Country:
 *       type: object
 *       required:
 *       - id
 *       - name
 *       - icao
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the country
 *           readOnly: true
 *           example: 1
 *           default: ""
 *         name:
 *           type: string
 *           default: ""
 *           example: "Romania"
 *           description: Name of the country
 *         icao:
 *           type: string
 *           description: ICAO code of the country
 *           default: ""
 *           example: "ROU"
 *           maxLength: 3
 *           minLength: 3
 *           pattern: "^[A-Z]{3}$"
 *
 *
 */
interface Country {
    id?: number;
    icao: string;
    name: string;
}
export = Country;

