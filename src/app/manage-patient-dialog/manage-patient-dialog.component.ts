import {Component, OnInit} from '@angular/core';
import {PatientsService} from '../_services/patients.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {AuthService} from '../_services/auth.service';

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


  constructor(private patientsService: PatientsService, private tokenStorage: TokenStorageService, private auth: AuthService) {
  }

  ngOnInit(): void {

  }

  deleteAllPatients(): void {

    this.auth.confirmPass(this.passwordInput).subscribe(result => {
      console.log('confirm password:');
      console.log(result);
      if (result == true) {

        this.patientsService.deleteAllPatients().subscribe(
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
