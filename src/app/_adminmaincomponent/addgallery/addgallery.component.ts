import { Component, OnInit,TemplateRef ,ChangeDetectorRef } from '@angular/core';
import { UseraccessService } from 'src/app/_service/useraccess.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CONSTANTS , serviceimage ,galleryimages} from 'src/app/_service/constant';
import {MessageService} from 'primeng/api';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-addgallery',
  templateUrl: './addgallery.component.html',
  styleUrls: ['./addgallery.component.css'],
  providers: [MessageService]
})

export class AddgalleryComponent implements OnInit {
  apiImages = [];
  modalRef: BsModalRef;
  selectionId;
  editindex;
  editvidid;
  isdeleteLoader = false;
  isimageLoader = false;
  iscreateLoader = false;
  nullImgErr;
  constructor(private fb:FormBuilder, private cd: ChangeDetectorRef,private messageService: MessageService,private userservice: UseraccessService,private modalService: BsModalService) { }
  
  openModal(videotemplate: TemplateRef<any>,service_id,index,trackid ) {
    this.isdeleteLoader = false;
    this.isimageLoader = false;
    this.iscreateLoader = false;
    this.nullImgErr = "";
    this.modalRef = this.modalService.show(videotemplate);
     if (trackid == 'delete') { 
      this.selectionId = trackid;
       this.editindex = index;
      this.editvidid = service_id; }
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
    this.nullImgErr = "";
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
  enterImage(){

    const formData = new FormData();
    formData.append('bgimage', this.imageuploadForm.value.file);
    // this.nullImgErr = 
    if (this.imageuploadForm.value.file == null){
      this.nullImgErr = 'please select image';
    }else{
      this.isimageLoader = true;
    this.userservice.imagepostservice(CONSTANTS.adminaddgallery, formData).subscribe(res=>{
      if(res){
        let imgres = {
          id:res.id,
          image_name:galleryimages+res.image_name,

        }
        this.apiImages.unshift(imgres);
         this.isimageLoader = false;
         this.messageService.add({severity:'success', summary: 'Success',detail:res.message});
        console.log('image store res',res);
      }
    }) 
  }

  }

  onDelete(viddelete){
    
    if(viddelete == 'deletetrue'){
      this.isdeleteLoader = true;
     // const body = new HttpParams()
     // .set('id', this.editvidid )
     console.log('image deleting', this.editvidid);
     const formData = new FormData();
     formData.append('id', this.editvidid);
     // api calling 
     this.userservice.imagepostservice(CONSTANTS.admindeletegallery, formData).subscribe(res=>{
       console.log('image deleting',res);
      if(res && res.status == true){   
         this.apiImages.splice(this.editindex, 1);
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

    // api calling
    this.userservice.get(CONSTANTS.frontgallery).subscribe((res: any) => {
      if(res){
      res.map(value=>{
        let newimages = {
          image_name :galleryimages+value.image_name ,
          id:value.id
        }
        this.apiImages.push(newimages);
      })
     }
    })
    // *************

  }
}