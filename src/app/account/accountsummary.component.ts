import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../service/transaction.service';
import { AccountService } from '../service/account.service';
import { LoginService } from '../service/login.service';
import { Account } from '../model/account';

@Component({
  templateUrl: './accountsummary.component.html',
  styleUrls: ['./accountsummary.component.css']
})
export class AccountSummaryComponent implements OnInit, OnChanges {
  title = 'Account Summary';
  isLoggedIn: boolean;
  accounts: Account[];

  // Passing in account object to transactionhistory.component
  selectedAccount: Account;

  constructor(private transactionService: TransactionService,
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {   
    this.isLoggedIn = this.loginService.isUserLoggedIn();
    
    if (this.isLoggedIn) {
      this.accounts = this.accountService.getAccounts();
    }
  }

  ngOnChanges() {
  }

  transactionDetails(account: Account) {
    this.isLoggedIn = this.loginService.isUserLoggedIn();

    if (!this.isLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    else {
      // this.router.navigateByUrl('/transactionhistory' + '/' + account.id);
      this.selectedAccount = account;
    }
  } 
}
