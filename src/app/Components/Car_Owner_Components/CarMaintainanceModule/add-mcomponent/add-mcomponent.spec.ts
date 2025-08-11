import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMComponent } from './add-mcomponent';

describe('AddMComponent', () => {
  let component: AddMComponent;
  let fixture: ComponentFixture<AddMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
