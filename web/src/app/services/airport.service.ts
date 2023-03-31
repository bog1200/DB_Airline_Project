import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Airport } from '../models/airport.model';
import { environment } from 'src/environments/environment';
import {MessageSingle, MessageMultiple} from "../models/message/message.model";



@Injectable({
  providedIn: 'root'
})
export class AirportService {

  private url = environment.apiUrl + 'airports';

  constructor(private http: HttpClient) { }

  getAll(): Observable<MessageMultiple<Airport>> {
    return this.http.get<MessageMultiple<Airport>>(this.url);
  }

  get(id: number): Observable<MessageSingle<Airport>> {
    return this.http.get<MessageSingle<Airport>>(`${this.url}/?id=${id}`);
  }

  create(data: Airport): Observable<any> {
    return this.http.post(this.url, data);
  }

  update(id: number, data: Airport): Observable<any> {
    return this.http.put(`${this.url}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }



  search(city_id?: number, iata?: String, icao?:String): Observable<MessageMultiple<Airport>> {
    let params: any[] = [];
    if (city_id) {
      params.push(`city_id=${city_id}`);
    }
    if (iata) {
      if(params.length > 0) params.push('&');
      params.push(`iata=${iata}`);
    }
    if (icao) {
      if(params.length > 0) params.push('&');
      params.push(`icao=${icao}`);
    }
    if(params.length==0) return new Observable<MessageMultiple<Airport>>();
    return this.http.get<MessageMultiple<Airport>>(`${this.url}/search?${params.join('')}`);
  }
}
