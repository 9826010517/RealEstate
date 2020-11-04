import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditemailteplateComponent } from './editemailteplate.component';

describe('EditemailteplateComponent', () => {
  let component: EditemailteplateComponent;
  let fixture: ComponentFixture<EditemailteplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditemailteplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditemailteplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
