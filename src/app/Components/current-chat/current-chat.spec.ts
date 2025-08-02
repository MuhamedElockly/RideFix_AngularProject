import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentChat } from './current-chat';

describe('CurrentChat', () => {
  let component: CurrentChat;
  let fixture: ComponentFixture<CurrentChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentChat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
