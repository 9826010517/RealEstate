import { Component,OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
// import { filter } from 'rxjs/operators/filter';
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
    // console.log('test 1 ',this.location.path());
  //  this.getObesrv = this.router.events.subscribe(val => {
  //    console.log('check a val',val);
  //  })
    
  }
  ngOnInit() {
    this.router.events
      .subscribe((event) => {
     
        if (event instanceof NavigationEnd) {
          if (this.peramroute.snapshot.queryParams['page'] || this.peramroute.snapshot.queryParams['faqpage']) {
            console.log('check b val',this.peramroute.snapshot.queryParams['page']);
              let url: string = this.router.url.substring(0, this.router.url.indexOf("?"));
              this.urlQuery = url;
             }else{
              console.log('check new b val',event.url);
               this.urlQuery = event.url;
             }
               
             if(this.urlQuery == '/adminhome' || this.urlQuery == '/login'  || this.urlQuery == '/forgotpassword' || this.urlQuery == '/emailtemplate'
          || this.urlQuery == '/editemail' || this.urlQuery == '/faq' || this.urlQuery == '/cmsupdate' || this.urlQuery == '/createadmin' || this.urlQuery == '/adminmanage'
          || this.urlQuery == '/updateadmin' || this.urlQuery == '/updateprofile' || this.urlQuery == '/uploadproduct'|| this.urlQuery == '/videolisting' || this.urlQuery == '/servicelisting'
          || this.urlQuery == '/newslisting'  || this.urlQuery == '/addgallery'  ){
            // console.log('check b val',this.urlQuery);
            this.headerFooter = true;
          }else{
            this.headerFooter = false;
            console.log('check AAAAAAAAA val',this.urlQuery);
          }
        }
      });
  }
  ngOnDestroy(){
    // console.log('check b val',);
    this.getObesrv.unsubscribe();
  }
  onActivate(event) {
    window.scroll(0,0);
    //or document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)
}
}
