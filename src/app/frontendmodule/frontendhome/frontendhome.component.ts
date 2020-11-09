import { Component, OnInit } from '@angular/core';
import {UseraccessService} from '../../_service/useraccess.service';
import {CONSTANTS,serviceimage,smallserviceimage} from '../../_service/constant';

@Component({
  selector: 'app-frontendhome',
  templateUrl: './frontendhome.component.html',
  styleUrls: ['./frontendhome.component.css']
})
export class FrontendhomeComponent implements OnInit {
  getservice = [];
  testimonial = [];
  excerpt: Array<any> = [];
  slicify = (id) => {
    console.log('metest here with id',  this.excerpt[id])
    console.log('metest here with id +++',  !this.excerpt[id])
    this.excerpt[id] = !this.excerpt[id];
    console.log('metest here', this.excerpt)
  }
  constructor(private userservice:UseraccessService) {}
  image_baseurl = smallserviceimage;
  ngOnInit(): void {

   this.userservice.get(CONSTANTS.frontGetService).subscribe((res:any)=>{
    res.map(value=>{
        this.getservice.push(value);
      })
   })

   this.userservice.get(CONSTANTS.fronttestimonial).subscribe((res:any)=>{
    res.map(value=>{
            this.testimonial.push(value);
          })
   })

     }

}
