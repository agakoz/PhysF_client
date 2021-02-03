import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DatePipe} from '@angular/common';
import {TreatmentCycleService} from '../../_services/treatment-cycle.service';
import {VisitsService} from '../../_services/visits.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PatientsService} from '../../_services/patients.service';
import {FinishedVisit} from '../../models/finished-visit';
import {Patient} from '../../models/patient.model';
import {UserService} from '../../_services/user.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-treatment-cycle-history-dialog',
  templateUrl: './treatment-cycle-history-dialog.component.html',
  styleUrls: ['./treatment-cycle-history-dialog.component.scss']
})
export class TreatmentCycleHistoryDialogComponent implements OnInit {

  treatmentCycleForm: FormGroup;
  visitForm: FormGroup;
  visitsList: FinishedVisit[];
  patient: Patient;
  user: User;

  constructor(
    private dialogRef: MatDialogRef<TreatmentCycleHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe,
    private treatmentCycleService: TreatmentCycleService,
    private visitsService: VisitsService,
    private patientsService: PatientsService,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.initTreatmentCycleForm();
    this.initVisitForm();
    this.loadTreatmentCycleData();
    this.loadUserData();
    this.loadPatientData();
    this.loadVisitsData();
  }

  private initTreatmentCycleForm() {
    this.treatmentCycleForm = new FormGroup({
      id: new FormControl({value: null, disabled: true}),
      title: new FormControl({value: null, disabled: true}),
      bodyPart: new FormControl({value: null, disabled: true}),
      description: new FormControl({value: null, disabled: true}),
      injuryDate: new FormControl({value: null, disabled: true}),
      symptoms: new FormControl({value: null, disabled: true}),
      examinationDesc: new FormControl({value: null, disabled: true}),
      diagnosis: new FormControl({value: null, disabled: true}),
      treatment: new FormControl({value: null, disabled: true}),
      recommendations: new FormControl({value: null, disabled: true}),
      notes: new FormControl({value: null, disabled: true}),
      similarPastProblems: new FormControl({value: null, disabled: true}),
    });
  }

  private loadTreatmentCycleData() {
    this.treatmentCycleService.getTreatmentCycleData(this.data.treatmentCycleId).subscribe(
      data => {
        this.treatmentCycleForm.get('title').setValue(data.title);
        this.treatmentCycleForm.get('description').setValue(data.description);
        this.treatmentCycleForm.get('bodyPart').setValue(data.bodyPart);
        this.treatmentCycleForm.get('injuryDate').setValue(data.injuryDate);
        this.treatmentCycleForm.get('symptoms').setValue(data.symptoms);
        this.treatmentCycleForm.get('examinationDesc').setValue(data.examinationDesc);
        this.treatmentCycleForm.get('diagnosis').setValue(data.diagnosis);
        this.treatmentCycleForm.get('treatment').setValue(data.treatment);
        this.treatmentCycleForm.get('recommendations').setValue(data.recommendations);
        this.treatmentCycleForm.get('notes').setValue(data.notes);
        this.treatmentCycleForm.get('similarPastProblems').setValue(data.similarPastProblems);

      },
      err => console.log(err)
    );
  }

  private loadPatientData() {
    this.patientsService.getPatientPersonalData(this.data.patientId).subscribe(
      result => {
        this.patient = result;

      }
    );
  }

  private loadVisitsData() {
    this.visitsService.getFinishedVisitsDataFromTreatmentCycle(this.data.treatmentCycleId).subscribe(
      result => {
        this.visitsList = result;
      }
    );
  }

  private initVisitForm() {
    this.visitForm = new FormGroup({
      id: new FormControl({},),
      date: new FormControl({value: null, disabled: true}),
      startTime: new FormControl({value: null, disabled: true}),
      endTime: new FormControl({value: null, disabled: true}),
      notes: new FormControl({value: null, disabled: true}),
    });
  }

  private loadUserData() {
    this.userService.getPersonalInfo().subscribe(
      data => {
        console.log(data)
        this.user = data;
      }
    );
  }
}
