import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders,HttpErrorResponse,HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
import {throwError, Observable,BehaviorSubject,Subject } from 'rxjs';
import { retry,catchError,map } from 'rxjs/operators';
// var emailsubject = new Subject<any>();


@Injectable({
  providedIn: 'root'
})



export class UseraccessService {
  userRole: any;
  loggeduser = new BehaviorSubject<any>( localStorage.getItem('userrole'));
  isloggdin =new BehaviorSubject<any>( localStorage.getItem('loginkey'));
   userprofile = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('userprofile')));
  
    results: Observable<any>;
  constructor(private http: HttpClient, private router: Router) { }
  
        //  for post 
          post(url, body): Observable<any> {
              let options = {
                headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
            };
              return this.http.post<any>(url,  body.toString(),options)
                .pipe(
                  map(res => {
                  if (!!res) {
                    // For login 
                    if(res.status == true && res.message == "User login successful."){
                      localStorage.setItem("loginkey", JSON.stringify(res.data.id));
                      localStorage.setItem("userrole", res.data.admin_type);
                      this.loggeduser.next(res.data.admin_type);
                      this.isloggdin.next(res.data.id);
                      this.userRole = res.data.admin_type;
                      this.results =  res.data.admin_type;
                      localStorage.setItem("userprofile", JSON.stringify(res.data));
                      this.userprofile.next( res.data);
                      
                      console.log('my res', res.data)
                      this.router.navigate(['/adminhome']);
                    }
                  
                   
                    // if (res && api_res.message == "Your session has been expired. Please login again") {
                    //   this.logoutUser();
                    //   this.toastr.error('', "Your session has been expired. Please login again", {
                    //     closeButton: false,
                    //     onActivateTick: true,
                    //     enableHtml: true
                    //   });
                    // }
                    return res;
                  }
                  // this.toastr.error('', "invalid request error", {
                  //   closeButton: false,
                  //   onActivateTick: true,
                  //   enableHtml: true
                  // });
                  return false;
                }),
                catchError(this.handleError)
                );
            }

        // for get
            get(url): Observable<any> {
              console.log('check my url',url)
              let options = {
                headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
            };
              return this.http.get<any>(url)
                .pipe(
                  map(res => {
                  if (!!res) {
                    return res;
                  }
                  return false;
                }),
                catchError(this.handleError)
                );
            }
        
        // for handle unknown error  
            handleError(error) {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            console.log('check that 11',error.error);
              // client-side error
              errorMessage = `Error: ${error.error.message}`;
          } else {
            console.log('check that 11++',error.error.error);
              // server-side error
              errorMessage = error.error.error;
              // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          console.log('check that',errorMessage);
            window.alert(errorMessage);
            return throwError(errorMessage);
            }
         
        // for logout
            logoutwindow(){
              localStorage.clear();
              this.loggeduser.next('');
              this.isloggdin.next('');
              this.router.navigate(['/login']);
            }

}
