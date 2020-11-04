import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { UseraccessService } from 'src/app/_service/useraccess.service';
import { CONSTANTS } from 'src/app/_service/constant';
import { HttpParams} from '@angular/common/http';
import { ShareService } from 'src/app/_service/share.service';

export interface PeriodicElement {
  username: string;
  name: string;
  designation: string;
  admintype:string;
  adminstatus:string;
  email: string;
  password: string;
  id;
}

@Component({
  selector: 'app-adminmanage',
  templateUrl: './adminmanage.component.html',
  styleUrls: ['./adminmanage.component.css']
})
export class AdminmanageComponent implements OnInit {

  constructor(private shareservice:ShareService,private authservice: UseraccessService) { 
  }
  tempStatus:boolean = false;
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['#', 'username', 'name', 'designation','admintype','adminstatus','email','password','foreditkey'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.authservice.get(CONSTANTS.getalladmin).subscribe((res: any) => {
      res.map(value=>{
        console.log('new res tables 001',  value.status)
        let mailVal = {
          username : value.username,
          name:value.name,
          designation:value.designation,
          admintype:value.admin_type,
          adminstatus:value.status,
          email: value.email,
          password: value.password,
          id: value.id
        }
        this.ELEMENT_DATA.push(mailVal);
      })
    
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  Editadmin(index){
    let edittemp =  this.dataSource.data[index];
    this.shareservice.updateAdmin(edittemp);
  }
}
