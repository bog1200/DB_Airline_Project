import {Component, Input} from '@angular/core';
import {Flight} from "../../models/flight.model";
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";


@Component({
  selector: 'app-purchase-page',
  templateUrl: './purchase-page.component.html',
  styleUrls: ['./purchase-page.component.css']
})
export class PurchasePageComponent {
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

  private readonly redirect: string = window.history.state.redirect;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
   //if last page not /search, then go back to home page
    console.log(this.redirect);
    if (this.redirect?.substring(0, 7) !== '/search') {
      this.router.navigateByUrl('/').then(r => console.log(r));
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.flight.id = params['flight_id'];
    }
    );
  }
  goBack() {
    this.router.navigateByUrl(this.redirect).then(r => console.log(r))
  }

  purchase() {

  }
}
