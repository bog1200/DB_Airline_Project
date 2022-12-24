/**
 * @openapi
 *
 *
 * components:
 *   schemas:
 *     Airport:
 *       type: object
 *       required:
 *         - name
 *         - city_id
 *         - iata
 *         - icao
 *         - address
 *       properties:
 *         name:
 *           type: string
 *           example: John F. Kennedy International Airport
 *         city_id:
 *           type: integer
 *           example: 1
 *         iata:
 *           type: string
 *           example: JFK
 *         icao:
 *           type: string
 *           example: KJFK
 *         address:
 *           type: string
 *           example: JFK Airport, Jamaica, NY 11430, USA
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