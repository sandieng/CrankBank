import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as firebase from 'firebase';
import { Observable, Subject } from 'rxjs/Rx';
import { NextRoute } from '../model/nextroute';
import { AccountDetails } from '../model/accountdetails';

@Injectable()
export class TransactionService {        
    getTransactions(accountId: number): AccountDetails[] {
        switch (accountId)
        {
            case 1: return this.getSavingsAccountTransactions();
            case 2: return this.getChequeAccountTransactions();
            case 3: return this.getCreditAccountTransactions();
        }
    }

    getSavingsAccountTransactions(): AccountDetails[] {
        let savingAccountTransactions: AccountDetails[] = [ 
            { accountId: 1, transactionId: 1, transactionDate: new Date(2017, 9, 1), transactionAmount: 100.00, note: "Salary"},
            { accountId: 1, transactionId: 2, transactionDate: new Date(2017, 9, 2), transactionAmount: 50.00, note: "Dividend"},
            { accountId: 1, transactionId: 3, transactionDate: new Date(2017, 9, 3), transactionAmount: -80.00, note: "Groceries"} ];

        return savingAccountTransactions;
    }

    getChequeAccountTransactions(): AccountDetails[] {
        let chequeAccountTransactions: AccountDetails[] = [ 
            { accountId: 2, transactionId: 1, transactionDate: new Date(2017, 9, 4), transactionAmount: 15.00, note: "Overtime"},
            { accountId: 2, transactionId: 2, transactionDate: new Date(2017, 9, 5), transactionAmount: -100.00, note: "Birthday gift"},
            { accountId: 2, transactionId: 3, transactionDate: new Date(2017, 9, 6), transactionAmount: -90.00, note: "Car insurance"} ];

        return chequeAccountTransactions;
    }

    getCreditAccountTransactions(): AccountDetails[] {
        let creditAccountTransactions: AccountDetails[] = [ 
            { accountId: 3, transactionId: 1, transactionDate: new Date(2017, 9, 7), transactionAmount: -20.00, note: "Groceries"},
            { accountId: 3, transactionId: 2, transactionDate: new Date(2017, 9, 8), transactionAmount: -90.00, note: "Petrol"},
            { accountId: 3, transactionId: 3, transactionDate: new Date(2017, 9, 9), transactionAmount: 200.00, note: "Refund iPad"} ];

        return creditAccountTransactions;
    }
}