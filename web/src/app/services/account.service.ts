import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {MessageSingle} from "../models/message/message.model";
import {Account} from "../models/account.model";
import {map} from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private url = environment.apiUrl + 'accounts';
  private accountSubject: BehaviorSubject<Account|null>;
  public account: Observable<Account|null>;

  constructor(private http: HttpClient) {
    this.accountSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.account = this.accountSubject.asObservable();
  }

   get getAccount() {
    return <Account>this.accountSubject.value;
  }
  set setAccount(account: Account) {
    this.accountSubject.next(account);
  }

  get(uuid: string): Observable<MessageSingle<Account>> {
    return this.http.get<MessageSingle<Account>>(this.url+`/?uuid=${uuid}`);
  }
  post(account: Account): Observable<any> {
    return this.http.post(this.url, account);
  }
  put(uuid: string, account: Account): Observable<any> {
    return this.http.put(`${this.url}/?uuid=${uuid}`, account);
  }

  delete(uuid: string): Observable<any> {
    return this.http.delete(`${this.url}/?uuid=${uuid}`);
  }

  login(email: string, password: string): Observable<MessageSingle<Account>> {
    return this.http.post<MessageSingle<Account>>(this.url + '/login', {email, password});
  }
  loginExternal(code: string): Observable<MessageSingle<Account>> {
    return this.http.get<MessageSingle<Account>>(this.url + '/loginExternal?code=' + code);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.accountSubject.next(null);
  }




}
