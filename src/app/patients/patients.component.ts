import {Component, OnInit} from '@angular/core';
import {PatientsService} from '../_services/patients.service';
import {MatDialog} from '@angular/material/dialog';
import {ManagePatientDialogComponent} from '../manage-patient-dialog/manage-patient-dialog.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss', '../globalStyles.scss']
})
export class PatientsComponent implements OnInit {
  public breakpoint: number;
  public colspan: number;

  patientsList: any;
  errorMessage: String;
  searchText = '';

  constructor(private patientsService: PatientsService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;
// this.colspan = (this.breakpoint == 1) ? 1: 2;
    this.patientsService.getAllPatients().subscribe(
      result => {

        this.patientsList = result;
        localStorage.setItem('patients', this.patientsList);
        console.log(this.patientsList);
      },
      err => {
        this.errorMessage = err.error.message;
      });
  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 700) ? 1 : 2;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ManagePatientDialogComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }


}
