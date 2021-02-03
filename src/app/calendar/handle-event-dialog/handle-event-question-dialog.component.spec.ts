import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HandleEventQuestionDialogComponent } from './handle-event-question-dialog.component';

describe('HandleEventDialogComponent', () => {
  let component: HandleEventQuestionDialogComponent;
  let fixture: ComponentFixture<HandleEventQuestionDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HandleEventQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandleEventQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
