import {Component, Input, OnInit} from '@angular/core';
import {PatientPersonalDataDialogComponent} from '../patient-personal-update-dialog/patient-personal-data-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {VisitsService} from '../../_services/visits.service';
import {PlanVisitDialogComponent} from '../../visits/plan-visit-dialog/plan-visit-dialog.component';

@Component({
  selector: 'app-patient-file-main-panel',
  templateUrl: './patient-file-main-panel.component.html',
  styleUrls: ['./patient-file-main-panel.component.scss']
})
export class PatientFileMainPanelComponent implements OnInit {
  @Input() patient: any;
  editPersonalData = true;
  incomingVisits: any[];
  errorMessage: string;

  constructor(public dialog: MatDialog, private visitsService: VisitsService) {
  }

  ngOnInit(): void {
    this.visitsService.getIncomingVisits(this.patient.id).subscribe(
      result => {
        this.incomingVisits = result;
      },
      err => {
        this.errorMessage = err.error.message;
      });
  }

  openPatientPersonalData(): void {
    this.dialog.open(PatientPersonalDataDialogComponent, {
      width: '1200px',
      data: {patient: this.patient},
      // backdropClass: "backdropBackground"
    }).afterClosed().subscribe(result => {
      if (result.event == 'Update') {
        this.patient = result.data;
      }
      // else if (result.event == 'Error') {
      //   console.log(result.data)
      //   this.dialog.open(ErrorDialogComponent, {
      //     width: '500px',
      //     data: {header: 'Edycja nie powiodła się', message: result.data}
      //   });
      // }
    });
  }

  openPlanVisit(): void {
    this.dialog.open(PlanVisitDialogComponent, {
      width: '600px',
      data: {patient: this.patient},
    });
  }
}
