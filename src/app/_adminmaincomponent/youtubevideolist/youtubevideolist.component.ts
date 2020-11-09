import { Component, OnInit ,TemplateRef } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import {UseraccessService} from '../../_service/useraccess.service';
import {CONSTANTS} from '../../_service/constant';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpParams} from '@angular/common/http';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-youtubevideolist',
  templateUrl: './youtubevideolist.component.html',
  styleUrls: ['./youtubevideolist.component.css'],
  providers: [MessageService]
})
export class YoutubevideolistComponent implements OnInit {
  safeURL;
  Videosdata = [];
  modalRef: BsModalRef;
  editindex;
  editvidid;
  selectionId; 
  isvideoLoader = false;
  iscreateLoader = false;
  iseditLoader = false;
  isdeleteLoader = false;
  newvidSubmit = false;
  createVideo = this.fb.group({
    youtubeid :['', Validators.required],
    youtubetitle:['',Validators.required],
    videostatus:['']
  })
  get createvideoerror(){ return this.createVideo.controls }

  // for edit video
  editvidSubmit = false;
  editVideo = this.fb.group({
    edityoutubeid :['', Validators.required],
    edityoutubetitle:['',Validators.required],
    editvideostatus:['']
  })
  get editvideoerror(){ return this.editVideo.controls }

  constructor(private messageService: MessageService,private modalService: BsModalService,private userservice:UseraccessService,private fb:FormBuilder) { 
    this.createVideo.patchValue({
      videostatus:0
    })
  }

  openModal(videotemplate: TemplateRef<any>,videoid,index,trackid ) {
    this.modalRef = this.modalService.show(videotemplate);
    if(trackid == 'new'){ 
       this.createVideo.patchValue({
      videostatus:0
           }); 
    this.selectionId = trackid;}

    else if(trackid == 'edit') { 
                    this.selectionId = trackid;
                    this.editindex = index;
                    this.editvidid = videoid;
                     this.editVideo.setValue({
                      edityoutubeid: this.Videosdata[index].short_code,
                      edityoutubetitle: this.Videosdata[index].title ,
                      editvideostatus: this.Videosdata[index].status
                     })
                  }

    else if (trackid == 'delete') { 
    this.selectionId = trackid;
     this.editindex = index;
    this.editvidid = videoid; }
  }
  // create new youtube video
  youtubeCreated(){
   
    this.newvidSubmit = true;
    if(this.createVideo.invalid){
       return ;
    }else{
      this.iscreateLoader = true;
      const body = new HttpParams()
      .set('title', this.createVideo.value.youtubetitle)
      .set('short_code', this.createVideo.value.youtubeid)
      .set('status', this.createVideo.value.videostatus)

      // api calling 
        this.userservice.post(CONSTANTS.admincreatevideo,body).subscribe(res=>{
         
          if(res && res.status == true){
            let newVid = {
              id:res.id,
              short_code:this.createVideo.value.youtubeid,
              title:this.createVideo.value.youtubetitle,
              status:this.createVideo.value.videostatus
            }
            this.Videosdata.unshift(newVid);
            this.createVideo.reset();
            this.createVideo.patchValue({
              videostatus:0
            })
            this.newvidSubmit = false; 
          this.messageService.add({severity:'success', summary: 'Success',detail:res.message});
          this.iscreateLoader = false;
          }else if(res && res.status == false){
            this.messageService.add({severity:'error', summary: 'Error',detail:res.error});
          }
        })
    }
  }

  youtubeEdited(){
    this.editvidSubmit = true;
    if(this.editVideo.invalid){
       return ;
    }else{
       this.iseditLoader = true;
      const body = new HttpParams()
      .set('id', this.editvidid )
      .set('title', this.editVideo.value.edityoutubetitle)
      .set('short_code', this.editVideo.value.edityoutubeid)
      .set('status', this.editVideo.value.editvideostatus)
      // api calling 
      this.userservice.post(CONSTANTS.adminupdatevideo,body).subscribe(res=>{
        if(res && res.status == true){
          this.Videosdata[this.editindex].short_code = this.editVideo.value.edityoutubeid;
          this.Videosdata[this.editindex].title = this.editVideo.value.edityoutubetitle;
          this.Videosdata[this.editindex].status = this.editVideo.value.editvideostatus;
          this.editVideo.reset();
          this.editvidSubmit = false;
          this.modalRef.hide();
       
        this.messageService.add({severity:'success', summary: 'Success',detail:res.message});
        this.iseditLoader = false;
        }
        else if(res && res.status == false){
          this.messageService.add({severity:'error', summary: 'Error',detail:res.error});
        }
      })
    }
  }
  onDelete(viddelete){
    
     if(viddelete == 'deletetrue'){
       this.isdeleteLoader = true;
      const body = new HttpParams()
      .set('id', this.editvidid )
      
      // api calling 
      this.userservice.post(CONSTANTS.admindeletevideo,body).subscribe(res=>{
        if(res && res.status == true){   
          this.Videosdata.splice(this.editindex, 1);
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
    this.userservice.get(CONSTANTS.frontvideo).subscribe((res:any)=>{
      res.map(value=>{
        this.Videosdata.push(value);
        this.isvideoLoader = true;
      })
    })
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }
  
}
