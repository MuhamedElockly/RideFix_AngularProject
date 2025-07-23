import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechServieces } from './tech-servieces';

describe('TechServieces', () => {
  let component: TechServieces;
  let fixture: ComponentFixture<TechServieces>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechServieces]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechServieces);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
