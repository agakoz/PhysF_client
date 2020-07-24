import {Component, OnInit} from '@angular/core';
import {PatientsService} from '../_services/patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss', '../globalStyles.scss']
})
export class PatientsComponent implements OnInit {
  public breakpoint: number;
  patientsList: any;
  errorMessage: String;

  constructor(private patientsService: PatientsService) {

  }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;

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

}
