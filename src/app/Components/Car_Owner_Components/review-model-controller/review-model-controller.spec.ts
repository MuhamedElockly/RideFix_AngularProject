import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewModelController } from './review-model-controller';

describe('ReviewModelController', () => {
  let component: ReviewModelController;
  let fixture: ComponentFixture<ReviewModelController>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewModelController]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewModelController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
