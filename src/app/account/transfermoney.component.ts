import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../service/transaction.service';
import { AccountService } from '../service/account.service';
import { LoginService } from '../service/login.service';
import { Account } from '../model/account';
import { AccountDetails } from '../model/accountdetails';
import { AccountType } from '../enum/accounttype';

@Component({
  templateUrl: './transfermoney.component.html',
  styleUrls: ['./transfermoney.component.css']
})
export class TransferMoneyComponent implements OnInit, OnChanges {
  title = 'Transfer Money';
  accountsFrom: Account[];
  accountsTo: Account[];
  selectedAccountFrom: string;
  selectedAccountTo: string;
  transferAmount: number;
  isLoggedIn: boolean;

  constructor(private transactionService: TransactionService,
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.loginService.isUserLoggedIn();

    if (this.isLoggedIn) {
      this.accountsFrom = this.accountService.getAccounts();
      this.accountsTo = this.accountsFrom;
    }
  }

  ngOnChanges() {
  }

  transferMoney() {
    //alert(`Transferring ${this.transferAmount} from ${this.selectedAccountFrom} to ${this.selectedAccountTo}`);

    if (this.isLoggedIn) {
      let fromAccount = this.selectedAccountFrom.substr(0, this.selectedAccountFrom.lastIndexOf(' '));
      let toAccount = this.selectedAccountTo.substr(0, this.selectedAccountTo.lastIndexOf(' '));

      let fromAccountId = this.accountsFrom.filter(x => x.name === fromAccount)[0].id;
      let toAccountId = this.accountsTo.filter(x => x.name === toAccount)[0].id;

      if (!this.validTransfer(fromAccountId, toAccountId, this.transferAmount))
        return;

      this.transactionService.transferMoney(fromAccountId, toAccountId, this.transferAmount);

      this.router.navigateByUrl('/accountsummary');
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }

  cancelTransfer() {
    this.transferAmount = 0;
    this.selectedAccountFrom = null;
    this.selectedAccountTo = null;
  }

  validTransfer(fromAccountId: AccountType, toAccountId: AccountType, transferAmount: number): boolean {
    // Can't transfer between the same accounts
    if (fromAccountId == toAccountId) {
      alert('You are not allowed to transfer between the same account.');
      return false;
    }

    // Sufficient balance for from account
    let fromAccountBalance = this.accountsFrom.filter(x => x.id === fromAccountId)[0];
    if (fromAccountBalance.balance < transferAmount) {
      alert('Insufficient balance to complete the transfer.');
      return false;
    }

    // Prevent negative amount transfer
    if (transferAmount <= 0) {
      alert('Transfer amount cannot be less than 0 dollar.');
      return false;
    }
    
    return true;
  }
}
