import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//import * as firebase from 'firebase';
import { Observable, Subject } from 'rxjs/Rx';
import { NextRoute } from '../model/nextroute';
import { AccountService } from '../service/account.service';
import { AccountDetails } from '../model/accountdetails';
import { AccountType } from '../enum/accounttype';

@Injectable()
export class TransactionService {
    savingAccountTransactions: AccountDetails[] = [
        { accountId: AccountType.SavingsAccount, transactionId: 1, transactionDate: new Date(2017, 9, 1), transactionAmount: 100.00, note: "Salary" },
        { accountId: AccountType.SavingsAccount, transactionId: 2, transactionDate: new Date(2017, 9, 2), transactionAmount: 50.00, note: "Dividend" },
        { accountId: AccountType.SavingsAccount, transactionId: 3, transactionDate: new Date(2017, 9, 3), transactionAmount: -80.00, note: "Groceries" }];

    chequeAccountTransactions: AccountDetails[] = [
        { accountId: AccountType.ChequeAccount, transactionId: 1, transactionDate: new Date(2017, 9, 4), transactionAmount: 15.00, note: "Overtime" },
        { accountId: AccountType.ChequeAccount, transactionId: 2, transactionDate: new Date(2017, 9, 5), transactionAmount: -100.00, note: "Birthday gift" },
        { accountId: AccountType.ChequeAccount, transactionId: 3, transactionDate: new Date(2017, 9, 6), transactionAmount: -90.00, note: "Car insurance" }];

    creditAccountTransactions: AccountDetails[] = [
        { accountId: AccountType.CreditAccount, transactionId: 1, transactionDate: new Date(2017, 9, 7), transactionAmount: -20.00, note: "Groceries" },
        { accountId: AccountType.CreditAccount, transactionId: 2, transactionDate: new Date(2017, 9, 8), transactionAmount: -90.00, note: "Petrol" },
        { accountId: AccountType.CreditAccount, transactionId: 3, transactionDate: new Date(2017, 9, 9), transactionAmount: 200.00, note: "Refund iPad" }];


    constructor(private accountService: AccountService, private router: Router) { }

    getTransactions(accountId: number): AccountDetails[] {
        switch (accountId) {
            case AccountType.SavingsAccount: return this.getSavingsAccountTransactions();
            case AccountType.ChequeAccount: return this.getChequeAccountTransactions();
            case AccountType.CreditAccount: return this.getCreditAccountTransactions();
        }
    }

    getSavingsAccountTransactions(): AccountDetails[] {
        return this.savingAccountTransactions;
    }

    getChequeAccountTransactions(): AccountDetails[] {
        return this.chequeAccountTransactions;
    }

    getCreditAccountTransactions(): AccountDetails[] {
        return this.creditAccountTransactions;
    }

    transferMoney(fromAccountId: AccountType, toAccountId: AccountType, amount: number, transferNote: string) {
        this.createAccountEntry(fromAccountId, amount * -1, transferNote);
        this.createAccountEntry(toAccountId, amount, transferNote);
    }

    createAccountEntry(accountId: AccountType, amount: number, transferNote: string) {
        let entry = new AccountDetails();
        entry.accountId = accountId;
        entry.transactionId = this.getLastTransactionId(accountId);
        entry.transactionDate = new Date();
        entry.transactionAmount = amount;
        entry.note = transferNote;

        switch (accountId) {
            case AccountType.SavingsAccount: this.savingAccountTransactions.push(entry); break;
            case AccountType.ChequeAccount: this.chequeAccountTransactions.push(entry); break;
            case AccountType.CreditAccount: this.creditAccountTransactions.push(entry); break;
        }

        // Update account balance
        this.accountService.updateBalance(accountId, amount);
    }

    getLastTransactionId(accountId: AccountType): number {
        let lastTransactionId = 0;

        switch (accountId) {
            case AccountType.SavingsAccount: 
                lastTransactionId = this.savingAccountTransactions[this.savingAccountTransactions.length - 1].transactionId;
                break;

            case AccountType.ChequeAccount: 
                lastTransactionId = this.chequeAccountTransactions[this.chequeAccountTransactions.length - 1].transactionId;
                break;

            case AccountType.CreditAccount: 
                lastTransactionId = this.creditAccountTransactions[this.creditAccountTransactions.length - 1].transactionId;
                break;
        }        

        return ++lastTransactionId;
    }
}
