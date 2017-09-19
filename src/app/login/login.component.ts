import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  }

  login() {
    this.loginService.login(this.email, this.password);

    if (this.loginService.isUserLoggedIn()) {
      this.isLoggedIn = true;
      this.router.navigateByUrl('/accountsummary');
    }
  }
}
