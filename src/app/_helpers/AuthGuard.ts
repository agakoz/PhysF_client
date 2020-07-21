import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot,} from '@angular/router';
import {Injectable} from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root' // ADDED providedIn root here.
})
export class AuthGuard implements CanActivate {
  constructor(private tokenStorage: TokenStorageService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // if (localStorage.getItem('currentUser')) {
    // console.log(this.tokenStorage.getUser())
    if (this.tokenStorage.getUser()) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['login'],{queryParams: { loggedIn: 'false' } } );
    //
    return false;
  }

  // checkLogin(url: string): boolean {
  //   if (this.login.isLoggedIn) {
  //     return true;
  //   }
  //
  //   // Store the attempted URL for redirecting
  //   this.login.redirectUrl = url;
  //
  //   // Navigate to the login page with extras
  //   this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
  //   return false;
  // }
}
