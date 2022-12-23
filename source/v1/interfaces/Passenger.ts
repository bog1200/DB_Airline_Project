import Country from "./Country";
import Flight from "./Flight";
interface Passenger {
    id: number;
    flight_id: number | Flight;
    first_name: string;
    last_name: string;
    country: number | Country;
    id_number: string;
    phone: string;
    email: string;

}
export = Passenger;