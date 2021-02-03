import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TreatmentCycleHistoryDialogComponent } from './treatment-cycle-history-dialog.component';

describe('TreatmentCycleHistoryDialogComponent', () => {
  let component: TreatmentCycleHistoryDialogComponent;
  let fixture: ComponentFixture<TreatmentCycleHistoryDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentCycleHistoryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentCycleHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
