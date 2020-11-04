import { Component, OnInit } from '@angular/core';
import {UseraccessService} from '../../_service/useraccess.service';
import {CONSTANTS} from '../../_service/constant';
@Component({
  selector: 'app-newssection',
  templateUrl: './newssection.component.html',
  styleUrls: ['./newssection.component.css']
})
export class NewssectionComponent implements OnInit {
  getnews = [];
  constructor(private userservice:UseraccessService) { }

  ngOnInit(): void {
    this.userservice.get(CONSTANTS.frontnews).subscribe((res:any)=>{

      res.map(value=>{
        this.getnews.push(value);
      })
    })
  }
  

}
