import { Component, OnInit } from '@angular/core';
import {PatientsService} from '../_services/patients.service';

@Component({
  selector: 'app-patient-file',
  templateUrl: './patient-file.component.html',
  styleUrls: ['./patient-file.component.scss', '../globalStyles.scss']
})
export class PatientFileComponent implements OnInit {
 currentPatient: any;
  constructor(private patientsService: PatientsService) { }

  ngOnInit(): void {
    this.patientsService.currentPatient.subscribe(patient => this.currentPatient = patient )
  }

}
