import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductsComponents } from './all-products-components';

describe('AllProductsComponents', () => {
  let component: AllProductsComponents;
  let fixture: ComponentFixture<AllProductsComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllProductsComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProductsComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
