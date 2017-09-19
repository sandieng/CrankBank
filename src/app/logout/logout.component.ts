import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({ 
    template: '',
    styleUrls: []
})
export class LogoutComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router ) {}

  ngOnInit() {
    this.logout();
  }

  logout() {
    this.loginService.logout();

    this.router.navigateByUrl('/home');
  }
}
