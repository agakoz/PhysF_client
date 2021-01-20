import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../register/register.component';
import {PatientsService} from '../../_services/patients.service';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';

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
  patientForm: FormGroup;
  form: any = {};
  isSuccessful = false;
  createdPatientId: number;

  constructor(private patientsService: PatientsService, private datePipe: DatePipe, private router: Router) {
  }

  errorMessage = '';
  isAddingFailed = false;
  matcher = new MyErrorStateMatcher();
  today: Date;
  minAdultDate: Date;

  ngOnInit(): void {
    this.patientForm = new FormGroup({
      name: new FormControl(),
      surname: new FormControl(),
      birthDate: new FormControl(),
      pesel: new FormControl(),
      sex: new FormControl(),
      address: new FormControl(),
      city: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      lifestyle: new FormControl(),
      profession: new FormControl(),
      guardian: new FormControl(),
      pastDiseases: new FormControl(),
      chronicDiseases: new FormControl(),
      hospitalization: new FormControl(),
      surgeries: new FormControl(),
      allergies: new FormControl(),
      familyDiseases: new FormControl(),
      medicalCertificate: new FormControl(),
      extraDetails: new FormControl(),
      // guardianName: new FormControl(),
      // guardianSurname: new FormControl(),
      // guardianBirthDate: new FormControl(),
      // guardianPesel: new FormControl(),
      // guardianSex: new FormControl(),
      // guardianAddress: new FormControl(),
      // guardianCity: new FormControl(),
      // guardianEmail: new FormControl(),
      // guardianPhone: new FormControl(),
    });
    this.today = new Date();
    this.minAdultDate = new Date();
    this.minAdultDate.setFullYear(this.today.getFullYear() - 18);
  }

  onSubmit(): void {
    this.patientForm.get('birthDate').setValue(this.datePipe.transform(this.patientForm.get('birthDate').value, 'yyyy-MM-dd'));
    this.patientsService.addPatient(this.patientForm).subscribe(data => {
        console.log(data);
        this.createdPatientId = data;
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


  goToPatientPage(): void {
    const navigationDetails: string[] = ['/patient/' + this.createdPatientId];

    this.router.navigate(navigationDetails);
  }

  patientIsAdult() {
    let age = new Date().getFullYear() - (new Date(this.patientForm.get('birthDate').value).getFullYear());
    return age >= 18;
  }
}
