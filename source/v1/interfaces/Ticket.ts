import Account from "./Account";
import Passenger from "./Ticket";
import Flight from "./Flight";
interface Ticket {
    id?: number;
    code?: string;
    account_id?: number | Account;
    passenger_id?: number | Passenger;
    flight_id?: number | Flight;
    class_id?: number;
    price?: number;
}
export = Ticket;