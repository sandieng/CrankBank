import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountSummaryComponent } from '../accounts/accountsummary.component';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { ErrorComponent } from '../error/error.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'accountsummary', component: AccountSummaryComponent},
            { path: 'login', component: LoginComponent },
            { path: 'home', component: HomeComponent },
            { path: '', component: HomeComponent },
            { path: '**', component: ErrorComponent },
        ]),
     //   FormsModule,
        CommonModule
    ],
    exports: [ RouterModule ],
    declarations: [AccountSummaryComponent]
})
export class AppRoutingModule {}