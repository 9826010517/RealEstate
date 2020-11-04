import { Injectable } from '@angular/core';
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let userToken = localStorage.getItem('loginkey');
      var userRole = localStorage.getItem('userrole');
      console.log('auth service ///',userRole,'super_admin',next.data.roles.indexOf(userRole));
      if (userToken && userRole) {
        console.log('auth service ++ ',userRole);
           if(next.data.roles && next.data.roles.indexOf(userRole) === -1){
            console.log('auth service ---',userRole);
            this.router.navigate(['']); 
            return false;
           }else{
            return true;
           }
      }
      else {
        this.router.navigate(['/login']);
        return false
      }
  }
  
}
