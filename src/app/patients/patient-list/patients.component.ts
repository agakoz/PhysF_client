import {Component, OnInit} from '@angular/core';
import {PatientsService} from '../../_services/patients.service';
import {MatDialog} from '@angular/material/dialog';
import {ManagePatientDialogComponent} from '../manage-patient-dialog/manage-patient-dialog.component';
import {VisitsDialogComponent} from '../../visits/visits-dialog/visits-dialog.component';
import {BehaviorSubject, Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Patient} from '../../models/patient.model';
import {switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss', '../../globalStyles.scss']
})
export class PatientsComponent implements OnInit {
  chosenPatientIds: any[] = [];
  public breakpoint: number;
  patientsList: Patient[]
  errorMessage: String;
  searchText = '';
  allChosen: boolean = false;
  selectedId: number;
  currentYear: number=new Date().getFullYear();

  constructor(private patientsService: PatientsService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;
    this.patientsService.getAllPatients().subscribe(
      result => {
        this.patientsList = result;
      },
      err => {
        this.errorMessage = err.error.message;
      });
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 700) ? 1 : 2;
  }



  showPatientVisits(id: number): void {
    console.log('incomingPatientVisits ' + id);
    const dialogRef = this.dialog.open(VisitsDialogComponent, {
      data: {patientId: id},
      width: '800px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  // openPatientFile(patient: any) {
  //   // routerLink="/patient-file"
  //   this.router.navigate(['/patient-file', {patient: patient}])
  // }

  // updateAllChosen() {
  //   this.allChosen = this.patientsList.patients != null && this.patientsList.patients.every(p => p.chosen);
  // }
  //
  // someChosen(): boolean {
  //   if (this.patientsList == null) {
  //     return false;
  //   } else {
  //     return this.patientsList.filter(p => p.chosen).length > 0 && !this.allChosen;
  //   }
  // }
  //
  // setAll(chosen: boolean) {
  //   this.allChosen = chosen;
  //   if (this.patientsList == null) {
  //     return;
  //   } else {
  //     this.setEveryoneChosen(chosen);
  //     this.putAllToList(chosen);
  //   }
  //   console.log(this.chosenPatientIds);
  // }
  //
  // private updateList(patient: any) {
  //   if (this.isChosen(patient)) {
  //     console.log(patient.id);
  //     this.chosenPatientIds.push(patient.id);
  //   } else {
  //     this.chosenPatientIds = this.chosenPatientIds.filter(p => p !== patient.id);
  //   }
  //   console.log(this.chosenPatientIds);
  //
  // }
  //
  // private isChosen(patient: any): boolean {
  //   return patient.chosen;
  // }
  //
  // private setEveryoneChosen(chosen: boolean) {
  //   this.patientsList.forEach(p => {
  //     p.chosen = chosen;
  //   });
  // }
  //
  // private putAllToList(chosen: boolean) {
  //   if (chosen) {
  //     this.putAllPatientsToChosenList();
  //   } else {
  //     this.chosenPatientIds = [];
  //   }
  // }
  //
  // private putAllPatientsToChosenList() {
  //   if (this.patientsList.length > 0) {
  //     this.chosenPatientIds = [];
  //     this.chosenPatientIds = this.patientsList.forEach(p => this.chosenPatientIds.push(p.id));
  //   }
  // }
  getPatientAge(patient: any): number {
    return this.currentYear-(new Date(patient.birthDate).getFullYear())
  }
}
