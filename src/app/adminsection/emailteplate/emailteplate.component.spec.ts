import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailteplateComponent } from './emailteplate.component';

describe('EmailteplateComponent', () => {
  let component: EmailteplateComponent;
  let fixture: ComponentFixture<EmailteplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailteplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailteplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
