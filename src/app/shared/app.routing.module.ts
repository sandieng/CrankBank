import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountSummaryComponent } from '../account/accountsummary.component';
import { TransactionHistoryComponent } from '../account/transactionhistory.component';
import { TransferMoneyComponent } from '../account/transfermoney.component';
import { LoginComponent } from '../login/login.component';
import { LogoutComponent } from '../logout/logout.component';
import { HomeComponent } from '../home/home.component';
import { ErrorComponent } from '../error/error.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'accountsummary', component: AccountSummaryComponent},
            { path: 'transactionhistory/:accountId', component: TransactionHistoryComponent},
            { path: 'transfermoney', component: TransferMoneyComponent },
            { path: 'login', component: LoginComponent },
            { path: 'logout', component: LogoutComponent },
            { path: 'home', component: HomeComponent },
            { path: '', component: HomeComponent },
            { path: '**', component: ErrorComponent },
        ]),
        FormsModule,
        CommonModule
    ],
    exports: [ RouterModule ],
    declarations: [AccountSummaryComponent, TransactionHistoryComponent, TransferMoneyComponent ]
})
export class AppRoutingModule {}