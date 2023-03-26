/**
 * @openapi
 *
 *
 * components:
 *   schemas:
 *     Airport:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - city_id
 *         - iata
 *         - icao
 *         - address
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the airport
 *           example: 1
 *           default: ""
 *           readOnly: true
 *         name:
 *           type: string
 *           description: Name of the airport
 *           example: John F. Kennedy International Airport
 *           default: ""
 *         city_id:
 *           type: integer
 *           description: ID of the city the airport is located in
 *           default: ""
 *           example: 1
 *         iata:
 *           type: string
 *           example: JFK
 *           default: ""
 *           description: IATA code of the airport
 *           minLength: 3
 *           maxLength: 3
 *           pattern: '^[A-Z]{3}$'
 *
 *         icao:
 *           type: string
 *           example: KJFK
 *           default: ""
 *           description: ICAO code of the airport
 *           minLength: 4
 *           maxLength: 4
 *           pattern: '^[A-Z]{4}$'
 *         address:
 *           type: string
 *           example: JFK Airport, Jamaica, NY 11430, USA
 *           description: Address of the airport
 *           default: ""
 */

interface Airport {
    id?: number;
    name?: string;
    city_id?:  number;
    iata?: string;
    icao?: string;
    address?: string;
}
export = Airport;