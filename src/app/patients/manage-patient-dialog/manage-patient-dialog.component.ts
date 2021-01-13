import {Component, Inject, OnInit} from '@angular/core';
import {PatientsService} from '../../_services/patients.service';
import {TokenStorageService} from '../../_services/token-storage.service';
import {AuthService} from '../../_services/auth.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-manage-patient-dialog',
  templateUrl: './manage-patient-dialog.component.html',
  styleUrls: ['./manage-patient-dialog.component.scss']
})
export class ManagePatientDialogComponent implements OnInit {
  panelOpenState = false;
  hide = true;
  userPassword;
  passwordInput;
  errorMessage;
  displayMsg = '';
  chosenPatients=[];


  constructor(@Inject(MAT_DIALOG_DATA) public data: Array<any>, private patientsService: PatientsService, private tokenStorage: TokenStorageService, private auth: AuthService) {
    this.chosenPatients = data
  }

  ngOnInit(): void {

  }

  deleteChosenPatients(): void {
    // let correctPassword = this.confirmPassword();
    // if (correctPassword) {
    //   this.deletePatients();
    // } else {
    //   this.displayMsg = 'Niepoprawne hasło.';
    // }
    this.auth.confirmPass(this.passwordInput).subscribe(result => {
      console.log('confirm password:');
      console.log(result);
      if (result == true) {

        this.patientsService.deletePatientsGroup(this.chosenPatients).subscribe(
          result => {
            console.log('success');
            this.displayMsg = 'Usunięto pomyślnie.';
            console.log('usunięto: ');
            console.log(result);

          },
          err => {
            this.displayMsg = 'Brak pacjentów do usunięcia';
          });


      } else {
        this.displayMsg = 'Niepoprawne hasło.';
      }

    });
  }

}
