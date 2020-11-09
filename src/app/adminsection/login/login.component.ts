import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UseraccessService } from 'src/app/_service/useraccess.service';
import { Router } from '@angular/router';
import { CONSTANTS } from 'src/app/_service/constant';
import { HttpParams} from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup; //submit login
  submitted = false; // for home page form validation
  err_msgapi;
  // convenience getter for access to form fields
  get loginuser() { return this.loginForm.controls }

  constructor(private authservice: UseraccessService, private router: Router) { 
    this.err_msgapi = "";
  }

  ngOnInit(): void {
      // homepage login form 
      this.loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        rememberme:new FormControl(''),
      })
      let userToken = localStorage.getItem('loginkey');
      let userRole = localStorage.getItem('userrole');
      if(userToken && userRole){
        this.router.navigate(['/servicelisting']);
      }
  }
  
  onSubmit() {
    this.err_msgapi = "";
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    else {
   console.log('form value',this.loginForm.value )
  //  .set('email', this.loginForm.value.username)
   const body = new HttpParams()
            .set('username', this.loginForm.value.username)
            .set('password', this.loginForm.value.password)
            // this.loginForm.value
   this.authservice.post(CONSTANTS.frontloginapi, body).subscribe((res: any) => {
    if(res && res.status == true){
      // console.log('api final res value -- ',res);
      // localStorage.setItem("loginkey", JSON.stringify(res.data.reg_id));
      // localStorage.setItem("userrole", JSON.stringify(res.data.admin_type));
      // localStorage.setItem("userrole", "Superadmin");
      // this.router.navigate(['']);
    }else{
      console.log('api final res value ++ ',res.error);
      this.err_msgapi = res.error;
    }
   })
  
      
    } }
}
