import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOwnerModule } from './car-owner-module';

describe('CarOwnerModule', () => {
  let component: CarOwnerModule;
  let fixture: ComponentFixture<CarOwnerModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarOwnerModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarOwnerModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
