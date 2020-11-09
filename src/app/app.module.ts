import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { EditemailteplateComponent } from './adminsection/editemailteplate/editemailteplate.component';
import { NavbarComponent } from './adminsection/navbar/navbar.component';
import { CmsfaqComponent } from './cms/cmsfaq/cmsfaq.component';
import { AboutusComponent } from './cms/aboutus/aboutus.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProfileupdateComponent } from './profileupdate/profileupdate.component';
import { UploadproductComponent } from './products/uploadproduct/uploadproduct.component';
import {FrontendmoduleModule} from './frontendmodule/frontendmodule.module'
import { YouTubePlayerModule } from '@angular/youtube-player';
import { ServicelistComponent } from './_adminmaincomponent/servicelist/servicelist.component';
import { YoutubevideolistComponent } from './_adminmaincomponent/youtubevideolist/youtubevideolist.component';
import { NewslistComponent } from './_adminmaincomponent/newslist/newslist.component';
import { AddgalleryComponent } from './_adminmaincomponent/addgallery/addgallery.component';
import {GalleriaModule} from 'primeng/galleria';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotpasswordComponent,
    EditemailteplateComponent,
    NavbarComponent,
    CmsfaqComponent,
    AboutusComponent,
    ProfileupdateComponent,
    UploadproductComponent,
    ServicelistComponent,
    YoutubevideolistComponent,
    NewslistComponent,
    AddgalleryComponent
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
    YouTubePlayerModule,
    GalleriaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
