import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './shared/navigationbar.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
//import { AccountSummaryComponent } from './accounts/accountsummary.component';
import { AppRoutingModule } from './shared/app.routing.module';
import { LoginService } from './service/login.service';
import { TransactionService } from './service/transaction.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    ErrorComponent,
   //AccountSummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [LoginService, TransactionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
