import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFileTreatmentHistoryPanelComponent } from './patient-file-treatment-history-panel.component';

describe('PatientFileTreatmentHistoryPanelComponent', () => {
  let component: PatientFileTreatmentHistoryPanelComponent;
  let fixture: ComponentFixture<PatientFileTreatmentHistoryPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientFileTreatmentHistoryPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFileTreatmentHistoryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
