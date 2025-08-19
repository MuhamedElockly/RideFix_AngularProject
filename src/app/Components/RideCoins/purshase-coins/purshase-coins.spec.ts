import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurshaseCoins } from './purshase-coins';

describe('PurshaseCoins', () => {
  let component: PurshaseCoins;
  let fixture: ComponentFixture<PurshaseCoins>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurshaseCoins]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurshaseCoins);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
