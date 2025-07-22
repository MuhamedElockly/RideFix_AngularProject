import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechSelect } from './tech-select';

describe('TechSelect', () => {
  let component: TechSelect;
  let fixture: ComponentFixture<TechSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
