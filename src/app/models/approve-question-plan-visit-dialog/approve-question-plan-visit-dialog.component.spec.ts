import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveQuestionPlanVisitDialogComponent } from './approve-question-plan-visit-dialog.component';

describe('ApproveQuestionPlanVisitDialogComponent', () => {
  let component: ApproveQuestionPlanVisitDialogComponent;
  let fixture: ComponentFixture<ApproveQuestionPlanVisitDialogComponent>;

  beforeEach(async(() => {
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
