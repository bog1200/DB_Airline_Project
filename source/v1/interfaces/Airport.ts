import City from "./City";

interface Airport {
    id: number;
    name: string;
    city_id:  number | City;
    iata: string;
    icao: string;
    address: string;
}
export = Airport;