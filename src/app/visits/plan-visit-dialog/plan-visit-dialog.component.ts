import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-plan-visit-dialog',
  templateUrl: './plan-visit-dialog.component.html',
  styleUrls: ['./plan-visit-dialog.component.scss']
})
export class PlanVisitDialogComponent implements OnInit {
  patient: any;
  patientChosen: boolean = false;
  planVisitForm: FormGroup;
  public minDate = new Date();


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<PlanVisitDialogComponent>,) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    if (this.data.patient != null) {
      this.patient = this.data.patient;
      this.patientChosen = true;
    }
    this.planVisitForm = new FormGroup({
      patient: new FormControl({value: this.patient.name + ' ' + this.patient.surname, disabled: this.patient}),
      date: new FormControl(),
      startTime: new FormControl(),
      length: new FormControl(),
      note: new FormControl()

    });
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }
}
