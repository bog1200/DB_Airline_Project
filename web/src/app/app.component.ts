import {Component, OnInit} from '@angular/core';
import {Account} from "./models/account.model";
import {AccountService} from "./services/account.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

 account: Account|null = null;
 constructor(private accountService: AccountService,
             private router: Router,
             private location: Location
             ) {


 }

  ngOnInit(): void {
      this.accountService.account.subscribe(
          x => this.account = x);

  }
    log_out() {
        this.accountService.logout();
        console.log("logged out");
        window.location.reload();
    }
}
