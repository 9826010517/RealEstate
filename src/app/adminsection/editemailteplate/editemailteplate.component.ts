import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { UseraccessService } from 'src/app/_service/useraccess.service';
import { ShareService } from 'src/app/_service/share.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CONSTANTS } from 'src/app/_service/constant';
import { HttpParams} from '@angular/common/http';
import {MessageService} from 'primeng/api';
declare var $: any;

@Component({
  selector: 'app-editemailteplate',
  templateUrl: './editemailteplate.component.html',
  styleUrls: ['./editemailteplate.component.css'],
  providers: [MessageService]
})

export class EditemailteplateComponent implements OnInit {
  mailbodydata;
  updatemailForm: FormGroup; //submit login
  submitted = false; // for home page form validation
  // convenience getter for access to form fields
  get editmailtemp() { return this.updatemailForm.controls }

  @ViewChild('composetextarea', {static: true}) myInput: ElementRef;
  @ViewChild('smscomposetextarea', {static: true}) mysmsInput: ElementRef;
  constructor(private messageService: MessageService,private router: Router,private shareservice:ShareService,private authservice: UseraccessService) {
    $(function () {
      $('#compose-textarea').summernote()
    })
  }

  ngOnInit(): void {
    // --------------
    this.updatemailForm = new FormGroup({
      mailsubject:new FormControl('', [Validators.required]),
      mailstatus: new FormControl('', [Validators.required]),
      smsstatus: new FormControl('', [Validators.required])
    })

    
    // -------------- obserable call
    this.shareservice.castUser.subscribe(user => {
    if(user == 0){
   this.router.navigate(['/emailtemplate']);
    }else{
      this.mailbodydata = user;
      let activemail:string;
      let activesms:string;
      if(user.emailstatus == 1){
        activemail = 'Active'
      }else if(user.emailstatus == 0){
        activemail = 'Inactive'
      }
      if(user.smsstatus == 1){
        activesms = 'Active'
      }else if(user.smsstatus == 0){
        activesms = 'Inactive'
      }
      console.log('here check 87878788787',this.mailbodydata)
      this.updatemailForm.setValue({
        mailsubject:user.subject,
        mailstatus : activemail,
        smsstatus : activesms
    
      })
    }
    });
    }
    updateEmail(){
      this.submitted = true;
      if (this.updatemailForm.invalid) {
        return;
      }else{      
      let changesmsstatus;
      let changeemailstatus;
      if(this.updatemailForm.value.mailstatus == 'Active'){
        changeemailstatus = '1'
      }else if(this.updatemailForm.value.mailstatus == 'Inactive'){
        changeemailstatus = '0'
      }
      if(this.updatemailForm.value.smsstatus == 'Active'){
        changesmsstatus = '1'
      }else if(this.updatemailForm.value.smsstatus == 'Inactive'){
        changesmsstatus = '0'
      }
      const body = new HttpParams()
      .set('id',this.mailbodydata.id )
      .set('subject',this.updatemailForm.value.mailsubject )
      .set('message',this.myInput.nativeElement.value )
      .set('status',changeemailstatus)
      .set('sms_content',this.mysmsInput.nativeElement.value )
      .set('sms_status',changesmsstatus )
      
this.authservice.post(CONSTANTS.updateemailtemplate, body).subscribe((res: any) => {
if(res && res.status == true){
  this.messageService.add({severity:'success', summary: 'Success',detail:res.message});
}else{

}
})

    }
  }
}
