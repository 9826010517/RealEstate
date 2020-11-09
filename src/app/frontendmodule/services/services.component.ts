import { Component, OnInit } from '@angular/core';
import {UseraccessService} from '../../_service/useraccess.service';
import {CONSTANTS,serviceimage,smallserviceimage} from '../../_service/constant';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  getservice = [];
  constructor(private userservice:UseraccessService) { }
  image_baseurl = smallserviceimage;
  excerpt: Array<any> = [];
  slicify = (id) => this.excerpt[id] = !this.excerpt[id];
  ngOnInit(): void {
    this.userservice.get(CONSTANTS.frontGetService).subscribe((res:any)=>{

      res.map(value=>{
        this.getservice.push(value);
      })
    })
  }

}
