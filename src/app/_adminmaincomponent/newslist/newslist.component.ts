import { Component, OnInit ,TemplateRef ,ChangeDetectorRef,ViewChild, ElementRef} from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import {UseraccessService} from '../../_service/useraccess.service';
import {CONSTANTS,serviceimage} from '../../_service/constant';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpParams} from '@angular/common/http';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-newslist',
  templateUrl: './newslist.component.html',
  styleUrls: ['./newslist.component.css'],
  providers: [MessageService]
})

export class NewslistComponent implements OnInit {
  safeURL;
  Servicedata = [];
  modalRef: BsModalRef;
  editindex;
  editvidid;
  selectionId; 
  nullImgErr;
  isvideoLoader = false;
  iscreateLoader = false;
  iseditLoader = false;
  isdeleteLoader = false;
  newvidSubmit = false;
  serviceImgPath = serviceimage;
  createserviceForm = this.fb.group({
    servicetitle :['', Validators.required],
    servicedetail:['',Validators.required],
    servicestatus:['']
  })

  get serviceerror(){ return this.createserviceForm.controls }

  // for edit video
  editvidSubmit = false;
  editService = this.fb.group({
    editservicetitle :['', Validators.required],
    editservicedesc:['',Validators.required],
    editservicestatus:['']
  })
  get editserviceerror(){ return this.editService.controls }

  constructor(private messageService: MessageService,private modalService: BsModalService,private userservice:UseraccessService,private fb:FormBuilder,    private cd: ChangeDetectorRef) { 
    this.createserviceForm.patchValue({
      servicestatus:0
    })
  }
   
    /*##################### image upload Form #####################*/
      imageuploadForm = this.fb.group({
          file: [null]
        })  
    /*########################## File Upload ########################*/

    // @ViewChild('fileInput') els;
    imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    editFile: boolean = true;
    removeUpload: boolean = false;

    uploadFile(event) {
      let reader = new FileReader(); // HTML5 FileReader API
      let file = event.target.files[0];
      // let file:File = <File>event.target.files[0];
      this.imageuploadForm.patchValue({
        file: file
      });
      if (event.target.files && event.target.files[0]) {
        reader.readAsDataURL(file);
  
        // When file uploads set it to file formcontrol
        reader.onload = () => {
          this.imageUrl = reader.result;
          // this.imageuploadForm.patchValue({
          //   file: reader.result
          // });
          this.editFile = false;
          this.removeUpload = true;
        }
        // ChangeDetectorRef since file is loading outside the zone
        this.cd.markForCheck();        
      }
    }
      // Function to remove uploaded file
      removeUploadedFile() {
        this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
        this.editFile = true;
        this.removeUpload = false;
        this.imageuploadForm.patchValue({
          file: [null]
        });
      }

  openModal(videotemplate: TemplateRef<any>,service_id,index,trackid ) {
    this.modalRef = this.modalService.show(videotemplate);
    this.nullImgErr = "";
    if(trackid == 'new'){ 
    this.selectionId = trackid;
    this.createserviceForm.reset();
    this.newvidSubmit = false; 
    this.createserviceForm.patchValue({
      servicestatus:0
         }); 
    this.imageuploadForm.patchValue({
      file: null
    });
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
  }

    else if(trackid == 'edit') { 
                    this.iseditLoader = false;
                    this.selectionId = trackid;
                    this.editindex = index;
                    this.editvidid = service_id;
                     this.editService.setValue({
                      editservicetitle: this.Servicedata[index].title,
                      editservicedesc: this.Servicedata[index].content ,
                      editservicestatus: this.Servicedata[index].is_status
                     })
                     this.imageUrl = this.serviceImgPath+this.Servicedata[index].image;
                    this.editFile = true;
                    this.removeUpload = false;
                    this.imageuploadForm.patchValue({
                      file: null
                    });
                  }

    else if (trackid == 'delete') { 
    this.selectionId = trackid;
     this.editindex = index;
    this.editvidid = service_id; }
  }
  // create new youtube video
  serviceCreated(){
    this.nullImgErr = "";
    this.newvidSubmit = true;
    if(this.createserviceForm.invalid){
       return ;
    }else{
      this.iscreateLoader = true;
      const formData = new FormData();
      formData.append('title', this.createserviceForm.value.servicetitle);
      formData.append('content', this.createserviceForm.value.servicedetail);
      formData.append('status', this.createserviceForm.value.servicestatus);
      formData.append('bgimage', this.imageuploadForm.value.file);

      this.userservice.imagepostservice(CONSTANTS.admincreatenews, formData).subscribe(res=>{
              if(res && res.status == true){
           let newVid = {
                          id:res.id,
                          image:res.image_name,
                          title: this.createserviceForm.value.servicetitle,
                          content:this.createserviceForm.value.servicedetail,
                          is_status: this.createserviceForm.value.servicestatus  
                        }
                      this.Servicedata.unshift(newVid);
                      this.createserviceForm.reset();
                      this.newvidSubmit = false; 
                      this.iscreateLoader = false;
                      this.createserviceForm.patchValue({
                        servicestatus:0
                           }); 
                 this.messageService.add({severity:'success', summary: 'Success',detail:res.message});
              }else if(res && res.status == false && res.error == 'please upload image.'){
                this.nullImgErr = 'please upload image.';
                this.iscreateLoader = false;              
              }else if(res && res.status == false ){
                this.iscreateLoader = false;        
                this.messageService.add({severity:'error', summary: 'Error',detail:res.error});
              }
        })
     }
  }

