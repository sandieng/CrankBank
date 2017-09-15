import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as firebase from 'firebase';
import { Observable, Subject } from 'rxjs/Rx';
import { NextRoute } from '../model/nextroute';

@Injectable()
export class LoginService implements CanActivate {
    isLoggedIn: boolean = false;
    authUser: any;

    nextRoute = new Subject<NextRoute>();

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

    getIsUserLoggedIn(): Observable<NextRoute> {
        return this.nextRoute.asObservable();
    }

    isUserLoggedIn(): boolean {
        this.authUser = firebase.auth().currentUser;

        if (this.authUser) {
            this.isLoggedIn = true;
        }
        else {
            this.isLoggedIn = false;
        }

        return this.isLoggedIn;
    }

    login(loginEmail: string, loginPassword: string) {
        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
            .then(() => {
                let next = new NextRoute();
                
                this.gotoNext(next);
             
                this.nextRoute.next(next);
            })
            .catch(function (error) {
                alert(`${error.message} Unable to login. Try again!`);
            });
    }

    logout() {
        firebase.auth().signOut()
            .then(() => {
                let next = new NextRoute();
                            
                this.gotoNext(next);

                this.nextRoute.next(next);
            },
            function (error) {
                alert(`${error.message} Unable to logout`);
            });
    }

    gotoNext(next: NextRoute) {
        if (this.isUserLoggedIn()) {
            next.isLoggedIn = true;
            next.url = '/accountsummary';
        }
        else {
            next.isLoggedIn = false;
            next.url = '/home';
        }
    }
}