import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight.model';
import { environment } from '../../environments/environment';
import {MessageSingle, MessageMultiple} from "../models/message/message.model";


@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private url = environment.apiUrl + 'flights';

  constructor(private http: HttpClient) { }

  getAll(): Observable<MessageMultiple<Flight>> {
    return this.http.get<MessageMultiple<Flight>>(this.url);
  }

  get(id: number): Observable<MessageSingle<Flight>> {
    return this.http.get<MessageSingle<Flight>>(`${this.url}?id=${id}`);
  }

  create(data: Flight): Observable<any> {
    return this.http.post(this.url, data);
  }

  update(id: number, data: Flight): Observable<any> {
    return this.http.put(`${this.url}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  search(plane_id?: number, origin_id?: number, destination_id?: number, departure_time?: Date, price_min?: number,price_max?: number ): Observable<MessageMultiple<Flight>> {
    let params: any[] = [];
    if (plane_id) {
      params.push(`plane_id=${plane_id}`);
    }
    if (origin_id) {
      if(params.length > 0) params.push('&');
      params.push(`origin_id=${origin_id}`);
    }
    if (destination_id) {
      if(params.length > 0) params.push('&');
      params.push(`destination_id=${destination_id}`);
    }
    if (departure_time) {
      if(params.length > 0) params.push('&');
      params.push(`departure_time=${departure_time}`);
    }
    if (price_min) {
      if(params.length > 0) params.push('&');
      params.push(`price_min=${price_min}`);
    }
    if (price_max) {
      if(params.length > 0) params.push('&');
      params.push(`price_max=${price_max}`);
    }
    if(params.length==0) return new Observable<MessageMultiple<Flight>>();
    return this.http.get<MessageMultiple<Flight>>(`${this.url}/search?${params.join('')}`);

  }


}
