import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profiletech } from './profiletech';

describe('Profiletech', () => {
  let component: Profiletech;
  let fixture: ComponentFixture<Profiletech>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profiletech]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Profiletech);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
