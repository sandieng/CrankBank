import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './shared/navigationbar.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
//import { AccountSummaryComponent } from './accounts/accountsummary.component';
import { AppRoutingModule } from './shared/app.routing.module';
import { ConfirmComponent } from './shared/confirm.component';
import { AlertComponent } from './shared/alert.component';

import { LoginService } from './service/login.service';
import { TransactionService } from './service/transaction.service';
import { AccountService } from './service/account.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    ErrorComponent,
    ConfirmComponent,
    AlertComponent
    //AccountSummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BootstrapModalModule
  ],
  //Don't forget to add the component to entryComponents section
  entryComponents: [
    ConfirmComponent,
    AlertComponent
  ],
  providers: [LoginService, TransactionService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
