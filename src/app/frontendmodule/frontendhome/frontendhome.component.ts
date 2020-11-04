import { Component, OnInit } from '@angular/core';
import {UseraccessService} from '../../_service/useraccess.service';
import {CONSTANTS} from '../../_service/constant';

@Component({
  selector: 'app-frontendhome',
  templateUrl: './frontendhome.component.html',
  styleUrls: ['./frontendhome.component.css']
})
export class FrontendhomeComponent implements OnInit {
  getservice = [];
  testimonial = [];
  constructor(private userservice:UseraccessService) {}

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
