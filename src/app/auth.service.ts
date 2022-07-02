import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { get, includes, lowerCase, map } from 'lodash';

@Injectable()
export class AuthGuardService implements CanActivate {
  // currentUser = localStorage.getItem('user') ;
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser = localStorage.getItem('user') || '{}';
    const user = JSON.parse(currentUser);
    const accessRoles = map(get(route, 'data.roles', []), lowerCase);

    if (user) {
      if (
        accessRoles.length > 0 &&
        includes(accessRoles, lowerCase(user.permission))
      ) {
        return true;
      }
      this.router.navigate(['/']);
      return false;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
