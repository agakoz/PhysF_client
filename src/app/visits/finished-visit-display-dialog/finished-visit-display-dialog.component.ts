import {Component, Inject, OnInit} from '@angular/core';
import {Visit} from '../../models/visit.model';
import {TreatmentCycle} from '../../models/treatment-cycle.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Patient} from '../../models/patient.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DatePipe} from '@angular/common';
import {TreatmentCycleService} from '../../_services/treatment-cycle.service';
import {PatientsService} from '../../_services/patients.service';
import {VisitsService} from '../../_services/visits.service';
import {VisitFormDialogComponent} from '../start-visit-dialog/visit-form-dialog.component';
import {FinishedVisit} from '../../models/finished-visit';
import {ExternalAttachment} from '../../models/attachment.model';

@Component({
  selector: 'app-finished-visit-display-dialog',
  templateUrl: './finished-visit-display-dialog.component.html',
  styleUrls: ['./finished-visit-display-dialog.component.scss']
})
export class FinishedVisitDisplayDialogComponent implements OnInit {

  finishedVisit: FinishedVisit;
  // patientId: number;
  visitDateStr: any;
  // today: Date;
  // treatmentCycleList: TreatmentCycle[];
  // isTreatmentContinuation: boolean;
  visitForm: FormGroup;
  treatmentCycleForm: FormGroup;
  attachmentForm: FormGroup;
  // isPatientChosenFromContext: boolean;
  // patientsList: Patient[];
  patient: Patient;
  patientName: string;
  externalAttachments: ExternalAttachment[];

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
    // this.finishedVisit.disable();
    this.finishedVisit = this.data.visit;
    // this.treatmentCycleList = [];
    // this.patientsList = [];
    // this.today = new Date();
    this.visitDateStr = this.datePipe.transform(this.finishedVisit.date, 'dd.MM.yyyy');

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
    this.treatmentCycleForm = new FormGroup({
      id: new FormControl({value: null, disabled: false}),
      title: new FormControl({value: null, disabled: false}),
      bodyPart: new FormControl({value: null, disabled: false}),
      description: new FormControl({value: null, disabled: false}),
      injuryDate: new FormControl({value: null, disabled: false}),
      symptoms: new FormControl({value: null, disabled: false}),
      examinationDesc: new FormControl({value: null, disabled: false}),
      diagnosis: new FormControl({value: null, disabled: false}),
      treatment: new FormControl({value: null, disabled: false}),
      recommendations: new FormControl({value: null, disabled: false}),
      notes: new FormControl({value: null, disabled: true}),
      similarPastProblems: new FormControl({value: null, disabled: false}),
    });

    this.attachmentForm = this.fb.group({

      attachment: this.fb.array(
        [this.fb.group({
          id: new FormControl({value: -1, disabled: false}),
          fileName: new FormControl({value: '', disabled: false}),
          fileId: new FormControl({value: -1, disabled: false}),
          link: new FormControl({value: '', disabled: false}),
          description: new FormControl({value: '', disabled: false}, Validators.required),
        })]
      )
    });

    this.setPassedVisitData();
    this.treatmentCycleForm.disable();
    this.visitForm.disable();


  }

  private setPassedVisitData() {
    // this.loadTreatmentCycleList();
    this.getPatientBasicInfo();
    this.visitForm.get('id').setValue(this.finishedVisit.id);
    this.visitForm.get('date').setValue(this.finishedVisit.date);
    this.visitForm.get('startTime').setValue(this.finishedVisit.startTime);
    this.visitForm.get('endTime').setValue(this.finishedVisit.endTime);
    this.visitForm.get('notes').setValue(this.finishedVisit.notes);
    this.visitForm.get('treatment').setValue(this.finishedVisit.treatment);
    this.visitForm.get('treatmentCycle').setValue(this.finishedVisit.treatmentCycleTitle);

  }

  getPatientBasicInfo(): void {
    this.patientsService.getPatientBasicInfo(this.finishedVisit.patientId).subscribe(
      patient => {
        this.patient = patient;
        this.visitForm.get('patient').setValue(this.getPatientNameWithAge());
      }
    );
  }



  getPatientNameWithAge(): string {

    return this.patient.getNameWithAge();
  }

  cancel() {
    this.dialogRef.close({event: 'Canceled'});
  }


}
