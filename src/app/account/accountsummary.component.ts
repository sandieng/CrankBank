import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { Account } from '../model/account';

@Component({
  templateUrl: './accountsummary.component.html',
  styleUrls: ['./accountsummary.component.css']
})
export class AccountSummaryComponent implements OnInit, OnChanges {
  title = 'Account Summary';
  accounts: Account[] = [
    { id: 1, name: 'Savings Account', balance: 1982.12 },
    { id: 2, name: 'Cheque Account', balance: 500.00 },
    { id: 3, name: 'Credit Account', balance: 2391.28 }
  ];

  constructor(private loginService: LoginService, private router: Router ) {}

  ngOnInit() {
   
  }

  ngOnChanges() {
  
  }

  transactionDetails(account: Account) {
    alert(account.id);
  }
}
