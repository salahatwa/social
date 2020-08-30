import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

import { take, map } from 'rxjs/operators';
import { UserService } from './../../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate , CanActivateChild{
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.isAuthenticated.pipe(take(1), map(isAuth => { 
      if(isAuth)
        return true;
        else{
          this.router.navigate(['/auth']);
          return false;
        }
   }));
  }  

   canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
console.log("sss");
  return this.userService.isAuthenticated.pipe(take(1), map(isAuth => { 
    if(isAuth)
      {
      return true;
      }
      else{
        this.router.navigate(['/auth']);
        return false;
      }
    }));
  
  }
}
