import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './adminsection/login/login.component';
import { ForgotpasswordComponent } from './adminsection/forgotpassword/forgotpassword.component';
import { AuthGuard } from 'src/app/_service/auth.guard';
import { Role } from 'src/app/_model/role';
import { EditemailteplateComponent } from './adminsection/editemailteplate/editemailteplate.component';
import { CmsfaqComponent } from './cms/cmsfaq/cmsfaq.component';
import { AboutusComponent } from './cms/aboutus/aboutus.component';
import { ProfileupdateComponent } from './profileupdate/profileupdate.component';
import { UploadproductComponent } from './products/uploadproduct/uploadproduct.component';
import { YoutubevideolistComponent } from './_adminmaincomponent/youtubevideolist/youtubevideolist.component';
import { ServicelistComponent } from './_adminmaincomponent/servicelist/servicelist.component';
import { NewslistComponent } from './_adminmaincomponent/newslist/newslist.component';
import { AddgalleryComponent } from './_adminmaincomponent/addgallery/addgallery.component';

const routes: Routes = [
{ path: 'login', component: LoginComponent },
{ path: 'forgotpassword', component: ForgotpasswordComponent},
{ path: 'editemail', component: EditemailteplateComponent,canActivate: [AuthGuard],data: { roles: Role.authRoles.Admin }},
{ path: 'faq', component: CmsfaqComponent,canActivate: [AuthGuard],data: { roles: Role.authRoles.User }},
{ path: 'cmsupdate', component: AboutusComponent,canActivate: [AuthGuard],data: { roles: Role.authRoles.User }},
{ path: 'updateprofile', component: ProfileupdateComponent,canActivate: [AuthGuard],data: { roles: Role.authRoles.User }},
{ path: 'uploadproduct', component: UploadproductComponent,canActivate: [AuthGuard],data: { roles: Role.authRoles.User }},
// new admin urls
{ path: 'videolisting', component: YoutubevideolistComponent,canActivate: [AuthGuard],data: { roles: Role.authRoles.Superadmin }},
{ path: 'servicelisting', component: ServicelistComponent,canActivate: [AuthGuard],data: { roles: Role.authRoles.Superadmin }},
{ path: 'newslisting', component: NewslistComponent,canActivate: [AuthGuard],data: { roles: Role.authRoles.Superadmin }},
{ path: 'addgallery', component: AddgalleryComponent,canActivate: [AuthGuard],data: { roles: Role.authRoles.Superadmin }},
{
  path: '',
  loadChildren: () =>
    import('./frontendmodule/frontendmodule.module').then(m => m.FrontendmoduleModule),
},
{path:'**', loadChildren: () =>
import('./frontendmodule/frontendmodule.module').then(m => m.FrontendmoduleModule)
}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
