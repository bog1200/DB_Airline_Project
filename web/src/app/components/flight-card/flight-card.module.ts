import { NgModule } from '@angular/core';
import {FlightCardComponent} from "./flight-card.component";

@NgModule({
  declarations: [
    FlightCardComponent
  ],
  imports: [],
  providers: [],
  exports: [
    FlightCardComponent
  ],
  bootstrap: [FlightCardComponent]
})
export class FlightCardModule { }
