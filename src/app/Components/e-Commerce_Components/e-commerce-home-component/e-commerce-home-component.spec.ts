import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ECommerceHomeComponent } from './e-commerce-home-component';

describe('ECommerceHomeComponent', () => {
  let component: ECommerceHomeComponent;
  let fixture: ComponentFixture<ECommerceHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ECommerceHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ECommerceHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
