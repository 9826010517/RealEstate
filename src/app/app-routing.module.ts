import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './adminsection/login/login.component';
import { HomepageComponent } from './adminsection/homepage/homepage.component';
import { ForgotpasswordComponent } from './adminsection/forgotpassword/forgotpassword.component';
import { AuthGuard } from 'src/app/_service/auth.guard';
import { Role } from 'src/app/_model/role';
import { EmailteplateComponent } from './adminsection/emailteplate/emailteplate.component';
import { EditemailteplateComponent } from './adminsection/editemailteplate/editemailteplate.component';
import { CmsfaqComponent } from './cms/cmsfaq/cmsfaq.component';
import { AboutusComponent } from './cms/aboutus/aboutus.component';
import { CreateadminComponent } from './manageadmin/createadmin/createadmin.component';
import { AdminmanageComponent } from './manageadmin/adminmanage/adminmanage.component';
import { UpdateadminComponent } from './manageadmin/updateadmin/updateadmin.component';
import { ProfileupdateComponent } from './profileupdate/profileupdate.component';
import { UploadproductComponent } from './products/uploadproduct/uploadproduct.component';
import { YoutubevideolistComponent } from './_adminmaincomponent/youtubevideolist/youtubevideolist.component';
const routes: Routes = [
  //  { path: '', component: HomepageComponent, canActivate: [AuthGuard] ,data: { roles: Role.authRoles.User }},
{ path: 'adminhome', component: HomepageComponent, canActivate: [AuthGuard] ,data: { roles: Role.authRoles.User }},
{ path: 'login', component: LoginComponent },
{ path: 'forgotpassword', component: ForgotpasswordComponent},
{ path: 'emailtemplate', component: EmailteplateComponent,canActivate: [AuthGuard],data: { roles: Role.authRoles.Admin }},
{ path: 'editemail', component: EditemailteplateComponent,canActivate: [AuthGuard],data: { roles: Role.authRoles.Admin }},
{ path: 'faq', component: CmsfaqComponent,canActivate: [AuthGuard],data: { roles: Role.authRoles.User }},
{ path: 'cmsupdate', component: AboutusComponent,canActivate: [AuthGuard],data: { roles: Role.authRoles.User }},
{ path: 'createadmin', component: CreateadminComponent,canActivate: [AuthGuard],data: { roles: Role.authRoles.Superadmin }},
{ path: 'adminmanage', component: AdminmanageComponent,canActivate: [AuthGuard],data: { roles: Role.authRoles.Superadmin }},
{ path: 'updateadmin', component: UpdateadminComponent,canActivate: [AuthGuard],data: { roles: Role.authRoles.Superadmin }},
{ path: 'updateprofile', component: ProfileupdateComponent,canActivate: [AuthGuard],data: { roles: Role.authRoles.User }},
{ path: 'uploadproduct', component: UploadproductComponent,canActivate: [AuthGuard],data: { roles: Role.authRoles.User }},
// new admin urls
{ path: 'videolisting', component: YoutubevideolistComponent,canActivate: [AuthGuard],data: { roles: Role.authRoles.Superadmin }},
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
