import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
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

  // Passing in account object to transactionhistory.component.ts. 
  // 'selectedAccount' is bound to the input parameter declared in transactionhistory.component.ts
  selectedAccount: Account;

  constructor(private accountService: AccountService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {   
    this.isLoggedIn = this.loginService.isUserLoggedIn();
    
    if (this.isLoggedIn) {
      this.accountService.getAccounts().subscribe(resp => {
        console.log(resp);
        this.accounts = resp;
        this.selectedAccount = null;
      })
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
      // Here, we use the navigation method to get to the transaction history component
      // this.router.navigateByUrl('/transactionhistory' + '/' + account.id);

      // We uses @Input() to pass in the selected account to the transactionhistory.component.ts
      this.selectedAccount = account;
    }
  } 
}
