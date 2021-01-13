import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Patient} from '../../models/patient';
import {PatientsService} from '../../_services/patients.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorDialogComponent} from '../../error-dialog/error-dialog.component';

@Component({
  selector: 'app-patient-personal-update-dialog',
  templateUrl: './patient-personal-data-dialog.component.html',
  styleUrls: ['./patient-personal-data-dialog.component.scss'],
  styles: [`
    ::ng-deep .mat-horizontal-stepper-header-container {
      width: 70% !important;
      margin-left: auto !important;
      margin-right: auto;
    }
    /*:host /deep/ mat-horizontal-stepper .mat-horizontal-stepper-header-container .mat-step-icon {*/
    /*  background-color: #c2185b !important;*/
    /*  color: #fff !important;*/
    /*}*/

    /*::ng-deep .mat-step-header .mat-step-icon-selected {*/
    /*  background-color: red;*/
    /*}*/
  `],
})
export class PatientPersonalDataDialogComponent implements OnInit {
  patient: Patient;
  isLinear = true;
  errorMessage: string;
  patientForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private patientsService: PatientsService,
    private dialogRef: MatDialogRef<PatientPersonalDataDialogComponent>,
    public dialog: MatDialog,
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.patient = this.data.patient;
    this.setPatientForm();
  }

  resetFormAndCloseDialog(form): void {
    this.patient = this.data.patient;
    form.reset();
    this.closeDialog();
  }

  savePatient(): void {
    // console.log(this.patientForm.value)
    this.patientsService.updatePatient(this.patientForm.value).subscribe(updatedPatient => {
        console.log('success');
        updatedPatient.id = this.patient.id;
        this.dialogRef.close({event: 'Update', data: updatedPatient});


      },
      err => {
        this.errorMessage = err.error.message;
        // this.dialogRef.close({event: 'Error', data: err.error.message});
        this.dialog.open(ErrorDialogComponent, {
          width: '500px',
          data: {header: 'Edycja nie powiodła się', message: err.error.message}
        });
      });

    // this.closeDialog();
  }

  private setPatientForm() {
    this.patientForm = new FormGroup({
      id: new FormControl(this.patient.id),
      name: new FormControl(this.patient.name),
      surname: new FormControl(this.patient.surname),
      sex: new FormControl(this.patient.sex),
      birthDate: new FormControl(this.patient.birthDate),
      pesel: new FormControl(this.patient.pesel, [Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]),
      profession: new FormControl(this.patient.profession),
      address: new FormControl(this.patient.address),
      city: new FormControl(this.patient.city),
      phone: new FormControl(this.patient.phone, [Validators.minLength(9), Validators.maxLength(9), Validators.pattern("^[0-9]*$")]),
      email: new FormControl(this.patient.email, [Validators.email]),
      pastDiseases: new FormControl(this.patient.pastDiseases),
      chronicDiseases: new FormControl(this.patient.chronicDiseases),
      hospitalization: new FormControl(this.patient.hospitalization),
      surgeries: new FormControl(this.patient.surgeries),
      allergies: new FormControl(this.patient.allergies),
      familyDiseases: new FormControl(this.patient.familyDiseases),
      medicalCertificate: new FormControl(this.patient.medicalCertificate),
      extraDetails: new FormControl(this.patient.extraDetails),
    });
  }

  private closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  // getPatient(){
  //   this.patientsService.getPatient(this.patient.id)
  // }
}
