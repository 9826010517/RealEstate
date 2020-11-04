import { Component, OnInit } from '@angular/core';
import {UseraccessService} from '../../_service/useraccess.service';
import {CONSTANTS} from '../../_service/constant';

@Component({
  selector: 'app-videogallery',
  templateUrl: './videogallery.component.html',
  styleUrls: ['./videogallery.component.css']
})
export class VideogalleryComponent implements OnInit {
  safeURL;
  Videosdata = [];
  
constructor(private userservice:UseraccessService) {}
    

  ngOnInit(): void {

    this.userservice.get(CONSTANTS.frontvideo).subscribe((res:any)=>{

      res.map(value=>{
        this.Videosdata.push(value);
      })
    })
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }

}
