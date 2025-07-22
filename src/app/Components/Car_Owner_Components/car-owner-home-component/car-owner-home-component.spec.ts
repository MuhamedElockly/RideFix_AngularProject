import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOwnerHomeComponent } from './car-owner-home-component';

describe('CarOwnerHomeComponent', () => {
  let component: CarOwnerHomeComponent;
  let fixture: ComponentFixture<CarOwnerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarOwnerHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarOwnerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
