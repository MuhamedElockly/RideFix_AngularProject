import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Historytech } from './historytech';

describe('Historytech', () => {
  let component: Historytech;
  let fixture: ComponentFixture<Historytech>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Historytech]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Historytech);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
