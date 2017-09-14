import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { LoginService } from '../service/login.service';

@Component({ 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn: boolean = false;
  email: string;
  password: string;

  constructor(private loginService: LoginService, private router: Router ) {}
  
  ngOnInit() {
    this.getLoginStatus();
  }

  getLoginStatus(){
    this.isLoggedIn = this.loginService.isUserLoggedIn();
    
    if (this.isLoggedIn) {
      this.router.navigateByUrl('/accountsummary');
    }

  }

  login() {
    this.loginService.login(this.email, this.password);

    if (this.loginService.isUserLoggedIn()) {
      this.router.navigateByUrl('/accountsummary');
    }
  }
}
