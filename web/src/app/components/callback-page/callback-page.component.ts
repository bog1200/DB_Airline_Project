import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-callback-page',
  templateUrl: './callback-page.component.html',
  styleUrls: ['./callback-page.component.css']
})
export class CallbackPageComponent implements OnInit{
  constructor( private accountService: AccountService,
               private router: Router) { }

  ngOnInit(): void {
    // get code from url ?code=...
    const code = window.location.search.split('code=')[1];
    // if code is null, redirect to login page
    if (code == null) {
      this.router.navigate(['/login']).then(r => console.log(r));
      return;
    }
    this.accountService.loginExternal(code).subscribe(response => {
      if (response.message=="Authentication successful"){
        let account = response.data;
        const helper = new JwtHelperService();
        // decode jwt token
        console.log(account);
        if (account.access_token != null) {
          const decodedToken = helper.decodeToken(account.access_token);
          account.uuid = decodedToken.sub;
          account.email = decodedToken.email;
          account.first_name = decodedToken.given_name || "SSO User "+ decodedToken.sub.split('-')[4];
          account.last_name = decodedToken.family_name;
          // save account to local storage
          localStorage.setItem('user', JSON.stringify(account));
          // set account in account service
          this.accountService.setAccount = account;
          // redirect to home page
          this.router.navigate(['/']).then(r => console.log(r));
        }


      }
      else{
        this.router.navigate(['/login']).then(r => console.log(r));
      }

    });
  }

   doNothing(): void {
    return;
  }


}



