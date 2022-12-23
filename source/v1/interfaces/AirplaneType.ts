import AirplaneManufacturer from "./AirplaneManufacturer";
interface AirplaneType {
    id: number;
    name: string;
    manufacturer: number | AirplaneManufacturer;
    range_km: number;
    seats: number;

}
export = AirplaneType;