import { Component, OnInit } from '@angular/core';
import {UseraccessService} from '../../_service/useraccess.service';
import {CONSTANTS} from '../../_service/constant';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  getservice = [];
  constructor(private userservice:UseraccessService) { }

  ngOnInit(): void {
    this.userservice.get(CONSTANTS.frontGetService).subscribe((res:any)=>{

      res.map(value=>{
        this.getservice.push(value);
      })
    })
  }

}
