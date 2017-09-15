import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../service/transaction.service';
import { Account } from '../model/account';
import { AccountDetails } from '../model/accountdetails';

@Component({
  templateUrl: './accountsummary.component.html',
  styleUrls: ['./accountsummary.component.css']
})
export class AccountSummaryComponent implements OnInit, OnChanges {
  title = 'Account Summary';
  isLoggedIn: boolean;
  accounts: Account[] = [
    { id: 1, name: 'Savings Account', balance: 1982.12 },
    { id: 2, name: 'Cheque Account', balance: 500.00 },
    { id: 3, name: 'Credit Account', balance: 2391.28 }
  ];

  accountTransactions: AccountDetails[];

  constructor(private transactionService: TransactionService, private router: Router ) {}

  ngOnInit() {
      // if (this.loginService.isUserLoggedIn()) {
      //   this.isLoggedIn = true;
      // }
      // else {
      //   this.isLoggedIn = false;
      // }
  }

  ngOnChanges() {

  }

  transactionDetails(account: Account) {
   this.accountTransactions = this.transactionService.getTransactions(account.id);
  }

  transactionDescription(transactionId: number) {
    let transaction = this.accountTransactions.filter(x => x.transactionId === transactionId);

    alert(transaction[0].note);
  }
}
