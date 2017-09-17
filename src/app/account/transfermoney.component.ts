import { Component, ViewContainerRef, ViewEncapsulation, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from "ng2-bootstrap-modal";
import { TransactionService } from '../service/transaction.service';
import { AccountService } from '../service/account.service';
import { LoginService } from '../service/login.service';
import { Account } from '../model/account';
import { AccountDetails } from '../model/accountdetails';
import { AccountType } from '../enum/accounttype';
import { ConfirmComponent } from '../shared/confirm.component';
import { AlertComponent } from '../shared/alert.component';

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
  transferNote: string;
  transferMessage: string;
  isTransferClicked: boolean;
  isLoggedIn: boolean;

  constructor(private transactionService: TransactionService,
    private accountService: AccountService,
    private loginService: LoginService,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.loginService.isUserLoggedIn();

    if (this.isLoggedIn) {
      this.accountsFrom = this.accountService.getAccounts();
      this.accountsTo = this.accountsFrom;
    }
  }

  ngOnChanges() {
  }


  confirmTransfer() {
    this.isTransferClicked = true;

    let disposable = this.dialogService.addDialog(ConfirmComponent, {
      title: 'You are about to make a money transfer',
      message: `Transferring $${this.transferAmount} from ${this.selectedAccountFrom} to ${this.selectedAccountTo}`
    })
      .subscribe((isConfirmed) => {
        //We get dialog result
        if (isConfirmed) {
          this.transferMoney();
        }
        else {
          this.isTransferClicked = false;
        }

        disposable.unsubscribe();
      });

    //We can close dialog calling disposable.unsubscribe();
    //If dialog was not closed manually close it by timeout
    // setTimeout(() => {
    //   disposable.unsubscribe();
    // }, 10000);
  }

  transferMoney() {
    //alert(`Transferring ${this.transferAmount} from ${this.selectedAccountFrom} to ${this.selectedAccountTo}`);

    if (this.isLoggedIn) {
      let fromAccount = this.selectedAccountFrom.substr(0, this.selectedAccountFrom.lastIndexOf(' '));
      let toAccount = this.selectedAccountTo.substr(0, this.selectedAccountTo.lastIndexOf(' '));

      let fromAccountId = this.accountsFrom.filter(x => x.name === fromAccount)[0].id;
      let toAccountId = this.accountsTo.filter(x => x.name === toAccount)[0].id;

      if (!this.validTransfer(fromAccountId, toAccountId, this.transferAmount)) {
        //alert(this.transferMessage);
        this.dialogService.addDialog(AlertComponent, {title:'Transfer Status', message:this.transferMessage});
        return;
      }

      this.transactionService.transferMoney(fromAccountId, toAccountId, this.transferAmount, this.transferNote);

      //alert(this.transferMessage);
      this.dialogService.addDialog(AlertComponent, {title:'Transfer Status', message:this.transferMessage});

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
    this.transferNote = '';
    this.transferMessage = '';
    this.isTransferClicked = false;
  }

  validTransfer(fromAccountId: AccountType, toAccountId: AccountType, transferAmount: number): boolean {
    // Can't transfer between the same accounts
    if (fromAccountId == toAccountId) {
      this.transferMessage = 'You are not allowed to transfer between the same account.';
      return false;
    }

    // Sufficient balance for from account
    let fromAccountBalance = this.accountsFrom.filter(x => x.id === fromAccountId)[0];
    if (fromAccountBalance.balance < transferAmount) {
      this.transferMessage = 'Insufficient balance to complete the transfer.';
      return false;
    }

    // Prevent negative amount transfer
    if (transferAmount <= 0) {
      this.transferMessage = 'Transfer amount cannot be less than 0 dollar.';
      return false;
    }

    this.transferMessage = 'Money was transferred successfully.';
    return true;
  }
}
