import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManagePatientDialogComponent } from './manage-patient-dialog.component';

describe('ManagePatientDialogComponent', () => {
  let component: ManagePatientDialogComponent;
  let fixture: ComponentFixture<ManagePatientDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePatientDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePatientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
