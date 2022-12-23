import Airport from "./Airport";
import AirportGateType from "./AirportGateType";
interface AirportGate {
    id?: number;
    airport_id?: number | Airport;
    number?: string;
    type?: number | AirportGateType;
}
export = AirportGate;