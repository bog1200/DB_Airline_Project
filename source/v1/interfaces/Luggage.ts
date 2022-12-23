import Flight from './Flight';
import Passenger from './Passenger';
interface Luggage {
    id: number;
    passenger_id: number | Passenger;
    flight_id: number | Flight;
    type_id: number;
    special_mentions: string;
}
export = Luggage;