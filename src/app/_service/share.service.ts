import { Injectable } from '@angular/core';
import {BehaviorSubject,Subject} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor( private router: Router) { }
  // private user = new BehaviorSubject<string>('john');
  // castUser = this.user.asObservable();
 // this.user.next('mohit'); 
  private user = new BehaviorSubject<any>('0');
  castUser = this.user.asObservable();

  private admindata =  new BehaviorSubject<any>('0');
    updateadmin  = this.admindata.asObservable();
  editUser(edittemp){
    this.user.next(edittemp);
    this.router.navigate(['/editemail']) 
  }
  updateAdmin(editadmin){
    // this.updateadmin.next('');
    this.admindata.next(editadmin);
    this.router.navigate(['/updateadmin'])
  }
}
