import {Component, Input, OnInit} from '@angular/core';
import {Flight} from "../../models/flight.model";
import {AirportService} from "../../services/airport.service";
import {Router} from "@angular/router";
//import {AirplaneService} from "../../services/airplane.service";

@Component({
  selector: 'flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css']
})

export class FlightCardComponent implements OnInit{
  @Input() flight: Flight = {
    arrival_time: new Date(),
    departure_time: new Date(),
    destination_gate_id: 0,
    destination_id: 0,
    id: 0,
    origin_gate_id: 0,
    origin_id: 0,
    plane_id: 0,
    price: 0
  };
  originName: string= "";
  destinationName: string= "";
  available_seats: any;

  constructor(
    private airportService: AirportService,
    private router: Router,
  ) {

  }
  ngOnInit(): void {
    console.log("flight card ===>", this.flight);
    this.airportService.get(this.flight.origin_id).subscribe((response) => {
      this.originName = response.data.name!;
    }
    );
    this.airportService.get(this.flight.destination_id).subscribe((response) => {
      this.destinationName = response.data.name!;
    }
    );

  }

  buy(flight: Flight) {
    console.log("buy ===>", flight.id);
    this.router.navigate(['/purchase'],{
      queryParams: {flight_id: flight.id},
      state: { redirect: this.router.url }
    }).then(r => console.log(r));
  }


}
