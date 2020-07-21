import {Component, OnInit} from '@angular/core';
import {PatientsService} from '../_services/patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  patientsList: any;
  errorMessage: String;

  constructor(private patientsService: PatientsService) {
  }

  ngOnInit(): void {

  }

  onClick(): void {
    this.patientsService.getAllPatients().subscribe(
      data => {

        this.patientsList = data;

      },
      err => {
        this.errorMessage = err.error.message;
      });
    console.log(this.patientsList);
  }
}
