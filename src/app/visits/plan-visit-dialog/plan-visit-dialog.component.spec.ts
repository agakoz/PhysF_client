import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlanVisitDialogComponent } from './plan-visit-dialog.component';

describe('PlanVisitDialogComponent', () => {
  let component: PlanVisitDialogComponent;
  let fixture: ComponentFixture<PlanVisitDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanVisitDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanVisitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
