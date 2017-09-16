import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../service/transaction.service';
import { AccountService } from '../service/account.service';
import { LoginService } from '../service/login.service';
import { Account } from '../model/account';
import { AccountDetails } from '../model/accountdetails';

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

  constructor(private transactionService: TransactionService, 
              private accountService: AccountService,
              private loginService: LoginService,
              private router: Router ) {}

  ngOnInit() {
    this.accountsFrom = this.accountService.getAccounts();
    this.accountsTo = this.accountsFrom;
  }

  ngOnChanges() {
  }

  transferMoney() {
    //alert(`Transferring ${this.transferAmount} from ${this.selectedAccountFrom} to ${this.selectedAccountTo}`);
    let fromAccount = this.selectedAccountFrom.substr(0, this.selectedAccountFrom.lastIndexOf(' '));
    let toAccount = this.selectedAccountTo.substr(0, this.selectedAccountTo.lastIndexOf(' '));
    
    let fromAccountId = this.accountsFrom.filter(x => x.name === fromAccount)[0].id;
    let toAccountId = this.accountsTo.filter(x => x.name === toAccount)[0].id;
    
    this.transactionService.transferMoney(fromAccountId, toAccountId, this.transferAmount);

    this.router.navigateByUrl('/accountsummary');
  }
}
