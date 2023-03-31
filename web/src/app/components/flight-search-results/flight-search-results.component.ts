import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Flight} from "../../models/flight.model";
import {FlightService} from "../../services/flight.service";
import {AirportService} from "../../services/airport.service";
import {CityService} from "../../services/city.service";


@Component({
  selector: 'app-flight-search-results',
  templateUrl: './flight-search-results.component.html',
  styleUrls: ['./flight-search-results.component.css']
})
export class FlightSearchResultsComponent implements OnInit{
  flights: Flight[] = [];
  flightsPage: Flight[] = [];
  page: number = 1;

  from: string = '';
  to: string = '';
  date: string = '';
  //
  Pages(): number {
    return Math.ceil(this.flights.length / 2);
  }

  constructor(private flightService: FlightService,private airportService: AirportService,private cityService: CityService,private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let origin: number | undefined,
      destination: number | undefined,
      departureDate;
    this.route.queryParams.subscribe(params => {
      origin = params['origin'];
      destination=  params['destination'];
      departureDate= params['departureDate'];
      this.date = departureDate || '01.01.1970';
    });

    console.log(origin);
    console.log(destination);
    console.log(departureDate);
    this.flightService.search(undefined,origin,destination,departureDate).subscribe({
      next: (data) => {
        this.flights = data.data;
        this.flightsPage = this.flights.slice(0, 2);
        console.log(data);
      },
      error: (e) => console.error(e)
    });
    this.airportService.get(origin!).subscribe({
      next: (data) => {
        this.cityService.get(data.data.city_id!).subscribe({
          next: (data) => {
            this.from = data.data.name;
          }
        }
        )
      }
    })
    this.airportService.get(destination!).subscribe({
      next: (data) => {
        this.cityService.get(data.data.city_id!).subscribe({
          next: (data) => {
            this.to = data.data.name;
          }
        }
        )
      }
    })
  }



  nextPage() {
    this.page++;
    this.flightsPage = this.flights.slice(2 * (this.page - 1), 2 * this.page);
  }
  previousPage() {
    this.page--;
    this.flightsPage = this.flights.slice(2 * (this.page - 1), 2 * this.page);
  }
}
