import { Component, OnInit,ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { UseraccessService } from 'src/app/_service/useraccess.service';
import { CONSTANTS } from 'src/app/_service/constant';
import { HttpParams} from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MessageService} from 'primeng/api';

export interface PeriodicElement {
  Regid: string;
  username: number;
  contactinfo: number;
  emailid: string;
  address: string;
  country: string;
  dob: string;
  gender: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [];
// var ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [MessageService]
})
export class HomepageComponent implements OnInit {
  modalRef: BsModalRef;
  submitted = false; 
  editForm: FormGroup; //submit edit
  editvalueIndex;
 deletevalueIndex;
 deleteuserId;
 is_confirm = false;

  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['Regid', 'username', 'contactinfo', 'emailid','address','country','dob','gender','fordeletekey','foreditkey'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  get editnewuser() { return this.editForm.controls }

  constructor(private messageService: MessageService,private modalService: BsModalService,private authservice: UseraccessService) {
    console.log('contest')
    this.authservice.loggeduser.subscribe(res=>{
    console.log('my rs test',res);
  }) 
  this.authservice.isloggdin.subscribe(res=>{
    console.log('my rs isloggdin',res);
  }) 
  }

  ngOnInit(): void {
    
    // , disabled: true
      this.editForm = new FormGroup({
      regid: new FormControl({value: '',disabled: true}, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      contact:new FormControl('', [Validators.required]),
      email:new FormControl('', [Validators.required]),
      address:new FormControl('', [Validators.required]),
      country:new FormControl('', [Validators.required]),
      dob:new FormControl('', [Validators.required]),
      gender:new FormControl('', [Validators.required])

      })
  
    this.authservice.get(CONSTANTS.tabledataapi).subscribe((res: any) => {
      res.map(value=>{
        let userVal = {
          Regid : value.reg_id,
          username:value.name,
          contactinfo:value.mobile_no,
          emailid:value.email,
          address:value.address,
          country: value.country,
          dob: value.dob,
          gender: value.gender
        }
        this.ELEMENT_DATA.push(userVal);
        
      })
      this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  Deletedata(dialogmodal,val,index){
    this.modalRef = this.modalService.show(dialogmodal);
    this.deleteuserId = val;
   this.deletevalueIndex = index;
  }
  onConfirm(){
    this.is_confirm = true;
    const body = new HttpParams()
    .set('reg_id', this.deleteuserId )
    this.authservice.post(CONSTANTS.deleteapi,body).subscribe((res: any) => {
    console.log('check res',res)
    if(res && res.status == true){
      this.dataSource.data.splice( this.deletevalueIndex, 1);
      this.dataSource._updateChangeSubscription();
      this.modalRef.hide();
      this.messageService.add({severity:'success', summary: 'Success',detail:'User Deleted Successfully'});
      this.is_confirm = false;
    }
    })
  }

  onReject(){
    this.modalRef.hide();
  }
  Editdata(val,indexval,template){
    this.editvalueIndex = indexval;
    this.editForm.setValue({
      regid: this.dataSource.data[indexval].Regid,
      name: this.dataSource.data[indexval].username,
      contact:this.dataSource.data[indexval].contactinfo,
      email:this.dataSource.data[indexval].emailid,
      address:this.dataSource.data[indexval].address,
      country:this.dataSource.data[indexval].country,
      dob:this.dataSource.data[indexval].dob,
      gender:this.dataSource.data[indexval].gender
    })
    
    this.modalRef = this.modalService.show(template,Object.assign({}, { class: 'modal-lg-test' }));

  }
 
  onEdit(){
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }else{
      const body = new HttpParams()
      .set('reg_id', this.editForm.getRawValue().regid)
      .set('name', this.editForm.value.name)
      .set('mobile_no', this.editForm.value.contact)
      .set('address', this.editForm.value.address)
      .set('dob', this.editForm.value.dob)
      .set('gender', this.editForm.value.gender)
      .set('country', this.editForm.value.country)
      .set('email', this.editForm.value.email)
      console.log('ll',this.editForm.getRawValue().regid);

      this.authservice.post(CONSTANTS.editapi,body).subscribe((res: any) => {
        console.log('check res',res)
        if(res && res.status == true){
          console.log('check res success',res,this.editvalueIndex);
          this.dataSource.data[this.editvalueIndex].Regid = this.editForm.getRawValue().regid;
          this.dataSource.data[this.editvalueIndex].username = this.editForm.value.name;
          this.dataSource.data[this.editvalueIndex].contactinfo = this.editForm.value.contact;
          this.dataSource.data[this.editvalueIndex].emailid = this.editForm.value.email;
          this.dataSource.data[this.editvalueIndex].address = this.editForm.value.address;
          this.dataSource.data[this.editvalueIndex].country = this.editForm.value.country;
          this.dataSource.data[this.editvalueIndex].dob = this.editForm.value.dob;
          this.dataSource.data[this.editvalueIndex].gender = this.editForm.value.gender;
          this.modalRef.hide();
          this.messageService.add({severity:'success', summary: 'Success',detail:'User Detail Updated Successfully'});
        }
    
        })
     
    }

  }
}

