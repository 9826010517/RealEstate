import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontendhomeComponent } from './frontendhome/frontendhome.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ServicesComponent } from './services/services.component';
import { GalleryComponent } from './gallery/gallery.component';
import { VideogalleryComponent } from './videogallery/videogallery.component';
import { NewsreadComponent } from './newsread/newsread.component';

const routes: Routes = [
  { path: '', component: FrontendhomeComponent},
  { path: 'contactus', component: ContactusComponent},
  { path: 'aboutus', component: AboutusComponent},
  { path: 'services', component: ServicesComponent},
  { path: 'gallery', component: GalleryComponent},
  { path: 'videogallery', component: VideogalleryComponent},
  { path: 'readnews', component: NewsreadComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendmoduleRoutingModule { }

