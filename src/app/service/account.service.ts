import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
//import * as firebase from 'firebase';
import { Account } from '../model/account';
import { AccountType } from '../enum/accounttype';

 
@Injectable()
export class AccountService {        
    ACCOUNT_BASE_URL = 'http://localhost:10631/api/accounts';

    constructor(private accountService: Http) {}

    // accounts: Account[] = [
    //     { id: AccountType.SavingsAccount, name: 'Savings Account', balance: 1000.00 },
    //     { id: AccountType.ChequeAccount, name: 'Cheque Account', balance: 500.00 },
    //     { id: AccountType.CreditAccount, name: 'Credit Account', balance: 300.00 }
    //   ];
    accounts: Account[];
    
    getAccounts(): Observable<Account[]> {
        return this.accountService.get(this.ACCOUNT_BASE_URL)
            .map(resp => <Account[]> resp.json())
            .catch(err => Observable.throw(err));
    }

    getAccount(accountId: AccountType): Account {
        switch (accountId)
        {
            case AccountType.SavingsAccount: return this.accounts[0];
            case AccountType.ChequeAccount: return this.accounts[1];
            case AccountType.CreditAccount: return this.accounts[2];
        }
    }

    getAccountType(accountId: number): string {
        switch (accountId)
        {
            case AccountType.SavingsAccount: return 'Savings Account';
            case AccountType.ChequeAccount: return 'Cheque Account';
            case AccountType.CreditAccount: return 'Credit Account';
        }
    }

    updateBalance(accountId: AccountType, amount: number): Observable<Account> {
        // let accountToUpdate = this.accounts.filter(x => x.id === accountId)[0];
        // accountToUpdate.balance +=  amount;
        let updateDetails = new accountUpdate(accountId, amount);

        return this.accountService.post(this.ACCOUNT_BASE_URL, updateDetails)
                .map(resp => {
                   return <Account> resp.json();
                })
                .catch(err => Observable.throw(err));
    }
}

class accountUpdate {
    accountId: AccountType;
    amount: number;

    constructor(accountId: AccountType, amount: number) {
        this.accountId = accountId;
        this.amount = amount;
    }
}