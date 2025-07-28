import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateSweet } from './template-sweet';

describe('TemplateSweet', () => {
  let component: TemplateSweet;
  let fixture: ComponentFixture<TemplateSweet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateSweet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateSweet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
