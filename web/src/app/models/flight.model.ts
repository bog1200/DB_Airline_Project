export class Flight {
  id?: number;
  plane_id: number ;
  origin_id: number;
  destination_id: number;
  origin_gate_id: number;
  destination_gate_id: number;
  departure_time: Date;
  arrival_time: Date;
  price: number;

  constructor(plane_id: number, origin_id: number, destination_id: number, origin_gate_id: number, destination_gate_id: number, departure_time: Date, arrival_time: Date, price: number) {
    this.plane_id = plane_id;
    this.origin_id = origin_id;
    this.destination_id = destination_id;
    this.origin_gate_id = origin_gate_id;
    this.destination_gate_id = destination_gate_id;
    this.departure_time = departure_time;
    this.arrival_time = arrival_time;
    this.price = price;
  }
}
