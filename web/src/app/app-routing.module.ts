import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LandingPage} from "./components/landing-page/landing-page";
import {FlightSearchResultsComponent} from "./components/flight-search-results/flight-search-results.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {RegisterPageComponent} from "./components/register-page/register-page.component";
import {PurchasePageComponent} from "./components/purchase-page/purchase-page.component";
import {CallbackPageComponent} from "./components/callback-page/callback-page.component";

const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'search', component: FlightSearchResultsComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'purchase', component: PurchasePageComponent },
  { path: 'callback', component: CallbackPageComponent },
  { path: '**', redirectTo: ''}

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
