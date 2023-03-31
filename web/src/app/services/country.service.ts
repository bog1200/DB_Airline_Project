import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';
import { environment } from '../../environments/environment';
import {MessageMultiple, MessageSingle} from "../models/message/message.model";


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private url = environment.apiUrl + 'countries';

  constructor(private http: HttpClient) { }

  getAll(): Observable<MessageMultiple<Country>> {
    return this.http.get<MessageMultiple<Country>>(this.url+'/all');
  }

get(id: number): Observable<MessageSingle<Country>> {
    return this.http.get<MessageSingle<Country>>(`${this.url}/?id=${id}`);
  }

  create(data: Country): Observable<any> {
    return this.http.post(this.url, data);
  }

  update(id: number, data: Country): Observable<any> {
    return this.http.put(`${this.url}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
}
}
