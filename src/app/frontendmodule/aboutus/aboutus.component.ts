import { Component, OnInit } from '@angular/core';
import { UseraccessService } from 'src/app/_service/useraccess.service';
import { CONSTANTS } from 'src/app/_service/constant';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
aboutus = [];
  constructor(private authservice: UseraccessService) { }

  ngOnInit(): void {
    this.authservice.get(CONSTANTS.frontAboutus).subscribe((res: any) => {
     
      if(res){
        this.aboutus = [];
      res.map(value=>{
        if(value.id == 4){
          this.aboutus.push(value);
        }
      })
      
    }
    })
  
  }

}
