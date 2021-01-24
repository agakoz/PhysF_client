import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Patient} from '../../models/patient.model';
import {VisitsService} from '../../_services/visits.service';
import {DatePipe} from '@angular/common';
import {TreatmentCycle} from '../../models/treatment-cycle.model';
import {TreatmentCycleService} from '../../_services/treatment-cycle.service';
import {Visit} from '../../models/visit.model';
import {PatientsService} from '../../_services/patients.service';

@Component({
  selector: 'app-plan-visit-dialog',
  templateUrl: './plan-visit-dialog.component.html',
  styleUrls: ['./plan-visit-dialog.component.scss']
})
export class PlanVisitDialogComponent implements OnInit {
  patientPassed: Patient = null;
  visitPassed: Visit = null;
  patientChosen: boolean = false;
  planVisitForm: FormGroup;
  public minDate = new Date();
  treatmentContinuation: boolean = false;
  treatmentCycleList: TreatmentCycle[];
  patientList: Patient[];
  date: Date = null;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PlanVisitDialogComponent>,
    private visitsService: VisitsService,
    private datePipe: DatePipe,
    private treatmentCycleService: TreatmentCycleService,
    private patientsService: PatientsService) {
    dialogRef.disableClose = true;
    this.treatmentContinuation = false;
    this.treatmentCycleList = [];
  }

  ngOnInit(): void {
    if (this.data.patient != null) {
      this.patientPassed = this.data.patient;
      this.patientChosen = true;
      this.loadTreatmentCycleList();
    }

    if (this.data.visit != null) {
      this.visitPassed = this.data.visit;
    }


    this.planVisitForm = new FormGroup({
      patient: new FormControl({value: this.patientPassed == null ? null : this.patientPassed.getFullName(), disabled: this.patientChosen}),
      date: new FormControl({value: this.visitPassed == null ? null : this.visitPassed.date, disabled: false}),
      startTime: new FormControl({value: this.visitPassed == null ? null : this.visitPassed.startTime, disabled: false}),
      endTime: new FormControl({value: this.visitPassed == null ? null : this.visitPassed.endTime, disabled: false}),
      notes: new FormControl({value: this.visitPassed == null ? null : this.visitPassed.notes, disabled: false}),
      treatmentCycle: new FormControl({})

    });

    if (this.patientPassed == null) {
      this.loadPatientList();
    }
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  manageContinuation() {
    this.treatmentContinuation = !this.treatmentContinuation;
    if (!this.treatmentContinuation) {
      this.planVisitForm.get('treatmentCycle').setValue(-1);
    }
  }

  private loadTreatmentCycleList(): void {
    this.treatmentCycleService.getPatientTreatmentCycles(this.patientPassed.id).subscribe(
      data => {
        this.treatmentCycleList = data;

        if (this.data.visit != null) {
          if (this.visitPassed.treatmentCycleTitle) {
            this.treatmentContinuation = true;
            if (this.treatmentCycleList != null) {
              const toSelect = this.treatmentCycleList.find(c => c.id == this.visitPassed.treatmentCycleId);
              this.planVisitForm.get('treatmentCycle').setValue(toSelect);
            }
          }
        }
      });

  }

  private loadPatientList(): void {
    this.patientsService.getPatientsBasicInfo().subscribe(
      data => {
        this.patientList = data;
        console.log(this.patientList)
      }
  );
  }

  onSubmit() {
    this.planVisitForm.get('date').setValue(this.datePipe.transform(this.planVisitForm.get('date').value, 'yyyy-MM-dd'));
    if (this.visitPassed != null) {
      this.updateVisitPlan();
    } else if (this.treatmentContinuation) {
      this.planNextVisit();
    } else {
      this.planFirstVisit();
    }
  }

  private planNextVisit() {
    this.visitsService.planNextVisit(this.planVisitForm).subscribe(
      result => {
        this.dialogRef.close({event: 'Success'});
      },
      err => {
        console.log(err);

      });
  }

  private planFirstVisit() {
    this.visitsService.planFirstVisit(this.planVisitForm, this.patientPassed.id).subscribe(
      result => {
        this.dialogRef.close({event: 'Success'});
      },
      err => {
        console.log(err);

      });
  }

  private updateVisitPlan() {
    this.visitsService.updateVisitPlan(this.visitPassed.id, this.planVisitForm).subscribe(
      result => {
        this.dialogRef.close({event: 'Success'});
      },
      err => {
        console.log(err);

      });
  }

  // this.patientsService.addPatient(this.form).subscribe(data => {
  //     console.log(data);
  //     this.isSuccessful = true;
  //     this.isAddingFailed = false;
  //   },
  //   err => {
  //     this.errorMessage = err.error.message;
  //     console.log(this.errorMessage);
  //
  //     this.isAddingFailed = true;
  //   }
  // );
}
