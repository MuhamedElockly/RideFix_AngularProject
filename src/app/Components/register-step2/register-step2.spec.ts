import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStep2 } from './register-step2';

describe('RegisterStep2', () => {
  let component: RegisterStep2;
  let fixture: ComponentFixture<RegisterStep2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterStep2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterStep2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
