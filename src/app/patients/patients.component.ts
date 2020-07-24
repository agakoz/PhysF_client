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

  onClick(): void {


  }
}
