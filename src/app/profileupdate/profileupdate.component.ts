import { Component, OnInit } from '@angular/core';
import { UseraccessService } from 'src/app/_service/useraccess.service';
import { ShareService } from 'src/app/_service/share.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CONSTANTS } from 'src/app/_service/constant';
import { HttpParams} from '@angular/common/http';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-profileupdate',
  templateUrl: './profileupdate.component.html',
  styleUrls: ['./profileupdate.component.css'],
  providers: [MessageService]
})
export class ProfileupdateComponent implements OnInit {
  updateForm: FormGroup; //submit login
  submitted = false; // for home page form validation
  updatePassword: FormGroup; //submit login
  pupdated = false
  profilearray = []
  apiId;
  apiuserstatus;
  is_updated:boolean = false;
  is_notupdated:boolean = false;;
  passwordMsg;
  get updateform() { return this.updateForm.controls }
  get changedpassword() { return this.updatePassword.controls }
  constructor(private messageService: MessageService,private shareservice:ShareService,public authservice: UseraccessService) { }

  ngOnInit(): void {
    this.updatePassword = new FormGroup({
      currentpassword: new FormControl('', [Validators.required]),
      newpassword: new FormControl('', [Validators.required,Validators.minLength(6)]),
      confirmpassword:new FormControl('', [Validators.required,,Validators.minLength(6)]),
    })

    this.updateForm = new FormGroup({
      fullname: new FormControl('', [Validators.required,Validators.minLength(3)]),
      username: new FormControl('', [Validators.required,Validators.minLength(3)]),
      email:new FormControl('', [Validators.required,,Validators.email]),
      designation:new FormControl('', [Validators.required])
    })

    this.authservice.userprofile.subscribe(res=>{
      console.log('we workin now.....');
      this.profilearray= [];
      if(res ){
        this.profilearray.push(res);
        this.apiId = this.profilearray[0].id;
        this.apiuserstatus = this.profilearray[0].admin_type;
          this.updateForm.setValue({
            fullname:this.profilearray[0].name,
            username:this.profilearray[0].username,
            email:this.profilearray[0].email,
            designation:this.profilearray[0].designation
          })
         console.log('data reposce /////////////////////',res);
      }
    })
  }

  changePassword(){
    this.is_updated = false;
    this.is_notupdated = false;
    this.pupdated = true;
    if (this.updatePassword.invalid) {
      return;
    }else{
      const body = new HttpParams()
      .set('id', this.profilearray[0].id)
      .set('old_password', this.updatePassword.value.currentpassword)
      .set('new_password', this.updatePassword.value.newpassword)
      .set('confirm_password', this.updatePassword.value.confirmpassword)
      this.authservice.post(CONSTANTS.changepassword, body).subscribe((res: any) => {  
        console.log('password changed',res);
        if(res && res.status == true){this.passwordMsg = res.message;   console.log('password changed',res.message); this.is_updated = true;}
        else if(res && res.status == false){this.passwordMsg = res.error;   console.log('password changed',res.error); this.is_notupdated = true; }
        })
    }
  }

  onUpdate(){
    this.submitted = true;
    if (this.updateForm.invalid) {
      return;
    }else{
      const body = new HttpParams()
            .set('id',  this.apiId)
            .set('name', this.updateForm.value.fullname)
            .set('username', this.updateForm.value.username)
            .set('designation', this.updateForm.value.designation)
            .set('email', this.updateForm.value.email)
            .set('admin_type', this.apiuserstatus)      
            this.authservice.post(CONSTANTS.updateadminprofile, body).subscribe((res: any) => {
              if(res && res.status == true){
                this.profilearray= [];
              
                let updateddata = {
                 name:this.updateForm.value.fullname,
                 username:this.updateForm.value.username,
                 email:this.updateForm.value.email,
                 designation:this.updateForm.value.designation,
                 id: this.apiId,
                 admin_type: this.apiuserstatus
               }
               this.profilearray.push(updateddata);
               localStorage.setItem("userprofile", JSON.stringify(updateddata));
               this.authservice.userprofile.next(JSON.parse(localStorage.getItem('userprofile')));
               this.messageService.add({severity:'success', summary: 'Success',detail:res.message});
               console.log('data ------99',this.updateForm);
              }else if(res && res.status == false){
                this.messageService.add({severity:'error', summary: 'Error',detail:res.error});
              }
            })
      
    }
    
  }
}
