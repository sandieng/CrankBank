import { Component, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { LoginService } from '../service/login.service';
import { TransactionService } from '../service/transaction.service';
import { AccountDetails } from '../model/accountdetails';

@Component({
    selector: 'transaction-history',
    templateUrl: './transactionhistory.component.html',
    styleUrls: ['./transactionhistory.component.css']
})
export class TransactionHistoryComponent implements OnChanges {
    isLoggedIn: boolean;
    accountTransactions: AccountDetails[];

    // These input object is coming in from accountsummary.component
    @Input() account: Account;

    constructor(private transactionService: TransactionService,
        private loginService: LoginService,
        private router: Router) { }

    ngOnChanges() {
        // let urlParams = this.router.url.split('/');
        // this.accountId = +urlParams[2];

        this.getTransactionHistory();
    }

    getTransactionHistory() {
        this.isLoggedIn = this.loginService.isUserLoggedIn();

        if (!this.isLoggedIn) {
            this.router.navigateByUrl('/login');
        } this.isLoggedIn = this.loginService.isUserLoggedIn();

        this.accountTransactions = this.transactionService.getTransactions(+this.account.id);
    }

    transactionDescription(transactionId: number) {
        this.isLoggedIn = this.loginService.isUserLoggedIn();

        if (!this.isLoggedIn) {
            this.router.navigateByUrl('/login');
        }

        let transaction = this.accountTransactions.filter(x => x.transactionId === transactionId);

        alert(transaction[0].note);
    }
}
