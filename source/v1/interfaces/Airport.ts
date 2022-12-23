import City from "./City";

interface Airport {
    id: number;
    name: string;
    city_id: City;
    iata: string;
    icao: string;
    address: string;
}
export = Airport;