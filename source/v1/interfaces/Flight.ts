import Airplane from './Airplane';
import Airport from './Airport';
import AirportGate from './AirportGate';
interface Flight {
    id?: number;
    plane_id?: number | Airplane;
    origin_id?: number | Airport;
    destination_id?: number | Airport;
    origin_gate_id?: number | AirportGate;
    destination_gate_id?: number | AirportGate;
    departure_time?: Date;
    arrival_time?: Date;
}
export = Flight;