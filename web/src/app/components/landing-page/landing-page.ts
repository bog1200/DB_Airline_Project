import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CityService} from "../../services/city.service";
import {City} from "../../models/city.model";
import {AirportService} from "../../services/airport.service";
import {Airport} from "../../models/airport.model";
import {AirportCityPair} from '../../models/custom/airport-city-pair.model';
import {CountryService} from "../../services/country.service";
import {Country} from "../../models/country.model";
import {FlightService} from "../../services/flight.service";
import {Router} from "@angular/router";
import {Account} from "../../models/account.model";
import {AccountService} from "../../services/account.service";


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.css']
})
export class LandingPage implements OnInit {

  constructor(
    private cityService: CityService,
    private airportService: AirportService,
    private countryService: CountryService,
    private flightService: FlightService,
    private accountService: AccountService,

    private router: Router
  ) {
    this.OriginText = "";
    this.DestinationText = "Select Destination";
  }

  countries: Country[] = [];
  cities: City[] = [];

  airports: Airport[] = [];
  airportPairs: AirportCityPair[] = [];

  destinationAirports: Airport[] = [];
  destinationAirportPairs: AirportCityPair[] = [];
  account: Account | null = null;
  tomorrow: Date = new Date(new Date().setDate(new Date().getDate()+1));


  ngOnInit(): void {
    //get data from country service, then city service based on first, then airport service based on second
    this.countryService.getAll().subscribe({
        next: (data) => {
          this.countries = data.data;
          console.log(this.countries);
          this.countries.forEach((country) => {
            this.cityService.search(country.id).subscribe({
              next: (data) => {
                this.cities.push(...data.data);
                data.data.forEach(city => {
                  this.airportService.search(city.id).subscribe({
                    next: (data) => {
                      console.log(data);
                      if (data.data.length > 0) {
                        this.airports.push(...data.data);
                        console.log(this.airports);
                        data.data.forEach((airport) => {
                          this.airportPairs.push(new AirportCityPair(airport, city));
                        });
                      }

                    }
                  });
                });
              }
            });
          });
        }
      }
    );

   this.account = this.accountService.getAccount;
    }


  flightSearchForm = new FormGroup({
    origin: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    departureDate: new FormControl('', Validators.required),
  })
  OriginText: string = "";
  DestinationText: string = "";


  searchFlight(){
    console.log(this.flightSearchForm.value);
    this.router.navigate(['/search'], {queryParams: this.flightSearchForm.value}).then(r =>
      console.log(r));
  }





  getDestinations(value: string) {
    this.destinationAirports = [];
    this.destinationAirportPairs = [];
    //convert value to number
    let nr = Number(value);
    this.flightService.search(undefined, nr).subscribe({
      next: (data) => {
        let flights = data.data;
        // remove duplicates
        let airports = flights.map(flight => flight.destination_id && flight.destination_id);
        let uniqueAirports = [...new Set(airports)];
        uniqueAirports.forEach((airport) => {
          this.airportService.get(airport).subscribe({
            next: (data) => {
              this.destinationAirports.push(data.data);
              this.cityService.get(data.data.city_id!).subscribe({
                next: (CityData) => {
                  this.destinationAirportPairs.push(new AirportCityPair(data.data, CityData.data));
                }
              });
            }
          });
        });
      }
    });
  }
}

