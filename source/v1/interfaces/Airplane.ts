import AirplaneType from "./AirplaneType";
import Country from "./Country";

interface Airplane {
    id: number;
    reg_number: string;
    type: AirplaneType | number;
    country: Country | number;

}
export = Airplane;