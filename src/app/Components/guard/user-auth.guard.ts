import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthGuard implements CanActivate {
  isLooged: boolean = false;
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem('authentication')) {
      this.isLooged = true;
    }
    if (!localStorage.getItem('authentication')) {
      this.isLooged = false;
      this.router.navigate(['./login']);
    }
    return this.isLooged;
  }
}
