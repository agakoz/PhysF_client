import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  public breakpoint: number;

  constructor(private tokenStorage: TokenStorageService, private router: Router
  ) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;
    if (this.tokenStorage.getUser()) {
      this.router.navigate(['patients'])
    }
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 700) ? 1 : 2;
  }



  goToRegisterPage(): void {
    this.router.navigate(['register']).then((e) => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });


  }
}
