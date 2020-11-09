import { Component, OnInit } from '@angular/core';
import { UseraccessService } from 'src/app/_service/useraccess.service';
import { CONSTANTS } from 'src/app/_service/constant';
import { HttpParams} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
  providers: [MessageService]
})
export class AboutusComponent implements OnInit {
  public Editor = ClassicEditor;
  urlparam = "aboutus";
  contentid;
  titleerrmsg;
  paramvalue;
  public model = {
    que:"",
    editorData:''
};
  constructor(private router:Router, private peramroute:ActivatedRoute, private messageService: MessageService,private authservice: UseraccessService) { }

  ngOnInit(): void {
    this.titleerrmsg = "";

  this.peramroute.queryParams.subscribe((params:any) => {
    console.log('lolo',params.page);
    this.authservice.get(CONSTANTS.frontAboutus).subscribe((res: any) => {
      if(params.page == 'aboutus'){
        this.titleerrmsg = "";
        res.map(val => {
        if(val.id == 4){
          console.log('cms res here',val);
          this.contentid = val.id;
          this.model.que = val.title;
          this.model.editorData = val.content;
         }
        })
      }else{
        this.router.navigate(['/adminhome']);
      }
    })
  })
     }

  oncSubmit(){
if( this.model.que == ""){
  this.titleerrmsg = "Title is required";
}else{
  this.titleerrmsg = "";
  console.log('about testing',this.model.que,this.model.editorData)
    const body = new HttpParams()
    .set('title',   this.model.que)
    .set('content',  this.model.editorData)
    this.authservice.post(CONSTANTS.admineditaboutus, body).subscribe((res: any) => {
      if(res.status == true){
      this.messageService.add({severity:'success', summary: 'Success',detail:res.message});
      console.log('update res here',res);
      }else if(res.status == false){
        console.log('update res here',res);
        this.messageService.add({severity:'error', summary: 'Error',detail:res.error});
      }
    })
  }
  }
}
