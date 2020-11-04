import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsfaqComponent } from './cmsfaq.component';

describe('CmsfaqComponent', () => {
  let component: CmsfaqComponent;
  let fixture: ComponentFixture<CmsfaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsfaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsfaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
