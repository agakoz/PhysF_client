import {Component, OnInit} from '@angular/core';
import {PatientsService} from '../_services/patients.service';
import {MatDialog} from '@angular/material/dialog';
import {ManagePatientDialogComponent} from '../manage-patient-dialog/manage-patient-dialog.component';
import {VisitsDialogComponent} from '../visits-dialog/visits-dialog.component';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss', '../globalStyles.scss']
})
export class PatientsComponent implements OnInit {
  chosenPatients: Array<any>=[];
  public breakpoint: number;
  public colspan: number;
  patientsList: any;
  errorMessage: String;
  searchText = '';
  allChecked: boolean = false;
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

  patientsManagementDialog(): void {
    const dialogRef = this.dialog.open(ManagePatientDialogComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  incomingPatientVisits(id: number): void {
    console.log('incomingPatientVisits ' + id);
    const dialogRef = this.dialog.open(VisitsDialogComponent, {
      data: {patientId: id},
      width: '800px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  choosePatient(patient: any) {
    this.patientsService.choosePatient(patient);
  }

  toggle(checked: boolean, patient: any) {
    if(checked){
      this.chosenPatients.push(patient)
    }else {
     this.chosenPatients= this.chosenPatients.filter(p => p !== patient )
    }
    console.log(this.chosenPatients)
  }

  checkAll (){
    this.allChecked = this.patientsList != null && this.patientsList.forEach(p => {if(!this.isChosen(p)) this.chosenPatients.push(p)})
 console.log(this.chosenPatients)
  }
  isChosen(patient:any): boolean{
     this.chosenPatients.forEach(p=> {if(p==patient) return true})
    return false;
  }
}
