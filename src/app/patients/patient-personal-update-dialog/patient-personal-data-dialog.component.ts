import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Patient} from '../../models/patient.model';
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
    this.patientForm = new FormGroup({
      id: new FormControl({value : this.patient.id, disabled: false}),
      name: new FormControl({value: this.patient.name, disabled: false}),
      surname: new FormControl({value: this.patient.surname, disabled: false}),
      sex: new FormControl({value:this.patient.sex, disabled: false}),
      birthDate: new FormControl({value:this.patient.birthDate, disabled: false}),
      pesel: new FormControl({value:this.patient.pesel, disabled: false}, [Validators.minLength(11), Validators.maxLength(11), Validators.pattern("^[0-9]*$")]),
      profession: new FormControl({value:this.patient.profession, disabled: false}),
      address: new FormControl({value:this.patient.address, disabled: false}),
      city: new FormControl({value:this.patient.city, disabled: false}),
      phone: new FormControl({value:this.patient.phone, disabled: false}, [Validators.minLength(9), Validators.maxLength(9), Validators.pattern("^[0-9]*$")]),
      email: new FormControl({value:this.patient.email, disabled: false}, [Validators.email]),
      pastDiseases: new FormControl({value:this.patient.pastDiseases, disabled: false}),
      chronicDiseases: new FormControl({value:this.patient.chronicDiseases, disabled: false}),
      hospitalization: new FormControl({value:this.patient.hospitalization, disabled: false}),
      surgeries: new FormControl({value:this.patient.surgeries, disabled: false}),
      allergies: new FormControl({value:this.patient.allergies, disabled: false}),
      familyDiseases: new FormControl({value:this.patient.familyDiseases, disabled: false}),
      medicalCertificate: new FormControl({value:this.patient.medicalCertificate, disabled: false}),
      extraDetails: new FormControl({value:this.patient.extraDetails, disabled: false}),
      lifestyle: new FormControl({value:this.patient.lifestyle, disabled: false}),
      guardian: new FormControl({value:this.patient.guardian, disabled: false}),
    });
  }

  resetFormAndCloseDialog(form): void {
    this.patient = this.data.patient;
    form.reset();
    this.closeDialog();
  }

  savePatient(): void {
    // console.log(this.patientForm.value)
    this.patientsService.updatePatient(this.patient.id, this.patientForm).subscribe(updatedPatient => {
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

  }

  private closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  // getPatient(){
  //   this.patientsService.getPatient(this.patient.id)
  // }
}
