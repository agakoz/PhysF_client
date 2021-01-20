import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Patient} from '../../models/patient.model';
import {VisitsService} from '../../_services/visits.service';
import {DatePipe} from '@angular/common';
import {TreatmentCycle} from '../../models/treatment-cycle.model';
import {TreatmentCycleService} from '../../_services/treatment-cycle.service';
import {Visit} from '../../models/visit.model';

@Component({
  selector: 'app-plan-visit-dialog',
  templateUrl: './plan-visit-dialog.component.html',
  styleUrls: ['./plan-visit-dialog.component.scss']
})
export class PlanVisitDialogComponent implements OnInit {
  patient: Patient = null;
  visit: Visit = null;
  patientChosen: boolean = false;
  planVisitForm: FormGroup;
  public minDate = new Date();
  treatmentContinuation: boolean = false;
  treatmentCycleList: TreatmentCycle[];
  date : Date = null;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PlanVisitDialogComponent>,
    private visitsService: VisitsService,
    private datePipe: DatePipe,
    private treatmentCycleService: TreatmentCycleService) {
    dialogRef.disableClose = true;
    this.treatmentContinuation = false;
    this.treatmentCycleList = [];
  }

  ngOnInit(): void {
    if (this.data.patient != null) {
      this.patient = this.data.patient;
      this.patientChosen = true;
      this.loadTreatmentCycleList()
    }

    if (this.data.visit != null) {
      this.visit = this.data.visit;
    }


    this.planVisitForm = new FormGroup({
      patient: new FormControl({value: this.patient == null? null : this.patient.getFullName(), disabled: this.patientChosen}),
      date: new FormControl({value: this.visit == null? null : this.visit.date, disabled: false}),
      startTime: new FormControl({value: this.visit == null? null : this.visit.startTime, disabled: false}),
      endTime: new FormControl({value: this.visit == null? null : this.visit.endTime, disabled: false}),
      notes: new FormControl({value: this.visit == null? null : this.visit.notes, disabled: false}),
      treatmentCycle: new FormControl({})

    });


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

  private loadTreatmentCycleList() {
    this.treatmentCycleService.getPatientTreatmentCycles(this.patient.id).subscribe(
      data => {
        this.treatmentCycleList = data;

        if (this.data.visit != null) {
          if(this.visit.treatmentCycleTitle) {
            this.treatmentContinuation = true
            if(this.treatmentCycleList != null) {
              const toSelect = this.treatmentCycleList.find(c => c.id == this.visit.treatmentCycleId);
              this.planVisitForm.get('treatmentCycle').setValue(toSelect);
            }
          }
        }
      });

  }

  onSubmit() {
    this.planVisitForm.get('date').setValue(this.datePipe.transform(this.planVisitForm.get('date').value, 'yyyy-MM-dd'));
    if(this.visit != null) {
      this.updateVisitPlan()
    } else if (this.treatmentContinuation) {
      this.planNextVisit()
    } else {
      this.planFirstVisit()
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
    this.visitsService.planFirstVisit(this.planVisitForm, this.patient.id).subscribe(
      result => {
        this.dialogRef.close({event: 'Success'});
      },
      err => {
        console.log(err);

      });
  }

  private updateVisitPlan() {
    this.visitsService.updateVisitPlan(this.visit.id, this.planVisitForm).subscribe(
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
