import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import { LandingPage } from './components/landing-page/landing-page';
import { AppRoutingModule } from './app-routing.module';
import { FlightSearchResultsComponent } from './components/flight-search-results/flight-search-results.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {FlightCardModule} from "./components/flight-card/flight-card.module";
import { RegisterPageComponent } from './components/register-page/register-page.component';
import {PurchasePageComponent} from "./components/purchase-page/purchase-page.component";
import { PassengerInputComponent } from './components/passenger-input/passenger-input.component';
import { CallbackPageComponent } from './components/callback-page/callback-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPage,
    FlightSearchResultsComponent,
    LoginPageComponent,
    RegisterPageComponent,
    PurchasePageComponent,
    PassengerInputComponent,
    CallbackPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterLink,
    RouterOutlet,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlightCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
