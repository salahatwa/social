import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { map, distinctUntilChanged } from 'rxjs/operators';
import { User } from '../models/user.model';
import { ApiService } from './../../shared/services/api.service';
import { JwtService } from './../../shared/services/auth/jwt.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private router: Router,
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/auth/me')
        .subscribe(
          data => {this.setAuth(data);
        },
          err => {
            this.purgeAuth();
          }
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.accessToken);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(credentials): Observable<any> {
    return this.apiService.post('/auth/login', credentials)
      .pipe(map(
        data => {
          this.setAuth(data);
          return data;
        }
      ));
  }

  signUp(credentials): Observable<User> {
    return this.apiService.post('/auth/signup', credentials)
      .pipe(map(
        data => {
          this.setAuth(data);
          return data;
        }
      ));
  }


  initTwitter(path:string): Observable<any> {
    return this.apiService.get(path)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }

  initLinkedIn(path:string): Observable<any> {
    return this.apiService.get(path)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }


  verifyLinkedIn(path:string,oauth_token: string): Observable<any> {
    return this.apiService.post(path, {
      requestToken: oauth_token,
      oauthVerifier: ''
    })
      .pipe(map(
        data => {
          this.setAuth(data);
          return data;
        }
      ));
  }

  verifyTwitter(path:string,oauth_token: string, oauth_verifier: string): Observable<any> {
    return this.apiService.post(path, {
      requestToken: oauth_token,
      oauthVerifier: oauth_verifier
    })
      .pipe(map(
        data => {
          this.setAuth(data);
          console.log(data);
          return data;
        }
      ));
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  logout() {
    this.purgeAuth();
    this.router.navigate(['/auth']);
  }


}
