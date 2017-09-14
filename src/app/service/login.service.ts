import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class LoginService implements CanActivate {
    isLoggedIn: boolean = false;
    authUser: any;

    constructor(private router: Router) {
        firebase.initializeApp({
            apiKey: "AIzaSyDJ5Wke8FLcyN2trlLX9CjCA59jkMisdVI",
    	    authDomain: "gigabyte-b748f.firebaseapp.com",
            databaseURL: "https://gigabyte-b748f.firebaseio.com",
            storageBucket: "gigabyte-b748f.appspot.com",
            messagingSenderId: "319921928577"
        })
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.verifyLogin(url);
    }

    verifyLogin(url: string): boolean {
        //if (this.isLoggedIn) return true;
        if (this.isLoggedIn)
            this.router.navigateByUrl(url);

        this.router.navigateByUrl('/login');
        return false;
    }
  
    isUserLoggedIn(): boolean {
        this.authUser = firebase.auth().currentUser;
        if (this.authUser) {
            this.isLoggedIn = true;           
        }

        return this.isLoggedIn;
    }

    login(loginEmail: string, loginPassword: string) {
        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
            .catch(function(error) {
                alert(`${error.message} Unable to login. Try again!`);
        });
    }

    logout() {
        this.isLoggedIn = false;

        firebase.auth().signOut().then(function() {            
        },
        function(error) {
            alert(`${error.message} Unable to logout`);
        });
    }
}