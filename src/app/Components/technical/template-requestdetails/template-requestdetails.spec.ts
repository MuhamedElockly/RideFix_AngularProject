import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateRequestdetails } from './template-requestdetails';

describe('TemplateRequestdetails', () => {
  let component: TemplateRequestdetails;
  let fixture: ComponentFixture<TemplateRequestdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateRequestdetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateRequestdetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
