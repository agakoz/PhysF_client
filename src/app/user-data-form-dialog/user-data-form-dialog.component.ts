import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../models/user.model';
import {MyErrorStateMatcher} from '../register/register.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-user-data-form-dialog',
  templateUrl: './user-data-form-dialog.component.html',
  styleUrls: ['./user-data-form-dialog.component.scss']
})
export class UserDataFormDialogComponent implements OnInit {
  user: User;
  matcher = new MyErrorStateMatcher();
  userDataForm: FormGroup;
   errorMessage: string;
   isUpdateFail: boolean


  constructor(
    private dialogRef: MatDialogRef<UserDataFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = this.data.user;
    this.isUpdateFail = false

    this.userDataForm = new FormGroup({
      name: new FormControl({value: this.user.name, disabled: false}),
      surname: new FormControl({value: this.user.surname, disabled: false}),
      company: new FormControl({value: this.user.company, disabled: false}),
      address: new FormControl({value: this.user.address, disabled: false}),
      city: new FormControl({value: this.user.city, disabled: false}),
      licenceNumber: new FormControl({value: this.user.licenceNumber, disabled: false}),
      specializations: new FormControl({value: this.user.specializations, disabled: false}),
      professionalTitle: new FormControl({value: this.user.professionalTitle, disabled: false}),
      email: new FormControl({value: this.user.email, disabled: false})
    });
  }

  // emailFormControl = new FormControl('', [
  //   // Validators.required,
  //   Validators.email,
  // ]);
  close() {
    this.dialogRef.close();
  }

  submit() {
    this.userService.updateUserInfo(this.userDataForm).subscribe(
      data => {
        this.close()
      }, err => {
        this.errorMessage = err.error.message
        this.isUpdateFail = true
      }
    )
  }
}
