import {Component, Input, OnInit} from '@angular/core';
import {PatientPersonalDataDialogComponent} from '../patient-personal-update-dialog/patient-personal-data-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {VisitsService} from '../../_services/visits.service';
import {PlanVisitDialogComponent} from '../../visits/plan-visit-dialog/plan-visit-dialog.component';
import {PatientsService} from '../../_services/patients.service';
import {Visit} from '../../models/visit.model';
import {ApprovalQuestionDialogComponent} from '../../approval-question-dialog/approval-question-dialog.component';
import {VisitFormDialogComponent} from '../../visits/visit-form-dialog/visit-form-dialog.component';

@Component({
  selector: 'app-patient-file-main-panel',
  templateUrl: './patient-file-main-panel.component.html',
  styleUrls: ['./patient-file-main-panel.component.scss'],
})
export class PatientFileMainPanelComponent implements OnInit {
  @Input('patient') patient: any;
  editPersonalData = true;
  incomingVisits: Visit[];
  errorMessage: string;
  message: string;

  constructor(public dialog: MatDialog, private visitsService: VisitsService, private patientService: PatientsService) {
  }

  ngOnInit(): void {
    this.loadIncomingVisits();

  }

  private loadIncomingVisits() {
    this.visitsService.getIncomingVisits(this.patient.id).subscribe(
      result => {
        console.log(result);
        this.incomingVisits = result;
        this.incomingVisits.sort(function(a, b) {
          return Number(new Date(a.date)) - Number(new Date(b.date));
        });
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
      data: {
        patient: this.patient,
        title: 'Zaplanuj wizytę',
      },
    }).afterClosed().subscribe(result => {
      if (result.event == 'Success') {
        this.loadIncomingVisits();
      }
    });
  }

  openEditVisit(visit: Visit): void {
    this.dialog.open(PlanVisitDialogComponent, {
      width: '600px',
      data: {
        title: 'Edytuj plan wizyty',
       patient: this.patient,
        visit: visit
        },
    }).afterClosed().subscribe(result => {
      if (result.event == 'Success') {
        this.loadIncomingVisits();
      }
    });
  }

  cancelVisit(visitId: number) {
    this.message = 'Czy na pewno chcesz odwołać tę wizytę?';
    this.dialog.open(ApprovalQuestionDialogComponent, {
      width: '600px',
      data: this.message
    }).afterClosed().subscribe(result => {
      if (result.event == 'Approved') {
        this.visitsService.cancelVisitPlan(visitId).subscribe(data => {
            console.log("data " + data);
            this.loadIncomingVisits();
          }, error => console.log("error " + error)
        );

      }
    });
  }

  goToVisitForm(visit: Visit) {
    this.dialog.open(VisitFormDialogComponent, {
      width: '80%',
      height: '95%',
      data: {
        visit: visit,
        patient: this.patient
      }
    }).afterClosed().subscribe(result => {
      this.loadIncomingVisits();
    });
  }
}
