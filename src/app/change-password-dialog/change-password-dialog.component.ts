import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../_services/auth.service';
import {UserService} from '../_services/user.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {
  passwordChangeForm: FormGroup;
  hideCurrent: boolean;
  hideNew: boolean;
  errorMessage: string = '';
  isPasswordChangeFail: boolean;

  constructor(private userService: UserService, private dialogRef: MatDialogRef<ChangePasswordDialogComponent>) {
  }


  ngOnInit(): void {
    this.hideCurrent = true;
    this.hideNew = true;
    this.passwordChangeForm = new FormGroup({
      currentPassword: new FormControl(),
      newPassword: new FormControl()
    });
  }

  ngOnChange(): void {
    this.isPasswordChangeFail = false;
  }

  submit(): void {
    this.userService.changePassword(this.passwordChangeForm).subscribe(
      data => {
        console.log("sukces")
      },
      err => {
        console.log(err)
        this.errorMessage = err.error.message;
        this.isPasswordChangeFail = true;
      }
    );
  }

  close() {
    this.dialogRef.close()
  }
}
