import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Visit} from '../../models/visit.model';
import {DatePipe} from '@angular/common';
import {TreatmentCycle} from '../../models/treatment-cycle.model';
import {TreatmentCycleService} from '../../_services/treatment-cycle.service';
import {Patient} from '../../models/patient.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-visit-form-dialog',
  templateUrl: './visit-form-dialog.component.html',
  styleUrls: ['./visit-form-dialog.component.scss']
})
export class VisitFormDialogComponent implements OnInit {

  visit : Visit;
  patient:Patient;
  todayStr: any;
  today: Date
  treatmentCycleList: TreatmentCycle[];
  isTreatmentContinuation: boolean;
  visitForm : FormGroup;
  treatmentCycleForm : FormGroup;
  isPatientChosenFromContext : boolean

  constructor(
    private dialogRef: MatDialogRef<VisitFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe,
    private treatmentCycleService: TreatmentCycleService
  ) {
    dialogRef.disableClose = true;
    this.treatmentCycleList = []
  }

  ngOnInit(): void {
    if (this.data.patient != null) {
      this.patient = this.data.patient;
      this.isPatientChosenFromContext = true;
      this.loadTreatmentCycleList()
    }

    if (this.data.visit != null) {
      this.visit = this.data.visit;

      console.log(this.data.visit)
      console.log(this.visit == null ? null : this.visit.treatment == null ? null : this.visit.treatment)
    }
    this.visit = this.data.visit
    this.patient = this.data.patient
    this.today = new Date()
    this.todayStr = this.datePipe.transform(this.today, 'dd.MM.yyyy');

    this.visitForm = new FormGroup({
      patient: new FormControl({value: this.patient == null? null : this.patient.getFullName(), disabled: this.isPatientChosenFromContext}, Validators.required),
      date: new FormControl({value: this.today, disabled: false}, Validators.required),
      startTime: new FormControl({value: this.visit == null? null : this.visit.startTime, disabled: false}, Validators.required),
      endTime: new FormControl({value: this.visit == null? null : this.visit.endTime, disabled: false}, Validators.required),
      notes: new FormControl({value: this.visit == null? null : this.visit.notes, disabled: false}, Validators.required),
      treatmentCycle: new FormControl({}),
      treatment: new FormControl({value: this.visit == null ? null : this.visit.treatment == null ? null : this.visit.treatment, disabled: false}, Validators.required)
    })
this.treatmentCycleForm = new FormGroup({

})
  }

  approve() {
    // this.dialogRef.close({event: 'Approved'});
  }

  cancel() {
    this.dialogRef.close({event: 'Canceled'});
  }


  private loadTreatmentCycleList() {
    this.treatmentCycleService.getPatientTreatmentCycles(this.patient.id).subscribe(
      data => {
        this.treatmentCycleList = data;
        if (this.visit != null) {
          if(this.visit.treatmentCycleTitle) {
            this.isTreatmentContinuation = true
            if(this.treatmentCycleList != null) {

              const toSelect = this.treatmentCycleList.find(c => c.id == this.visit.treatmentCycleId);
              this.visitForm.get('treatmentCycle').setValue(toSelect);
            }
          }
        }
      });

  }

  manageContinuation() {
    this.isTreatmentContinuation = !this.isTreatmentContinuation;
    if (!this.isTreatmentContinuation) {
      this.visitForm.get('treatmentCycle').setValue(-1);
    }
  }
}
