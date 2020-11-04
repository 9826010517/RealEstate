import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import {UseraccessService} from '../../_service/useraccess.service';
import {CONSTANTS} from '../../_service/constant';

@Component({
  selector: 'app-newsread',
  templateUrl: './newsread.component.html',
  styleUrls: ['./newsread.component.css']
})

export class NewsreadComponent implements OnInit {
  getnews = [];
  newsId = "";
  constructor(private userservice:UseraccessService,private activatedroute : ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe(params => {
      this.newsId = params['newsid'];
    });

    if(this.newsId != "" && this.newsId != undefined){
    this.userservice.get(CONSTANTS.frontnews).subscribe((res:any)=>{
      this.getnews = [];
      res.map(value=>{
        if(value.id ==  this.newsId ){
          this.getnews.push(value);
        }
      })
    })
  } else{
     this.router.navigate(['/']);
  }


  }
}
