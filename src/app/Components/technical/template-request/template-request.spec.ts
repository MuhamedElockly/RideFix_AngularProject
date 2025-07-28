import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateRequest } from './template-request';

describe('TemplateRequest', () => {
  let component: TemplateRequest;
  let fixture: ComponentFixture<TemplateRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateRequest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateRequest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
