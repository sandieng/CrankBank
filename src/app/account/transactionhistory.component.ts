import { Component, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { TransactionService } from '../service/transaction.service';
import { TransactionDetails } from '../model/transactiondetails';

@Component({
    selector: 'transaction-history',
    templateUrl: './transactionhistory.component.html',
    styleUrls: ['./transactionhistory.component.css']
})
export class TransactionHistoryComponent implements OnChanges {
    isLoggedIn: boolean;
    accountTransactions: TransactionDetails[];

    // This input object is coming in from accountsummary.component.ts and accountsummary.component.html
    @Input() account: Account;

    constructor(private transactionService: TransactionService,
        private loginService: LoginService,
        private router: Router) { }

    ngOnChanges() {
        // If we use the navigation method, we will grab the account id from the url
        // let urlParams = this.router.url.split('/');
        // this.accountId = +urlParams[2];

        this.getTransactionHistory();
    }

    getTransactionHistory() {
        this.isLoggedIn = this.loginService.isUserLoggedIn();

        if (!this.isLoggedIn) {
            this.router.navigateByUrl('/login');
        } 
        
        this.transactionService.getTransactions(+this.account.id).subscribe(resp => {
            this.accountTransactions = resp;
        })
    }
}
