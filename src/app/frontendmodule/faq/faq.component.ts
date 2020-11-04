import { Component, OnInit } from '@angular/core';
import { UseraccessService } from 'src/app/_service/useraccess.service';
import { CONSTANTS } from 'src/app/_service/constant';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})

export class FaqComponent implements OnInit {
  faqdetail = [];
  constructor(private authservice: UseraccessService) { }

  ngOnInit(): void {
    this.authservice.get(CONSTANTS.frontfaq).subscribe((res: any) => {
      this.faqdetail = [];
      res.map(value => {
        this.faqdetail.push(value)
      })
    })
  }

}
