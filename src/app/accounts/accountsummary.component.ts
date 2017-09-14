import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../model/account';

@Component({
  templateUrl: './accountsummary.component.html',
  styleUrls: ['./accountsummary.component.css']
})
export class AccountSummaryComponent {
  title = 'Account Summary';
  accounts: Account[] = [
    { name: 'Savings Account', balance: 1982.12 },
    { name: 'Cheque Account', balance: 500.00 },
    { name: 'Credit Account', balance: 2391.28 }
  ];

  constructor(private router: Router ) {}
}
