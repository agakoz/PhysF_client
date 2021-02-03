import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatientPersonalDataDialogComponent } from './patient-personal-data-dialog.component';

describe('PatientPersonalUpdateDialogComponent', () => {
  let component: PatientPersonalDataDialogComponent;
  let fixture: ComponentFixture<PatientPersonalDataDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientPersonalDataDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPersonalDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
