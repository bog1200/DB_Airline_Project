import Country from "./Country";
import Flight from "./Flight";
interface Passenger {
    id: number;
    flight_id: Flight;
    first_name: string;
    last_name: string;
    country: Country;
    id_number: string;
    phone: string;
    email: string;

}
export = Passenger;