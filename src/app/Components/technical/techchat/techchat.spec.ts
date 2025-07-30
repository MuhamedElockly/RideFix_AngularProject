import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Techchat } from './techchat';

describe('Techchat', () => {
  let component: Techchat;
  let fixture: ComponentFixture<Techchat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Techchat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Techchat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
