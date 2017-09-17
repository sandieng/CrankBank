import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { LoginService } from '../service/login.service';

@Component({
    selector: 'navigation-bar',
    templateUrl: './navigationbar.component.html',
    styleUrls: ['./navigationbar.component.css']
})
export class NavigationBarComponent implements OnInit {
    isLoggedIn: boolean;
    subscription: Subscription;

    constructor(private loginService: LoginService, private router: Router ) {}

    ngOnInit() {
        // navigationbar.component is subscribing to LoginService and gets notified of the user logging status.
        // Based on the logging status, navigationbar.component will update the available menus for the user to use.
        this.subscription = this.loginService.getIsUserLoggedIn()
          .subscribe(resp => {
            this.isLoggedIn = resp.isLoggedIn;
    
            this.router.navigateByUrl(resp.url);
          });
      }
}