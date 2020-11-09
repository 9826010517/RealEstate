import { Component, OnInit,AfterViewInit,ChangeDetectorRef } from '@angular/core';
import { UseraccessService } from 'src/app/_service/useraccess.service';
import { CONSTANTS } from 'src/app/_service/constant';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, FormBuilder ,Validators } from '@angular/forms';
import { HttpParams} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {Router,ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-cmsfaq',
  templateUrl: './cmsfaq.component.html',
  styleUrls: ['./cmsfaq.component.css'],
  providers: [MessageService]
})
export class CmsfaqComponent implements OnInit,AfterViewInit {
  isFirstOpen = true;
  oneAtATime: boolean = true;
  faqquestion = [];
  modalRef: BsModalRef;
  // editfaqForm: FormGroup; 
  editfaqForm;
  createfaqForm;
  submitted = false; // for home page form validation
  faqsubmitted = false;

  apiid;
  apiIndex;
  quefaqtype;
  testimonialUrl;
  // showmodeldata;
    // convenience getter for access to form fields
    get faqerror() { return this.editfaqForm.controls }
    get faqcreateerror(){return this.createfaqForm.controls}
  constructor(private activateroute:ActivatedRoute ,private fb:FormBuilder,private messageService: MessageService,private modalService: BsModalService,private cdRef:ChangeDetectorRef,private authservice: UseraccessService) {
  
   }

  ngOnInit(): void {

    this.createfaqForm = this.fb.group({
      faqtitle:['',Validators.required],
      faqcreatestatus:['',Validators.required],
      faqdiscription:['',Validators.required],
      designation:['']
    })
    this.editfaqForm = this.fb.group({
      question:['',Validators.required],
      discription:['',Validators.required],
      faqstatus:['',Validators.required],
      editdesignation:['']
    })

 


   this.activateroute.queryParams.subscribe(res => {
    this.testimonialUrl = res['faqpage'];
     if(this.testimonialUrl == "testimonial"){
      this.authservice.get(CONSTANTS.fronttestimonial).subscribe((res: any) => {
        this.faqquestion = [];
        res.map(value => {
          this.faqquestion.push(value);
        })
      
        this.cdRef.detectChanges();
      })
     }
     else if(this.testimonialUrl == "faqquestion"){
        this.authservice.get(CONSTANTS.frontfaq).subscribe((res: any) => {
          this.faqquestion = [];
          res.map(value => {
            this.faqquestion.push(value);
          })
          
          this.cdRef.detectChanges();
        })
     }
   })

  }
  Editfaq(faqtype,indexid,id,faqeditmodal){
    this.submitted = false;
    this.faqsubmitted = false;
    this.modalRef = this.modalService.show(faqeditmodal);
    this.apiid = id;
    this.apiIndex = indexid;
    this.quefaqtype = faqtype;
    
    if( faqtype == 'newfaq' || faqtype ==  'editfaq'){ 
       this.editfaqForm.setControl('editdesignation', this.fb.control(''));
       this.createfaqForm.setControl('designation', this.fb.control(''));
      
      }
    else if(faqtype == 'newtestimonials' || faqtype == 'edittestimonial'){  
      this.createfaqForm.setControl('designation', this.fb.control('', [Validators.required]));
      this.editfaqForm.setControl('editdesignation', this.fb.control('', [Validators.required]));
    }
    
    if( faqtype == 'newfaq' || faqtype == 'newtestimonials'){ 
      this.createfaqForm.patchValue({
        faqcreatestatus: 0
      })
    }
   else if(faqtype == 'editfaq'){
     this.editfaqForm.setValue({
      question:this.faqquestion[indexid].question,
      discription: this.faqquestion[indexid].description,
      faqstatus:  this.faqquestion[indexid].status,
      editdesignation:''
    })
                     }
                   else if(faqtype == 'edittestimonial'){
                      this.editfaqForm.setValue({
                        question:this.faqquestion[indexid].name,
                        discription: this.faqquestion[indexid].content,
                        faqstatus: this.faqquestion[indexid].is_status,
                        editdesignation: this.faqquestion[indexid].designation
                      })
                     }
  }
  ngAfterViewInit() {
   
  }
  onfaqSubmit(){
    this.faqsubmitted = true;
     if(this.createfaqForm.invalid){ return } 
     else if(this.testimonialUrl == "faqquestion") { 
     const body = new HttpParams()
     .set('question', this.createfaqForm.value.faqtitle)
     .set('description', this.createfaqForm.value.faqdiscription)
     .set('status', this.createfaqForm.value.faqcreatestatus )
     this.authservice.post(CONSTANTS.admincreatefaq, body).subscribe((res: any) => {
      if(res && res.status == true){ 
        let newfaq = {
          id:res.id,
          question:this.createfaqForm.value.faqtitle,
          description:this.createfaqForm.value.faqdiscription,
          status: this.createfaqForm.value.faqcreatestatus
        }
        this.faqquestion.unshift(newfaq);
        this.createfaqForm.reset();
        this.faqsubmitted = false;
        this.messageService.add({severity:'success', summary: 'Success',detail:res.message});
        this.createfaqForm.patchValue({
          faqcreatestatus: 0
        })
      }
      else if(res && res.status == false){
        this.messageService.add({severity:'error', summary: 'Error',detail:res.error});
      }
     })
      
     }else if(this.testimonialUrl == "testimonial"){
      const body = new HttpParams()
      .set('name', this.createfaqForm.value.faqtitle)
      .set('designation', this.createfaqForm.value.designation)
      .set('status', this.createfaqForm.value.faqcreatestatus )
      .set('content', this.createfaqForm.value.faqdiscription )
    
      this.authservice.post(CONSTANTS.admincreatetestimon, body).subscribe((res: any) => {
       if(res && res.status == true){ 
        let newfaq = {
          id:res.id,
          name:this.createfaqForm.value.faqtitle,
          content:this.createfaqForm.value.faqdiscription,
          is_status: this.createfaqForm.value.faqcreatestatus,
          designation:this.createfaqForm.value.designation
        }
        this.faqquestion.unshift(newfaq);
        this.createfaqForm.reset();
        this.faqsubmitted = false;
        this.messageService.add({severity:'success', summary: 'Success',detail:res.message});
        this.createfaqForm.patchValue({
          faqcreatestatus: 0
        })
      
       }  else if(res && res.status == false){
        this.messageService.add({severity:'error', summary: 'Error',detail:res.error});
      }
      
      });

     }
  }

