import Flight from './Flight';
interface FlightCrew {
    id: number;
    flight_id: number | Flight;
}
export = FlightCrew;