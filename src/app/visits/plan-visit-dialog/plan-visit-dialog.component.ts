import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Patient} from '../../models/patient.model';
import {VisitsService} from '../../_services/visits.service';
import {DatePipe} from '@angular/common';
import {TreatmentCycle} from '../../models/treatment-cycle.model';
import {TreatmentCycleService} from '../../_services/treatment-cycle.service';
import {PatientsService} from '../../_services/patients.service';
import {Visit} from '../../models/visit.model';
import {ApprovalQuestionDialogComponent} from '../../approval-question-dialog/approval-question-dialog.component';
import {ApproveQuestionPlanVisitDialogComponent} from '../../models/approve-question-plan-visit-dialog/approve-question-plan-visit-dialog.component';

@Component({
  selector: 'app-plan-visit-dialog',
  templateUrl: './plan-visit-dialog.component.html',
  styleUrls: ['./plan-visit-dialog.component.scss']
})
export class PlanVisitDialogComponent implements OnInit {
  contextPatientId: number = null;
  planVisitForm: FormGroup;
  public minDate = new Date();
  treatmentContinuation: boolean = false;
  treatmentCycleList: TreatmentCycle[];
  patientList: Patient[];
  date: Date = null;
  today: any;
  newPatient: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<PlanVisitDialogComponent>,
    private visitsService: VisitsService,
    private datePipe: DatePipe,
    private treatmentCycleService: TreatmentCycleService,
    private patientsService: PatientsService) {
    dialogRef.disableClose = true;
    this.treatmentContinuation = false;
    this.treatmentCycleList = [];
    this.patientList = [];
  }

  ngOnInit(): void {
    this.today = new Date();
    if (this.data.patientId != null) {
      this.contextPatientId = this.data.patientId;
    }

    this.planVisitForm = new FormGroup({
      patient: new FormControl({value: 0, disabled: false}, Validators.required),
      date: new FormControl({value: null, disabled: false}, Validators.required),
      startTime: new FormControl({value: null, disabled: false}, Validators.required),
      endTime: new FormControl({value: null, disabled: false}, Validators.required),
      notes: new FormControl({value: null, disabled: false},),
      treatmentCycle: new FormControl({})
    });
    this.newPatient = new FormGroup({
      name: new FormControl({value: null, disabled: false}),
      surname: new FormControl({value: null, disabled: false}),
      phone: new FormControl({value: null, disabled: false}),
    });
    this.loadPatientList();

  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  manageContinuation() {
    this.treatmentContinuation = !this.treatmentContinuation;
    if (!this.treatmentContinuation) {
      this.planVisitForm.get('treatmentCycle').setValue(null);
    }
  }

  private loadTreatmentCycleList(): void {
    console.log(this.planVisitForm.get('patient').value);
    if (this.isPatientChosen()) {
      let patientId = this.getPatientId();
      if (patientId > -1 && patientId != null) {
        this.treatmentCycleService.getPatientTreatmentCycles(patientId).subscribe(
          data => {
            this.treatmentCycleList = data;
          });
      }
    }

  }

  private isPatientChosen() {
    return this.planVisitForm.get('patient').value != -1 || this.planVisitForm.get('patient').value != 0 || this.planVisitForm.get('patient').value != undefined;
  }

  private loadPatientList(): void {
    this.patientsService.getPatientsBasicInfo().subscribe(
      data => {
        this.patientList = data;
        if (this.data.patientId) {
          const toSelect = this.patientList.find(p => p.id == this.contextPatientId);
          this.planVisitForm.get('patient').setValue(toSelect);
          this.loadTreatmentCycleList();
        }

      }
    );
  }

  onSubmit() {
    this.planVisitForm.get('date').setValue(this.datePipe.transform(this.planVisitForm.get('date').value, 'yyyy-MM-dd'));

    this.visitsService.checkAnotherVisitPlannedForGivenTime(-1, this.planVisitForm).subscribe(
      data => {
        console.log(data);
        if (data == true) {
          this.dialog.open(ApproveQuestionPlanVisitDialogComponent, {
            width: '600px',
          }).afterClosed().subscribe(result => {
            if (result.event == 'Approved') {
              this.planVisit();

            }
          });
        } else {
          this.planVisit();
        }
      }
    );

  }

  private planVisit(): void {
    if (this.treatmentContinuation) {
      this.planNextVisit();
    } else if (this.isPlanForNewPatient()) {
      this.planVisitForNewPatient()
    } else {
      this.planFirstVisit();
    }
  }

  private isPlanForNewPatient() {
    return this.planVisitForm.get("patient").value == -1
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
    let patientId = this.planVisitForm.get('patient').value.id;
    this.visitsService.planFirstVisit(this.planVisitForm, patientId).subscribe(
      result => {
        this.dialogRef.close({event: 'Success'});
      },
      err => {
        console.log(err);

      });
  }

  private planVisitForNewPatient() {
this.visitsService.planVisitForNewPatient(this.planVisitForm, this.newPatient).subscribe(
  result => {
    this.dialogRef.close({event: 'Success'});
  },
  err => {
    console.log(err);

  }
)
  }

  managePatientChange() {

    this.treatmentContinuation = false;
    this.planVisitForm.get('treatmentCycle').setValue(null);
    this.loadTreatmentCycleList();
  }

  private getPatientId(): number {
    return this.planVisitForm.get('patient').value.id;
  }
}
