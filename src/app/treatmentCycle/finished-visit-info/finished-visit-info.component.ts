import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {FinishedVisit} from '../../models/finished-visit';

@Component({
  selector: 'app-finished-visit-info',
  templateUrl: './finished-visit-info.component.html',
  styleUrls: ['./finished-visit-info.component.scss']
})
export class FinishedVisitInfoComponent implements OnInit {

  visitForm: FormGroup;
  visitDateStr: any;
  visit: FinishedVisit;

  constructor(private dialogRef: MatDialogRef<FinishedVisitInfoComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.visit = this.data.visit;
    this.visitDateStr = this.datePipe.transform(this.visit.date, 'dd.MM.yyyy');
    this.visitForm = new FormGroup({
      id: new FormControl({},),
      patient: new FormControl({value: null, disabled: false}, Validators.required),
      date: new FormControl({value: null, disabled: false}, Validators.required),
      startTime: new FormControl({value: null, disabled: false}, Validators.required),
      endTime: new FormControl({value: null, disabled: false}, Validators.required),
      notes: new FormControl({value: null, disabled: false}, Validators.required),
      treatmentCycle: new FormControl({value: null, disabled: false}),
      treatment: new FormControl({
        value: null, disabled: false
      }, Validators.required),
    });
    this.setPassedVisitData();
    this.visitForm.disable();
  }

  private setPassedVisitData() {
    this.visitForm.get('date').setValue(this.visit.date);
    this.visitForm.get('startTime').setValue(this.visit.startTime);
    this.visitForm.get('endTime').setValue(this.visit.endTime);
    this.visitForm.get('notes').setValue(this.visit.notes);
    this.visitForm.get('treatment').setValue(this.visit.treatment);
    this.visitForm.get('treatmentCycle').setValue(this.visit.treatmentCycleTitle);
  }

  cancel() {
    this.dialogRef.close({event: 'Canceled'});
  }

}
