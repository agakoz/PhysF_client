import {Component, OnInit} from '@angular/core';
import {PatientsService} from '../../_services/patients.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {Patient} from '../../models/patient.model';
import {ManagePatientDialogComponent} from '../manage-patient-dialog/manage-patient-dialog.component';

@Component({
  selector: 'app-patient-file',
  templateUrl: './patient-file.component.html',
  styleUrls: ['./patient-file.component.scss', '../../globalStyles.scss']
})
export class PatientFileComponent implements OnInit {
  patient: Patient = null;

  errorMessage: string;
  view: string;
  title: any;
  mainView: string = "mainView"
  historyView: string = "historyView"

  constructor(private patientsService: PatientsService, public dialog: MatDialog, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.setMainView();
    console.log(this.view)
    let patientId = +this.getPatientId();
    this.getPatient(patientId);
    // this.title = getTitle();
  }

  private getPatient(patientId: number) {
    this.patientsService.getPatient(patientId).subscribe(
      result => {
        this.patient = result;
        this.setTitle();
      },
      err => {
        this.errorMessage = err.error.message;
      });
  }

  private setTitle(): void {
    this.title = this.patient.sex == "K" ? "Kartoteka pacjentki" : "Kartoteka pacjenta";
  }

  private getPatientId() {
    return this.route.snapshot.paramMap.get('id');
  }

  manageChosenPatients(): void {
    const dialogRef = this.dialog.open(ManagePatientDialogComponent, {
      width: '800px',
      data: {
        patient: this.patient
      }
    });
  }

  setMainView() {
    this.view = this.mainView
  }
  setHistoryView() {
    this.view = this.historyView
  }
}