  serviceEdited(){
   
  
    // this.editvidSubmit = true;
    if(this.editService.invalid){
       return ;
    }else{

      this.iseditLoader = true;
      console.log('edx 0',this.editvidid,
      this.editService.value.editservicetitle, this.editService.value.editservicedesc,
      this.editService.value.editservicestatus)
      const formData = new FormData();
        if(this.imageuploadForm.value.file == null ){
          console.log('edx 1',this.imageuploadForm.value.file)
          formData.append('id', this.editvidid);
          formData.append('title', this.editService.value.editservicetitle);
          formData.append('content', this.editService.value.editservicedesc);
          formData.append('status', this.editService.value.editservicestatus);
        }else{
      
          formData.append('id', this.editvidid);
          formData.append('title', this.editService.value.editservicetitle);
          formData.append('content', this.editService.value.editservicedesc);
          formData.append('status', this.editService.value.editservicestatus);
          formData.append('bgimage', this.imageuploadForm.value.file);
          console.log('edx 2',this.imageuploadForm.value.file)
        }
    

      // api calling 
    this.userservice.imagepostservice('https://learnsetu.com/RealEstate/api/update_news', formData).subscribe(res=>{
      console.log('ch ***///***', res);
        if(res && res.status == true){
          if( this.imageuploadForm.value.file != null ){
            this.Servicedata[this.editindex].image = res.image_name;
          }
            this.Servicedata[this.editindex].title = this.editService.value.editservicetitle;
            this.Servicedata[this.editindex].status = this.editService.value.editservicestatus;
            this.Servicedata[this.editindex].content = this.editService.value.editservicedesc;
            this.editvidSubmit = false;
         this.modalRef.hide();
         this.messageService.add({severity:'success', summary: 'Success',detail:res.message});
         this.iseditLoader = false;
        }
        else if(res && res.status == false){
          this.iseditLoader = false;
          this.messageService.add({severity:'error', summary: 'Error',detail:res.error});
        }
      })
    }
  }
  onDelete(viddelete){
    
     if(viddelete == 'deletetrue'){
       this.isdeleteLoader = true;
      // const body = new HttpParams()
      // .set('id', this.editvidid )
      const formData = new FormData();
      formData.append('id', this.editvidid);
      // api calling 
      this.userservice.imagepostservice(CONSTANTS.admindeletenews, formData).subscribe(res=>{
        if(res && res.status == true){   
          this.Servicedata.splice(this.editindex, 1);
          this.modalRef.hide();  
          this.messageService.add({severity:'success', summary: 'Success',detail:res.message});
          this.isdeleteLoader = false;
        }  else{   this.messageService.add({severity:'error', summary: 'Error',detail:res.error});}   
           })
      }
     else if(viddelete == 'deletefalse'){
      this.modalRef.hide();  
     }
  }
  ngOnInit(): void {

    this.Servicedata = [];
    this.userservice.get(CONSTANTS.frontnews).subscribe((res:any)=>{
      console.log('my news', this.Servicedata);
      res.map(value=>{
        this.Servicedata.push(value);
        this.isvideoLoader = true;
      })
    })
  }
  
}