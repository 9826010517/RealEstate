import { Component, OnInit } from '@angular/core';
import { UseraccessService } from 'src/app/_service/useraccess.service';
import { CONSTANTS , serviceimage,galleryimages } from 'src/app/_service/constant';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  images: any[ ];
  apiImages = [];
  responsiveOptions:any[] = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];

  responsiveOptions2:any[] = [
      {
          breakpoint: '1500px',
          numVisible: 5
      },
      {
          breakpoint: '1024px',
          numVisible: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];

  displayBasic: boolean;

  displayBasic2: boolean;

  displayCustom: boolean;

  activeIndex: number = 0;

  constructor(private authservice: UseraccessService) { }

  ngOnInit(): void {

    // api calling
    this.authservice.get(CONSTANTS.frontgallery).subscribe((res: any) => {
      if(res){
      this.images = res;
      res.map(value=>{
        let newimages = {
          previewImageSrc :galleryimages+value.image_name ,
          thumbnailImageSrc :galleryimages+value.image_name ,
          "alt": "house image",
          "title": "house image"
        }
        this.apiImages.push(newimages);
      })
      this.images =  this.apiImages;
    }
    })
    // *************
//  let   getImg = [  {
//   "previewImageSrc": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
//   "thumbnailImageSrc": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
//   "alt": "Description for Image 1",
//   "title": "Title 1"
//   },{
//   "previewImageSrc": "https://1.bp.blogspot.com/-MdaQwrpT4Gs/Xdt-ff_hxEI/AAAAAAAAQXE/oOgnysGd9LwoFLMHJ0etngKzXxmQkWc5ACLcBGAsYHQ/s400/Beautiful-Backgrounds%2B%2528122%2529.jpg",
//   "thumbnailImageSrc": "https://1.bp.blogspot.com/-MdaQwrpT4Gs/Xdt-ff_hxEI/AAAAAAAAQXE/oOgnysGd9LwoFLMHJ0etngKzXxmQkWc5ACLcBGAsYHQ/s400/Beautiful-Backgrounds%2B%2528122%2529.jpg",
//   "alt": "Description for Image 1",
//   "title": "Title 1"
//   },
// {
//   "previewImageSrc": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
//   "thumbnailImageSrc": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
//   "alt": "Description for Image 1",
//   "title": "Title 1"
// },
// {
//   "previewImageSrc": "https://1.bp.blogspot.com/-MdaQwrpT4Gs/Xdt-ff_hxEI/AAAAAAAAQXE/oOgnysGd9LwoFLMHJ0etngKzXxmQkWc5ACLcBGAsYHQ/s400/Beautiful-Backgrounds%2B%2528122%2529.jpg",
//   "thumbnailImageSrc": "https://1.bp.blogspot.com/-MdaQwrpT4Gs/Xdt-ff_hxEI/AAAAAAAAQXE/oOgnysGd9LwoFLMHJ0etngKzXxmQkWc5ACLcBGAsYHQ/s400/Beautiful-Backgrounds%2B%2528122%2529.jpg",
//   "alt": "Description for Image 1",
//   "title": "Title 1"
// }];
//  this.images = getImg;
  }
  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
}
}
