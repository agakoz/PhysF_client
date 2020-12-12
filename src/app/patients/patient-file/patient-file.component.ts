import {Component, OnInit} from '@angular/core';
import {PatientsService} from '../patients.service';
import {MatDialog} from '@angular/material/dialog';
import {PatientPersonalDataDialogComponent} from '../patient-personal-update-dialog/patient-personal-data-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Patient} from '../patient';

@Component({
  selector: 'app-patient-file',
  templateUrl: './patient-file.component.html',
  styleUrls: ['./patient-file.component.scss', '../../globalStyles.scss']
})
export class PatientFileComponent implements OnInit {
  patient: Patient;

  errorMessage: string;
  panel: any;

  constructor(private patientsService: PatientsService, public dialog: MatDialog, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.panel = "mainPanel";
    let patientId = +this.getPatientId();
    this.getPatient(patientId);
  }

  private getPatient(patientId: number) {
    this.patientsService.getPatient(patientId).subscribe(
      result => {
        this.patient = result;
      },
      err => {
        this.errorMessage = err.error.message;
      });
  }

  private getPatientId() {
    return this.route.snapshot.paramMap.get('id');
  }



}
