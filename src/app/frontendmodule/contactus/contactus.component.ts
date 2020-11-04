import { Component, OnInit } from '@angular/core';
import { UseraccessService } from 'src/app/_service/useraccess.service';
import { CONSTANTS } from 'src/app/_service/constant';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  constructor(private authservice: UseraccessService) { }

  ngOnInit(): void {}
   

}