  onfaqeditSubmit(){
    this.submitted = true;
    if (this.editfaqForm.invalid) {
      return;
    }
    else if(this.testimonialUrl == 'faqquestion'){
      const body = new HttpParams()
      .set('id',  this.apiid )
      .set('question', this.editfaqForm.value.question)
      .set('description', this.editfaqForm.value.discription)
      .set('status',  this.editfaqForm.value.faqstatus)
      this.authservice.post(CONSTANTS.adminupdatefaq, body).subscribe((res: any) => {
        if(res && res.status == true){
          this.faqquestion[this.apiIndex].question = this.editfaqForm.value.question;
          this.faqquestion[this.apiIndex].description = this.editfaqForm.value.discription;
          this.faqquestion[this.apiIndex].status = this.editfaqForm.value.faqstatus;
          this.modalRef.hide()
          this.messageService.add({severity:'success', summary: 'Success',detail:res.message});
        } else if(res && res.status == false){
          this.messageService.add({severity:'error', summary: 'Error',detail:res.error});
        }
      })
    
    }
    else if(this.testimonialUrl == 'testimonial'){
      const body = new HttpParams()
      .set('id',  this.apiid )
      .set('name', this.editfaqForm.value.question)
      .set('designation', this.editfaqForm.value.editdesignation)
      .set('status', this.editfaqForm.value.faqstatus )
      .set('content', this.editfaqForm.value.discription )
    
      this.authservice.post(CONSTANTS.adminedittestimon, body).subscribe((res: any) => {
        if(res && res.status == true){
          this.faqquestion[this.apiIndex].name = this.editfaqForm.value.question;
          this.faqquestion[this.apiIndex].content = this.editfaqForm.value.discription;
          this.faqquestion[this.apiIndex].is_status = this.editfaqForm.value.faqstatus;
          this.faqquestion[this.apiIndex].designation = this.editfaqForm.value.editdesignation;
          this.modalRef.hide()
          this.messageService.add({severity:'success', summary: 'Success',detail:res.message});
        } else if(res && res.status == false){
          this.messageService.add({severity:'error', summary: 'Error',detail:res.error});
        }
      })
    }
  }
  onfaqDelete(verify){
   
   if(verify == 'faqdelete'){
    const body = new HttpParams()
    .set('id',  this.apiid )
    this.authservice.post(CONSTANTS.admindeletefaq, body).subscribe((res: any) => {
      if(res && res.status == true){
        this.faqquestion.splice(this.apiIndex,1);
        this.modalRef.hide();
        this.messageService.add({severity:'success', summary: 'Success',detail:res.message});
         } 
         else if(res && res.status == false){
          this.messageService.add({severity:'error', summary: 'Error',detail:res.error});
         }
      })
   }else if(verify == 'testimonialdelete'){
     const body = new HttpParams()
    .set('id',  this.apiid )
    this.authservice.post(CONSTANTS.admindeletetestimon, body).subscribe((res: any) => {
      if(res && res.status == true){
        this.faqquestion.splice(this.apiIndex,1);
        this.modalRef.hide();
        this.messageService.add({severity:'success', summary: 'Success',detail:res.message});
         } 
         else if(res && res.status == false){
          this.messageService.add({severity:'error', summary: 'Error',detail:res.error});
         }
      })
   }
   else if(verify == 'rejectdelete'){
      this.modalRef.hide();
    
    }
  }
}
