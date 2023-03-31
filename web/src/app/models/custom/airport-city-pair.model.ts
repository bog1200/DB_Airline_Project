import {Airport} from "../airport.model";
import {City} from "../city.model";

export class AirportCityPair{
  airport: Airport;
  city: City;

  constructor(airport: Airport, city: City) {
    this.airport = airport;
    this.city = city;
  }


}
