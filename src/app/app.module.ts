import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './adminsection/homepage/homepage.component';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from  '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { LoginComponent } from './adminsection/login/login.component';
import { ForgotpasswordComponent } from './adminsection/forgotpassword/forgotpassword.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {MatDialogModule} from '@angular/material/dialog';
import { EmailteplateComponent } from './adminsection/emailteplate/emailteplate.component';
import { EditemailteplateComponent } from './adminsection/editemailteplate/editemailteplate.component';
import { NavbarComponent } from './adminsection/navbar/navbar.component';
import { CmsfaqComponent } from './cms/cmsfaq/cmsfaq.component';
import { AboutusComponent } from './cms/aboutus/aboutus.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CreateadminComponent } from './manageadmin/createadmin/createadmin.component';
import { AdminmanageComponent } from './manageadmin/adminmanage/adminmanage.component';
import { UpdateadminComponent } from './manageadmin/updateadmin/updateadmin.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProfileupdateComponent } from './profileupdate/profileupdate.component';
import { UploadproductComponent } from './products/uploadproduct/uploadproduct.component';
import {FrontendmoduleModule} from './frontendmodule/frontendmodule.module'
import { YouTubePlayerModule } from '@angular/youtube-player';
import { ServicelistComponent } from './_adminmaincomponent/servicelist/servicelist.component';
import { YoutubevideolistComponent } from './_adminmaincomponent/youtubevideolist/youtubevideolist.component';
import { NewslistComponent } from './_adminmaincomponent/newslist/newslist.component';
// import { ModalModule } from 'ngx-bootstrap';
// import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    ForgotpasswordComponent,
    EmailteplateComponent,
    EditemailteplateComponent,
    NavbarComponent,
    CmsfaqComponent,
    AboutusComponent,
    CreateadminComponent,
    AdminmanageComponent,
    UpdateadminComponent,
    ProfileupdateComponent,
    UploadproductComponent,
    ServicelistComponent,
    YoutubevideolistComponent,
    NewslistComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ToastModule,
    ButtonModule,
    MatDialogModule,
    AccordionModule,
    CKEditorModule,
    MatExpansionModule,
    FrontendmoduleModule,
    YouTubePlayerModule
    // Ng2TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
