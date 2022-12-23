import Airplane from './Airplane';
import Airport from './Airport';
import AirportGate from './AirportGate';
interface Flight {
    id?: number;
    plane_id?: Airplane;
    origin_id?: Airport;
    destination_id?: Airport;
    origin_gate_id?: AirportGate;
    destination_gate_id?: AirportGate;
    departure_time?: Date;
    arrival_time?: Date;
}
export = Flight;