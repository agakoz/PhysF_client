import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../register/register.component';
import {PatientsService} from '../patients.service';

@Component({
    selector: 'app-add-patient',
    templateUrl: './add-patient.component.html',
    styleUrls: ['./add-patient.component.scss', '../../globalStyles.scss'],
  styles: [`
  /*:host /deep/ mat-horizontal-stepper .mat-horizontal-stepper-header-container .mat-step-icon {*/
  /*  background-color: #c2185b !important;*/
  /*  color: #fff !important;*/
  /*}*/
  /* mat-step-icon-selected, .mat-step-icon-state-done .mat-step-icon-state-edit, .mat-step-icon {*/
  /*  background-color: blue !important;*/
  /*  color: blue !important;*/
  /*}*/

  `]
})
export class AddPatientComponent implements OnInit {
    isLinear = false;

    form: any = {};
    isSuccessful = false;

    constructor(private patientsService: PatientsService) {}

    errorMessage = '';
    isAddingFailed = false;
    matcher = new MyErrorStateMatcher();

    ngOnInit(): void {
    }

    onSubmit(): void {
        this.patientsService.addPatient(this.form).subscribe(data => {
                console.log(data);
                this.isSuccessful = true;
                this.isAddingFailed = false;
            },
            err => {
                this.errorMessage = err.error.message;
                console.log(this.errorMessage);

                this.isAddingFailed = true;
            }
        );
    }

    emailFormControl = new FormControl('', [
        // Validators.required,
        Validators.email,
    ]);

    isAdult() {
        return true;
    }
}
