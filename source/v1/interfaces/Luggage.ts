import Flight from './Flight';
import Passenger from './Passenger';
interface Luggage {
    id: number;
    passenger_id: Passenger;
    flight_id: Flight;
    type_id: number;
    special_mentions: string;
}
export = Luggage;