import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewssectionComponent } from './newssection.component';

describe('NewssectionComponent', () => {
  let component: NewssectionComponent;
  let fixture: ComponentFixture<NewssectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewssectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewssectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
