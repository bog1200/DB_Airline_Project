import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit{


    constructor(
        private accountService: AccountService,
        private router: Router,
        private location: Location
    ) {

    }

    ngOnInit(): void {
        if(this.accountService.getAccount != null){
            this.router.navigate(['/']).then(r => console.log(r));
        }
        let emailControl= new FormControl('', [
            Validators.required
        ]);


        let passwordControl= new FormControl('', [
            Validators.required
        ]);

        this.loginForm = new FormGroup({
            email: emailControl,
            password: passwordControl



        });


    }


    error: string = "";
    loginForm: any;

    login(): void {
        let email: string = this.loginForm.get('email')?.value!;
        let password: string = this.loginForm.get('password')?.value!;
        console.log(email);
       this.accountService.login(email, password).subscribe(response => {
           if (response.message=="Authentication successful"){
               let account = response.data;
               localStorage.setItem('user', JSON.stringify(account));
               this.error = "";
               this.accountService.setAccount = account;


               //reload last page
                this.router.navigateByUrl(window.location.origin,{
                    skipLocationChange: true
                }).then(r => console.log(r));
           }
           else{
                this.error = "Invalid Login";
           }
         });
    }
}
