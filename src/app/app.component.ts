import { Component,OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'admindash';
  getObesrv = null;
  headerFooter:boolean;
  urlQuery;
  constructor(private router:Router, private peramroute:ActivatedRoute,private location: Location){
   
    
  }
  ngOnInit() {
    this.router.events
      .subscribe((event) => {
     
        if (event instanceof NavigationEnd) {
          if (this.peramroute.snapshot.queryParams['page'] || this.peramroute.snapshot.queryParams['faqpage']) {
              let url: string = this.router.url.substring(0, this.router.url.indexOf("?"));
              this.urlQuery = url;
             }else{
               this.urlQuery = event.url;
             }
               
             if(this.urlQuery == '/adminhome' || this.urlQuery == '/login'  || this.urlQuery == '/forgotpassword' || this.urlQuery == '/emailtemplate'
          || this.urlQuery == '/editemail' || this.urlQuery == '/faq' || this.urlQuery == '/cmsupdate' || this.urlQuery == '/createadmin' || this.urlQuery == '/adminmanage'
          || this.urlQuery == '/updateadmin' || this.urlQuery == '/updateprofile' || this.urlQuery == '/uploadproduct'|| this.urlQuery == '/videolisting' || this.urlQuery == '/servicelisting'
          || this.urlQuery == '/newslisting'  || this.urlQuery == '/addgallery'  ){
            this.headerFooter = true;
          }else{
            this.headerFooter = false;
           
          }
        }
      });
  }
  ngOnDestroy(){
  
    this.getObesrv.unsubscribe();
  }
  onActivate(event) {
    window.scroll(0,0);
}
}
