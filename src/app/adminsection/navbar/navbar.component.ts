import { Component, OnInit } from '@angular/core';
import { UseraccessService } from 'src/app/_service/useraccess.service';
import { ShareService } from 'src/app/_service/share.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
test = true;
profilename;
  constructor(private shareservice:ShareService,public authservice: UseraccessService) { }
  logOut(){
    this.authservice.logoutwindow();
      }
  ngOnInit(): void {
    // console.log('data reposce received 00',this.profilename);
    this.authservice.userprofile.subscribe(res=>{
      if(res && res.name){
      this.profilename = res.name;
      console.log('data reposce /////////////////////',res);
      }
    })
  }

}
