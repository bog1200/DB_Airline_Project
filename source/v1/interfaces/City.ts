import Country from "./Country";

interface City {
    id: number;
    name: string;
    country: number | Country;
}
export = City;