import AirplaneManufacturer from "./AirplaneManufacturer";
interface AirplaneType {
    id: number;
    name: string;
    manufacturer: AirplaneManufacturer;
    range_km: number;
    seats: number;

}
export = AirplaneType;