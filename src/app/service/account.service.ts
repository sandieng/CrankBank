import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Account } from '../model/account';

@Injectable()
export class AccountService {        
    accounts: Account[] = [
        { id: 1, name: 'Savings Account', balance: 1982.12 },
        { id: 2, name: 'Cheque Account', balance: 500.00 },
        { id: 3, name: 'Credit Account', balance: 2391.28 }
      ];
    
    getAccounts(): Account[] {
        return this.accounts;
    }

    getAccount(accountId: number): Account {
        switch (accountId)
        {
            case 1: return this.accounts[0];
            case 2: return this.accounts[1];
            case 3: return this.accounts[2];
        }
    }
}