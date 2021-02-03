import {Component, Inject, OnInit} from '@angular/core';
import {Patient} from '../../models/patient.model';
import {Visit} from '../../models/visit.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TreatmentCycle} from '../../models/treatment-cycle.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {VisitsService} from '../../_services/visits.service';
import {DatePipe} from '@angular/common';
import {TreatmentCycleService} from '../../_services/treatment-cycle.service';
import {PatientsService} from '../../_services/patients.service';
import {ApproveQuestionPlanVisitDialogComponent} from '../../models/approve-question-plan-visit-dialog/approve-question-plan-visit-dialog.component';

@Component({
  selector: 'app-edit-visit-dialog',
  templateUrl: './edit-visit-dialog.component.html',
  styleUrls: ['./edit-visit-dialog.component.scss']
})
export class EditVisitDialogComponent implements OnInit {
  visitToEdit: Visit = null;
  planVisitForm: FormGroup;
  public minDate = new Date();
  treatmentContinuation: boolean = false;
  treatmentCycleList: TreatmentCycle[];
  patientList: Patient[];
  date: Date = null;
  today: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EditVisitDialogComponent>,
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
    this.today = new Date()
    this.planVisitForm = new FormGroup({
      patient: new FormControl({value: null, disabled: false}, Validators.required),
      date: new FormControl({value: null, disabled: false}, Validators.required),
      startTime: new FormControl({value: null, disabled: false}, Validators.required),
      endTime: new FormControl({value: null, disabled: false}, Validators.required),
      notes: new FormControl({value: null, disabled: false},),
      treatmentCycle: new FormControl({})
    });


    this.visitToEdit = this.data.visit;
    this.setPassedVisitData();
    this.loadPatientList();
  }

  private setPassedVisitData() {
    this.planVisitForm.get('date').setValue(this.visitToEdit.date);
    this.planVisitForm.get('startTime').setValue(this.visitToEdit.startTime);
    this.planVisitForm.get('endTime').setValue(this.visitToEdit.endTime);
    this.planVisitForm.get('notes').setValue(this.visitToEdit.notes);
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
    let patientId = this.getPatientId();
    if (patientId > -1) {
      this.treatmentCycleService.getPatientTreatmentCycles(patientId).subscribe(
        data => {
          this.treatmentCycleList = data;
          if (this.visitToEdit.treatmentCycleTitle) {
            this.treatmentContinuation = true;
            if (this.treatmentCycleList != null) {
              const toSelect = this.treatmentCycleList.find(c => c.id == this.visitToEdit.treatmentCycleId);
              this.planVisitForm.get('treatmentCycle').setValue(toSelect);
            }
          }
        });
    }
  }

  private loadPatientList(): void {
    this.patientsService.getPatientsBasicInfo().subscribe(
      data => {
        this.patientList = data;
        const toSelect = this.patientList.find(p => p.id == this.visitToEdit.patientId);
        this.planVisitForm.get('patient').setValue(toSelect);
        this.loadTreatmentCycleList();
      }
    );
  }

  onSubmit() {
    this.planVisitForm.get('date').setValue(this.datePipe.transform(this.planVisitForm.get('date').value, 'yyyy-MM-dd'));


    this.visitsService.checkAnotherVisitPlannedForGivenTime(this.visitToEdit.id, this.planVisitForm).subscribe(
      data => {
        console.log(data);
        if (data == true) {
          this.dialog.open(ApproveQuestionPlanVisitDialogComponent, {
            width: '600px',
          }).afterClosed().subscribe(result => {
            if (result.event == 'Approved') {
              this.updateVisitPlan();

            }
          });
        } else {
          this.updateVisitPlan();

        }
      }
    );
  }

  private updateVisitPlan() {
    this.visitsService.updateVisitPlan(this.visitToEdit.id, this.planVisitForm).subscribe(
      result => {
        this.dialogRef.close({event: 'Success'});
      },
      err => {
        console.log(err);

      });
  }

  getPatientPresentation(patient: Patient): string {
    return patient.getFullName() + ' ( ' + patient.getAge() + ' l.) ';
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
