import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubevideolistComponent } from './youtubevideolist.component';

describe('YoutubevideolistComponent', () => {
  let component: YoutubevideolistComponent;
  let fixture: ComponentFixture<YoutubevideolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubevideolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubevideolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
