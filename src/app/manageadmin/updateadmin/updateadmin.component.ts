import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CONSTANTS } from 'src/app/_service/constant';
import { HttpParams} from '@angular/common/http';
import { UseraccessService } from 'src/app/_service/useraccess.service';
import { ShareService } from 'src/app/_service/share.service';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-updateadmin',
  templateUrl: './updateadmin.component.html',
  styleUrls: ['./updateadmin.component.css'],
  providers: [MessageService]
})
export class UpdateadminComponent implements OnInit {
  updateadminForm: FormGroup;
  submitted = false; 
  updateid;
  passworderrmsg;
  get updateadminform() { return this.updateadminForm.controls }
  constructor(private messageService: MessageService,private router:Router,private shareservice:ShareService,private authservice: UseraccessService) { 
  }

  ngOnInit(): void {
    // Form Schema
    this.updateadminForm = new FormGroup({
      admintype: new FormControl('', [Validators.required]),
      adminstatus: new FormControl('', [Validators.required]),
      username:new FormControl('',[Validators.required,Validators.minLength(3)]),
      fullname:new FormControl('',[Validators.required]),
      designation:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('')
    })

    this.shareservice.updateadmin.subscribe(res=>{
          // return if user data not availabe
      if(res == 0){
        this.router.navigate(['/adminmanage']);
      }else{
        // set value for update form
        let activestatus;
        if(res.adminstatus == 0){ activestatus = "Active"} else { activestatus = "Inactive" }
         this.updateid = res.id;
        console.log('mytesting',res);
           this.updateadminForm.setValue({
            admintype:res.admintype,
            adminstatus:activestatus ,
            username:res.username  ,
            fullname:res.name  ,
            designation:res.designation ,
            email:res.email ,
            password:''
         })
      }
    })
  }
  // function for execute form
  submitadmindata(){   
  let status;
  if(this.updateadminForm.value.adminstatus == 'Active'){ status = 0;} else {status = 1;}
  const body = new HttpParams()
              .set('id', this.updateid)
              .set('admin_type', this.updateadminForm.value.admintype)
              .set('username', this.updateadminForm.value.username)
              .set('name', this.updateadminForm.value.fullname)
              .set('designation', this.updateadminForm.value.designation)
              .set('email', this.updateadminForm.value.email)
              .set('password', this.updateadminForm.value.password)
              .set('status', status);
              console.log('check status',status)
  // api calling 
  this.authservice.post(CONSTANTS.updatebysuperadmin,body).subscribe(res=>{
    console.log('admin updated successfully',res);
    if(res && res.status == true){
    this.messageService.add({severity:'success', summary: 'Success',detail:res.message});
    }else if(res && res.status == false)
    { this.messageService.add({severity:'error', summary: 'Error',detail:res.error});}
  })
}
// function for extra validation on password field
testone(){
  this.passworderrmsg = "";
  if(this.updateadminForm.value.password.length>0 && this.updateadminForm.value.password.length <6){
    this.passworderrmsg = "Enter minium 6 charector"
  }
}

// Fianl form submit method

  updateadminSubmit(){
    this.submitted = true;
    if (this.updateadminForm.invalid) {
      return;
    }
    else {
       if(this.updateadminForm.value.password.length>0 && this.updateadminForm.value.password.length <6){
        this.passworderrmsg = "Enter minium 6 charector"
        console.log('submit admin form 2 ',this.updateadminForm.value.password.length );
      }else{
        this.submitadmindata();
      }
    }
  }
}
