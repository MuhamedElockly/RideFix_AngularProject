import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MSummaryComponent } from './msummary-component';

describe('MSummaryComponent', () => {
  let component: MSummaryComponent;
  let fixture: ComponentFixture<MSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
