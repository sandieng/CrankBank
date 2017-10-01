import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './shared/app.routing.module';
import { NavigationBarComponent } from './shared/navigationbar.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountSummaryComponent } from './account/accountsummary.component';
import { TransactionHistoryComponent } from './account/transactionhistory.component';
import { TransferMoneyComponent } from './account/transfermoney.component';

import { LoginService } from './service/login.service';
import { TransactionService } from './service/transaction.service';
import { AccountService } from './service/account.service';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavigationBarComponent,
        LoginComponent,
        LogoutComponent,
        HomeComponent,
        ErrorComponent,
      ],
      imports: [
        RouterModule.forRoot([
          { path: 'accountsummary', component: AccountSummaryComponent },
          { path: 'transactionhistory/:accountId', component: TransactionHistoryComponent },
          { path: 'transfermoney', component: TransferMoneyComponent },
          { path: 'login', component: LoginComponent },
          { path: 'logout', component: LogoutComponent },
          { path: 'home', component: HomeComponent },
          { path: '', component: HomeComponent },
          { path: '**', component: ErrorComponent },
        ]),
        FormsModule,
        CommonModule,
        AppRoutingModule,
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, LoginService, TransactionService, AccountService]
    }).compileComponents();
  }));

  // it('should create the app', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // }));

  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('Angular Bank');
  // }));

  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to Angular Bank');
  // }));
});
