import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular Bank';
  isLoggedIn: boolean;
  subscription: Subscription;

  constructor(private loginService: LoginService, private router: Router ) {}


  ngOnInit() {
    //this.isLoggedIn =  this.loginService.isUserLoggedIn();
    this.subscription = this.loginService.getIsUserLoggedIn()
      .subscribe(resp => {
        this.isLoggedIn = resp.isLoggedIn;

        this.router.navigateByUrl(resp.url);
      });
  }
}
