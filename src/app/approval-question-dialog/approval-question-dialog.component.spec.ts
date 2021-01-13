import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalQuestionDialogComponent } from './approval-question-dialog.component';

describe('ApprovalQuestionDialogComponent', () => {
  let component: ApprovalQuestionDialogComponent;
  let fixture: ComponentFixture<ApprovalQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
