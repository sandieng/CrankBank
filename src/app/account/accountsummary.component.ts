import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../service/transaction.service';
import { AccountService } from '../service/account.service';
import { LoginService } from '../service/login.service';
import { Account } from '../model/account';
import { AccountDetails } from '../model/accountdetails';

@Component({
  templateUrl: './accountsummary.component.html',
  styleUrls: ['./accountsummary.component.css']
})
export class AccountSummaryComponent implements OnInit, OnChanges {
  title = 'Account Summary';
  isLoggedIn: boolean;
  accounts: Account[];

  accountTransactions: AccountDetails[];

  constructor(private transactionService: TransactionService,
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    // if (this.loginService.isUserLoggedIn()) {
    //   this.isLoggedIn = true;
    // }
    // else {
    //   this.isLoggedIn = false;
    // }
    this.accounts = this.accountService.getAccounts();
  }

  ngOnChanges() {

  }

  transactionDetails(account: Account) {
    this.isLoggedIn = this.loginService.isUserLoggedIn();

    if (!this.isLoggedIn) {
      this.router.navigateByUrl('/login');
    }

    this.accountTransactions = this.transactionService.getTransactions(account.id);
  }

  transactionDescription(transactionId: number) {
    this.isLoggedIn = this.loginService.isUserLoggedIn();

    if (!this.isLoggedIn) {
      this.router.navigateByUrl('/login');
    }

    let transaction = this.accountTransactions.filter(x => x.transactionId === transactionId);

    alert(transaction[0].note);
  }
}
