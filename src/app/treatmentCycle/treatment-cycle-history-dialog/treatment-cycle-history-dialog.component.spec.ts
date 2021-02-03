import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentCycleHistoryDialogComponent } from './treatment-cycle-history-dialog.component';

describe('TreatmentCycleHistoryDialogComponent', () => {
  let component: TreatmentCycleHistoryDialogComponent;
  let fixture: ComponentFixture<TreatmentCycleHistoryDialogComponent>;

  beforeEach(async(() => {
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
