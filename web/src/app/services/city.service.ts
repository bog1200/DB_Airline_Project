import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city.model';
import {MessageSingle, MessageMultiple} from "../models/message/message.model";
import {environment} from "../../environments/environment";
import {} from "../models/message/message.model";


@Injectable({
  providedIn: 'root'
})
export class CityService {

  private url = environment.apiUrl + 'cities';

  constructor(private http: HttpClient) { }

  getAll(): Observable<MessageMultiple<City>> {
    return this.http.get<MessageMultiple<City>>(this.url);
  }

  get(id: number): Observable<MessageSingle<City>> {
    return this.http.get<MessageSingle<City>>(`${this.url}?id=${id}`);
  }

  create(data: City): Observable<any> {
    return this.http.post(this.url, data);
  }

  update(id: number, data: City): Observable<any> {
    return this.http.put(`${this.url}${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}${id}`);
  }

  search(country?: number, name?: String): Observable<MessageMultiple<City>> {
    let params: any[] = [];
    if (country) {
      params.push(`country=${country}`);
    }
    if (name) {
      if(params.length > 0) params.push('&');
      params.push(`name=${name}`);
    }
    if(params.length==0) return new Observable<MessageMultiple<City>>();
    return this.http.get<MessageMultiple<City>>(`${this.url}/search?${params.join('')}`);
  }
}
