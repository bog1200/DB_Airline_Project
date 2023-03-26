/**
 * @openapi
 *
 * components:
 *   schemas:
 *     City:
 *       type: object
 *       required:
 *       - id
 *       - name
 *       - country
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the city
 *           readOnly: true
 *           example: 1
 *           default: ""
 *         name:
 *           type: string
 *           default: ""
 *           example: "Bucharest"
 *           description: Name of the city
 *         country:
 *           type: integer
 *           description: ID of the country
 *           default: ""
 *           example: "1"
 *
 */
interface City {
    id?: number;
    name: string;
    country: number;
}
export = City;