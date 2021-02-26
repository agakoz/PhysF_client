import {Component, ElementRef, Inject, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Visit} from '../../models/visit.model';
import {DatePipe} from '@angular/common';
import {TreatmentCycle} from '../../models/treatment-cycle.model';
import {TreatmentCycleService} from '../../_services/treatment-cycle.service';
import {Patient} from '../../models/patient.model';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PatientsService} from '../../_services/patients.service';
import {VisitsService} from '../../_services/visits.service';

@Component({
  selector: 'app-visit-form-dialog',
  templateUrl: './visit-form-dialog.component.html',
  styleUrls: ['./visit-form-dialog.component.scss']
})
export class VisitFormDialogComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer: ElementRef<HTMLElement>;
  visitStarted: Visit;
  patientId: number;
  todayStr: any;
  today: Date;
  treatmentCycleList: TreatmentCycle[];
  isTreatmentContinuation: boolean;
  visitForm: FormGroup;
  treatmentCycleForm: FormGroup;
  isPatientChosenFromContext: boolean;
  patientsList: Patient[];
  patient: Patient;
  private patientList: Patient[];
  externalAttachmentForm: FormGroup
  visitAttachmentForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<VisitFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe,
    private treatmentCycleService: TreatmentCycleService,
    private patientsService: PatientsService,
    private visitsService: VisitsService,
    private fb: FormBuilder
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {

    this.treatmentCycleList = [];
    this.patientsList = [];
    this.today = new Date();
    this.todayStr = this.datePipe.transform(this.today, 'dd.MM.yyyy');

    this.visitForm = new FormGroup({
      id: new FormControl({},),
      patient: new FormControl({value: null, disabled: false}, Validators.required),
      date: new FormControl({value: null, disabled: false}, Validators.required),
      startTime: new FormControl({value: null, disabled: false}, Validators.required),
      endTime: new FormControl({value: null, disabled: false}, Validators.required),
      notes: new FormControl({value: null, disabled: false}, ),
      treatmentCycle: new FormControl({value: null, disabled: false}),
      treatment: new FormControl({
        value: null, disabled: false
      }, Validators.required),


    });
    this.treatmentCycleForm = new FormGroup({
      id: new FormControl({value: null, disabled: false}),
      title: new FormControl({value: null, disabled: false}, Validators.required),
      bodyPart: new FormControl({value: null, disabled: false}),
      description: new FormControl({value: null, disabled: false}),
      injuryDate: new FormControl({value: null, disabled: false}),
      symptoms: new FormControl({value: null, disabled: false}),
      examinationDesc: new FormControl({value: null, disabled: false}),
      diagnosis: new FormControl({value: null, disabled: false}),
      treatment: new FormControl({value: null, disabled: false}, ),
      recommendations: new FormControl({value: null, disabled: false}),
      notes: new FormControl({value: null, disabled: false}),
      similarPastProblems: new FormControl({value: null, disabled: false}),
    });
    this.externalAttachmentForm = this.fb.group({
    });
    this.visitAttachmentForm = this.fb.group({
    });

    if (this.isVisitStartedFromPlan()) {
      this.visitStarted = this.data.visit;
      this.setPassedVisitData();
    } else {
      this.isTreatmentContinuation = false;
      this.setNewVisit();
      this.loadPatientList();
    }
  }

  private setPassedVisitData() {
    this.loadTreatmentCycleList();
    this.getPatientBasicInfo();
    this.visitForm.get('id').setValue(this.visitStarted.id);
    this.visitForm.get('date').setValue(this.today < new Date(this.visitStarted.date)? this.today : this.visitStarted.date);
    this.visitForm.get('startTime').setValue(this.visitStarted.startTime);
    this.visitForm.get('endTime').setValue(this.visitStarted.endTime);
    this.visitForm.get('notes').setValue(this.visitStarted.notes);
  }

  get attachments() {
    return this.externalAttachmentForm.get('attachment') as FormArray;
  }

  approve() {
    this.visitForm.get('date').setValue(this.datePipe.transform(this.visitForm.get('date').value, 'yyyy-MM-dd'));
    this.visitsService.finishVisit(this.visitForm, this.treatmentCycleForm, this.externalAttachmentForm, this.visitAttachmentForm).subscribe(
      result => {
        this.dialogRef.close({event: 'Success', visitId: result});
      },
      err =>
        console.log(err)
    );
  }

  cancel() {
    this.dialogRef.close({event: 'Canceled'});
  }

  private loadTreatmentCycleList() {
    let patientId = this.getPatientId();
    console.log(patientId);
    this.treatmentCycleService.getPatientTreatmentCycles(patientId).subscribe(
      data => {
        this.treatmentCycleList = data;
        if (this.isVisitStartedFromPlan()) {
          this.visitStarted.treatmentCycleTitle != null ? this.isTreatmentContinuation = true : this.isTreatmentContinuation = false;
          if (this.isTreatmentContinuation && this.treatmentCycleList != null) {
            const toSelect = this.treatmentCycleList.find(c => c.id == this.visitStarted.treatmentCycleId);
            this.visitForm.get('treatmentCycle').setValue(toSelect);
          } else {
            this.visitForm.get('treatmentCycle').setValue(-1);
          }
        } else {
          this.visitForm.get('treatmentCycle').setValue(-1);
        }

        console.log(this.treatmentCycleList);

        this.treatmentCycleForm.get('id').setValue(this.visitForm.get('treatmentCycle').value);
      });

  }

  private getPatientId(): number {
    if (this.isVisitStartedFromPlan()) {
      return this.visitStarted.patientId;
    } else {
      return this.visitForm.get('patient').value;
    }

  }


  manageContinuation() {
    this.isTreatmentContinuation = !this.isTreatmentContinuation;
    if (!this.isTreatmentContinuation) {
      this.visitForm.get('treatmentCycle').setValue(-1);
    }
  }

  managePatientChange() {
    this.isTreatmentContinuation = false;
    this.visitForm.get('treatmentCycle').setValue(-1);
    this.loadTreatmentCycleList();
  }

  getPatientBasicInfo(): void {
    this.patientsService.getPatientBasicInfo(this.visitStarted.patientId).subscribe(
      patient => {
        this.patient = patient;
        this.visitForm.get('patient').setValue(patient.id);
      }
    );
  }

  getPatientNameWithAge(patient: Patient): string {
    return patient.getNameWithAge();
  }

  private isVisitStartedFromPlan() {
    return this.data.visit != null;
  }

  private loadPatientList(): void {
    this.patientsService.getPatientsBasicInfo().subscribe(
      data => {
        this.patientList = data;
      }
    );
  }

  private setNewVisit() {
    this.visitForm.get('id').setValue(-1);
  }

  showDate() {
    console.log(this.visitForm.get("date").value)
  }
}
