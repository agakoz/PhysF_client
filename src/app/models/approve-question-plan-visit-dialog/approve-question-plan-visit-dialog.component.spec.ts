import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ApproveQuestionPlanVisitDialogComponent } from './approve-question-plan-visit-dialog.component';

describe('ApproveQuestionPlanVisitDialogComponent', () => {
  let component: ApproveQuestionPlanVisitDialogComponent;
  let fixture: ComponentFixture<ApproveQuestionPlanVisitDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveQuestionPlanVisitDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveQuestionPlanVisitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
