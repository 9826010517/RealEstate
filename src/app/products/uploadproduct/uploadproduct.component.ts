import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UseraccessService } from 'src/app/_service/useraccess.service';
import { Router } from '@angular/router';
import { CONSTANTS } from 'src/app/_service/constant';
import { HttpParams} from '@angular/common/http';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-uploadproduct',
  templateUrl: './uploadproduct.component.html',
  styleUrls: ['./uploadproduct.component.css'],
  providers: [MessageService]
})
export class UploadproductComponent implements OnInit {
  uploadproductForm: FormGroup;
  submitted = false; 
  get uploadproductcontrol() { return this.uploadproductForm.controls }
  constructor(private messageService: MessageService,private authservice: UseraccessService) {
    this.uploadproductForm = new FormGroup({
      adminstatus: new FormControl('', [Validators.required]),
      producttitle:new FormControl('',[Validators.required]),
      productdes:new FormControl('',[Validators.required]),
      baseprice:new FormControl('',[Validators.required]),
      listprice:new FormControl('',[Validators.required])
    })


    this.uploadproductForm.patchValue({
      adminstatus:'Active'
    })
   }

  ngOnInit(): void {
  }
  onFileChanged(event) {
    const file = event.target.files[0];
    console.log('submit /////',file);
  }
  onuploadProduct(){
    this.submitted = true;
    if (this.uploadproductForm.invalid) {
      return;
    }
    else {
console.log('submit admin form',this.uploadproductForm.value);
    }}
}
