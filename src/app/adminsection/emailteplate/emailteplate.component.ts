import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { UseraccessService } from 'src/app/_service/useraccess.service';
import { CONSTANTS } from 'src/app/_service/constant';
import { HttpParams} from '@angular/common/http';
import { ShareService } from 'src/app/_service/share.service';
export interface PeriodicElement {
  purpose: string;
  subject: number;
  emailmessage: number;
  emailstatus: string;
  smsmessage: string;
  smsstatus: string;
  id;
}
@Component({
  selector: 'app-emailteplate',
  templateUrl: './emailteplate.component.html',
  styleUrls: ['./emailteplate.component.css'],
  providers:[UseraccessService]
})
export class EmailteplateComponent implements OnInit {
  constructor(private shareservice:ShareService,private authservice: UseraccessService) { }
  tempStatus:boolean = false;
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['#', 'purpose', 'subject', 'emailcontent','emailstatus','smscontent','smsstatus','foreditkey'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.authservice.get(CONSTANTS.editemailtepmlate).subscribe((res: any) => {
      res.map(value=>{
        let mailVal = {
          purpose : value.purpose,
          subject:value.subject,
          emailmessage:value.message,
          emailstatus:value.status,
          smsmessage:value.sms_content,
          smsstatus: value.sms_status,
          id: value.id
        }
        this.ELEMENT_DATA.push(mailVal);
      })
      console.log('new res 1',  res)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
   
  Editmail(index){
   let edittemp =  this.dataSource.data[index];
  this.shareservice.editUser(edittemp);
  }

  // 


  // 
}
