import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDetailsalltech } from './request-detailsalltech';

describe('RequestDetailsalltech', () => {
  let component: RequestDetailsalltech;
  let fixture: ComponentFixture<RequestDetailsalltech>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestDetailsalltech]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestDetailsalltech);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
