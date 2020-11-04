import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UseraccessService } from 'src/app/_service/useraccess.service';
import { CONSTANTS } from 'src/app/_service/constant';
import { HttpParams} from '@angular/common/http';
@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.css']
})
export class ContactformComponent implements OnInit {
  contactusForm:FormGroup;
  submitted = false;
  formmsg = "";
  get contactvalidation() { return this.contactusForm.controls}
    
  constructor(private userservice : UseraccessService) {
    this.contactusForm = new FormGroup({
      enquiryName    : new FormControl('',[Validators.required]),
      enquiryEmail   : new FormControl('',[Validators.required,Validators.email]),
      enquiryContact : new FormControl('',[Validators.required]),
      enquiryDetail  : new FormControl('',[Validators.required])
}) 
   }

  ngOnInit(): void {
  }
  enquirySubmit(){
    this.submitted = true;
    this.formmsg = "";
    if (this.contactusForm.invalid) {
      return;
    }else{
      const body = new HttpParams()
            .set('name', this.contactusForm.value.enquiryName)
            .set('email', this.contactusForm.value.enquiryEmail)
            .set('phone_no', this.contactusForm.value.enquiryContact)
            .set('description', this.contactusForm.value.enquiryDetail)
   
            this.userservice.post(CONSTANTS.frontcontactform, body).subscribe((res: any) => {
              if(res && res.status == true ){
              this.contactusForm.reset();
              this.submitted = false;
              this.formmsg = res.message;
              }
            });
    }
    
  }

}
