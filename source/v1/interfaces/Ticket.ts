import Account from "./account";
import Passenger from "./ticket";
import Flight from "./Flight";
import Class from "./Class";
interface Ticket {
    id?: number;
    code?: string;
    account_id?: Account;
    passenger_id?: Passenger;
    flight_id?: Flight;
    class_id?: Class;
    price?: number;
}
export = Ticket;