import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../app.component';
import {MatDialog} from '@angular/material/dialog';
import {ChangePasswordDialogComponent} from '../change-password-dialog/change-password-dialog.component';
import {UserDataFormDialogComponent} from '../user-data-form-dialog/user-data-form-dialog.component';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', '../globalStyles.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private app: AppComponent, private dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
  }

  logout() {
    this.app.logout();
  }


  changePassword() {
    this.dialog.open(ChangePasswordDialogComponent, {
      width: '400px',
      height: '400px'
    })
  }

  showUserData() {
    this.userService.getPersonalInfo().subscribe(
      data => {
        this.dialog.open(UserDataFormDialogComponent, {
        data: {
          user : data
        }
        })
      }
    )

  }
}
