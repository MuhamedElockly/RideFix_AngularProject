import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianModule } from './technician-module';

describe('TechnicianModule', () => {
  let component: TechnicianModule;
  let fixture: ComponentFixture<TechnicianModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicianModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
