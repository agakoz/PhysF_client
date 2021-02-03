import {Component, Input, OnInit} from '@angular/core';
import {VisitsService} from '../../_services/visits.service';
import {Patient} from '../../models/patient.model';
import {TreatmentCycle} from '../../models/treatment-cycle.model';
import {TreatmentCycleService} from '../../_services/treatment-cycle.service';
import {Visit} from '../../models/visit.model';
import {MatDialog} from '@angular/material/dialog';
import {TreatmentCycleHistoryDialogComponent} from '../../treatmentCycle/treatment-cycle-history-dialog/treatment-cycle-history-dialog.component';
import {FinishedVisitInfoComponent} from '../../treatmentCycle/finished-visit-info/finished-visit-info.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import jsPDF = require('jspdf') // // typescript without esModuleInterop flag
// import jsPDF from 'yworks-pdf' // using yworks fork
// import jsPDF from 'jspdf/dist/jspdf.node.debug' // for nodejs
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-patient-file-treatment-history-panel',
  templateUrl: './patient-file-treatment-history-panel.component.html',
  styleUrls: ['./patient-file-treatment-history-panel.component.scss']
})
export class PatientFileTreatmentHistoryPanelComponent implements OnInit {

  @Input() patient: Patient;
  errorMessage: string;
  treatmentCycleTitlesList: TreatmentCycle[];
  treatmentCycleVisits: Visit[];

  constructor(
    private visitsService: VisitsService,
    private treatmentCycleService: TreatmentCycleService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadTreatmentCycleList();

  }

  private loadTreatmentCycleList() {
    let patientId = this.patient.id;
    this.treatmentCycleService.getTreatmentCycleTitlesAndBodyParts(patientId).subscribe(
      data => {
        this.treatmentCycleTitlesList = data;
      });

  }

  loadVisits(treatmentCycleId: number) {
    this.treatmentCycleService.getTreatmentCycleFinishedVisitsTimeInfo(treatmentCycleId).subscribe(
      visits => {
        console.log(visits);
        this.treatmentCycleVisits = visits;
      }
    );
  }

  showTreatmentCycleHistory(treatmentCycleId: number) {
    this.dialog.open(TreatmentCycleHistoryDialogComponent, {
      disableClose: false,
      width: '1000px',
      minHeight: '95vh',
      autoFocus: false,
      data: {
        treatmentCycleId: treatmentCycleId,
        patientId: this.patient.id
      }
    });
  }

  showVisitInfo(visitId: number) {
    this.visitsService.getFinishedVisitInfo(visitId).subscribe(
      result => {
        this.dialog.open(
          FinishedVisitInfoComponent,
          {
            disableClose: false,
            width: '500px',
            data: {
              visit: result
            }
          });
      }
    );
  }


}
