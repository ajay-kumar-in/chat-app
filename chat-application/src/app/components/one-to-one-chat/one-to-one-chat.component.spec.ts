import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneToOneChatComponent } from './one-to-one-chat.component';

describe('OneToOneChatComponent', () => {
  let component: OneToOneChatComponent;
  let fixture: ComponentFixture<OneToOneChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneToOneChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneToOneChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
