import { Component, OnInit,AfterViewInit,ChangeDetectorRef } from '@angular/core';
import { UseraccessService } from 'src/app/_service/useraccess.service';
import { CONSTANTS } from 'src/app/_service/constant';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpParams} from '@angular/common/http';
import {MessageService} from 'primeng/api';
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
  editfaqForm: FormGroup; //submit login
  submitted = false; // for home page form validation
  apiid;
  apiIndex;
  // showmodeldata;
    // convenience getter for access to form fields
    get faqerror() { return this.editfaqForm.controls }
  constructor(private messageService: MessageService,private modalService: BsModalService,private cdRef:ChangeDetectorRef,private authservice: UseraccessService) {
  
   }

  ngOnInit(): void {
    this.editfaqForm = new FormGroup({
      question: new FormControl('', [Validators.required]),
      discription: new FormControl('', [Validators.required]),
      faqstatus: new FormControl('', [Validators.required]),
    })
  }
  Editfaq(indexid,id,faqeditmodal){
    this.modalRef = this.modalService.show(faqeditmodal);
 
    this.apiid = id;
    this.apiIndex = indexid;
    let isfaqsataus;
    if(this.faqquestion[indexid].status == 1){
      isfaqsataus = 'Active';
    }else if(this.faqquestion[indexid].status == 0){
      isfaqsataus = 'Inactive';
    }
     this.editfaqForm.setValue({
      question:this.faqquestion[indexid].question,
      discription: this.faqquestion[indexid].description,
      faqstatus: isfaqsataus
    })
    console.log('get faqs ---',   this.faqquestion[indexid]);
  }
  ngAfterViewInit() {
    this.authservice.get(CONSTANTS.getfaqquestion).subscribe((res: any) => {
      this.faqquestion = [];
      res.map(value => {
        this.faqquestion.push(value)
      })
      this.cdRef.detectChanges();
     
    })
  }
  onfaqSubmit(){
    this.submitted = true;
    if (this.editfaqForm.invalid) {
      return;
    }
    else {
      let isfaqchange;
      if(this.editfaqForm.value.faqstatus == 'Active'){
        isfaqchange = 1;
      }else if(this.editfaqForm.value.faqstatus == 'Inactive'){
        isfaqchange = 0;
      }
      const body = new HttpParams()
      .set('id',  this.apiid )
      .set('question', this.editfaqForm.value.question)
      .set('description', this.editfaqForm.value.discription)
      .set('status', isfaqchange)
      this.authservice.post(CONSTANTS.updatefaq, body).subscribe((res: any) => {
        if(res && res.status == true){
          let isnewfaqchange;
          if(this.editfaqForm.value.faqstatus == 'Active'){
            isnewfaqchange = 1;
          }else if(this.editfaqForm.value.faqstatus == 'Inactive'){
            isnewfaqchange = 0;
          }
          this.faqquestion[this.apiIndex].question = this.editfaqForm.value.question;
          this.faqquestion[this.apiIndex].description = this.editfaqForm.value.discription;
          this.faqquestion[this.apiIndex].status = isnewfaqchange;
          this.modalRef.hide()
          this.messageService.add({severity:'success', summary: 'Success',detail:res.message});
          console.log('get faqs submts ---', res);

        }
      })
    
    }
  
  }
}
