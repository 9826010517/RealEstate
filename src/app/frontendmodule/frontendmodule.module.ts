import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FrontendmoduleRoutingModule } from './frontendmodule-routing.module';
import { FrontendhomeComponent } from './frontendhome/frontendhome.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ServicesComponent } from './services/services.component';
import { GalleryComponent } from './gallery/gallery.component';
import {GalleriaModule} from 'primeng/galleria';
import { FaqComponent } from './faq/faq.component';
import { VideogalleryComponent } from './videogallery/videogallery.component';
import { NewsreadComponent } from './newsread/newsread.component';
import { NewssectionComponent } from './newssection/newssection.component';
import { ContactformComponent } from './contactform/contactform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
@NgModule({
  declarations: [FrontendhomeComponent, HeaderComponent, FooterComponent, ContactusComponent, AboutusComponent, ServicesComponent, GalleryComponent, FaqComponent, VideogalleryComponent, NewsreadComponent, NewssectionComponent, ContactformComponent],
  imports: [
    CommonModule,
    FrontendmoduleRoutingModule,
    CarouselModule.forRoot(),
    GalleriaModule,
    FormsModule,
    ReactiveFormsModule,
    YouTubePlayerModule
  ],
  exports: [HeaderComponent,FooterComponent]
})
export class FrontendmoduleModule { }
