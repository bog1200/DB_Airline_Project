import Airport from "./Airport";
import AirportGateType from "./AirportGateType";
interface AirportGate {
    id?: number;
    airport_id?: Airport;
    number?: string;
    type?: AirportGateType;
}
export = AirportGate;