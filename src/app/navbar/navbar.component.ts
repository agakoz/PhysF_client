import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', '../globalStyles.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private app: AppComponent) { }

  ngOnInit(): void {
  }

  logout() {
    this.app.logout();
  }
}
