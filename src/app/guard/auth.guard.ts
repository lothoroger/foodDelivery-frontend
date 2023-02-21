import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

 public isLoggedIn: boolean = false;
 public redirectUrl: string | undefined;
 IsAdmin?: string | null;
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     this.IsAdmin = localStorage.getItem("IsAdmin")
     console.log("On Authgaurd IsAdmin ", this.IsAdmin)
      if (this.IsAdmin == "true") {
      return true;
      } else {
        return false;
      }
    }

  

}
