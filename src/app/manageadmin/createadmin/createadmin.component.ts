import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UseraccessService } from 'src/app/_service/useraccess.service';
import { Router } from '@angular/router';
import { CONSTANTS } from 'src/app/_service/constant';
import { HttpParams} from '@angular/common/http';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-createadmin',
  templateUrl: './createadmin.component.html',
  styleUrls: ['./createadmin.component.css'],
  providers: [MessageService]
})
export class CreateadminComponent implements OnInit {
  createadminForm: FormGroup;
  submitted = false; 
  get createadminuser() { return this.createadminForm.controls }
  constructor(private messageService: MessageService,private authservice: UseraccessService) {
    this.createadminForm = new FormGroup({
      admintype: new FormControl('', [Validators.required]),
      adminstatus: new FormControl('', [Validators.required]),
      username:new FormControl('',[Validators.required,Validators.minLength(3)]),
      fullname:new FormControl('',[Validators.required]),
      designation:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.minLength(6)])
    })

    this.createadminForm.patchValue({
      admintype:'Admin'
    })
    this.createadminForm.patchValue({
      adminstatus:'Active'
    })
   }
 
  ngOnInit(): void {
  }
  oncreateSubmit(){
    this.submitted = true;
    if (this.createadminForm.invalid) {
      return;
    }
    else {
console.log('submit admin form',this.createadminForm.value.admintype);

let status;
if(this.createadminForm.value.adminstatus == 'Active'){ status = 0;} else {status = 1;}
const body = new HttpParams()
            .set('admin_type', this.createadminForm.value.admintype)
            .set('username', this.createadminForm.value.username)
            .set('name', this.createadminForm.value.fullname)
            .set('designation', this.createadminForm.value.designation)
            .set('email', this.createadminForm.value.email)
            .set('password', this.createadminForm.value.password)
            .set('status', status);
// api calling 
this.authservice.post(CONSTANTS.createsubadmin,body).subscribe(res=>{
  console.log('admin created successfully',res);
  if(res && res.status == true){
  this.messageService.add({severity:'success', summary: 'Success',detail:res.message});
  }else if(res && res.status == false){
    this.messageService.add({severity:'error', summary: 'Error',detail:res.error});
  }
})
  }

          }

}
