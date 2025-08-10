import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStep1 } from './register-step1';

describe('RegisterStep1', () => {
  let component: RegisterStep1;
  let fixture: ComponentFixture<RegisterStep1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterStep1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterStep1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
