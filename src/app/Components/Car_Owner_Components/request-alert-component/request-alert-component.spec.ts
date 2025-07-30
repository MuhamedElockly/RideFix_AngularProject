import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAlertComponent } from './request-alert-component';

describe('RequestAlertComponent', () => {
  let component: RequestAlertComponent;
  let fixture: ComponentFixture<RequestAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
