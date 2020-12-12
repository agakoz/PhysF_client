import {Component, Input, OnInit} from '@angular/core';
import {VisitsService} from '../../_services/visits.service';

@Component({
  selector: 'app-patient-file-treatment-history-panel',
  templateUrl: './patient-file-treatment-history-panel.component.html',
  styleUrls: ['./patient-file-treatment-history-panel.component.scss']
})
export class PatientFileTreatmentHistoryPanelComponent implements OnInit {

  @Input() patient: any;
  errorMessage: string;

  constructor(private visitsService: VisitsService) {
  }

  ngOnInit(): void {


  }

}
