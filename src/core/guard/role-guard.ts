import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, RouterState, GuardResult, MaybeAsync } from '@angular/router';
import { Observable } from 'rxjs';
import { CLAIM_KEYS } from '../../app/constant/role';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate{

  constructor(private router: Router){

  }

  canActivate(next: ActivatedRouteSnapshot , state: RouterStateSnapshot ):boolean | Observable<boolean> | Promise<boolean>{
    const exposeRoles: string[] = next.data['roles'];
    const token = localStorage.getItem('accessToken');

    if(!token){
      this.router.navigate(['/login']);
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const userRole = payload[CLAIM_KEYS.ROLE_URL];

    if(exposeRoles.includes(userRole)){
      console.log(exposeRoles)
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false
  }

}