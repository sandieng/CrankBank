import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Account } from '../model/account';
import { AccountType } from '../enum/accounttype';
 
@Injectable()
export class AccountService {        
    accounts: Account[] = [
        { id: AccountType.SavingsAccount, name: 'Savings Account', balance: 1000.00 },
        { id: AccountType.ChequeAccount, name: 'Cheque Account', balance: 500.00 },
        { id: AccountType.CreditAccount, name: 'Credit Account', balance: 300.00 }
      ];
    
    getAccounts(): Account[] {
        return this.accounts;
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

    updateBalance(accountId: AccountType, amount: number) {
        let accountToUpdate = this.accounts.filter(x => x.id === accountId)[0];
        accountToUpdate.balance +=  amount;
    }
}