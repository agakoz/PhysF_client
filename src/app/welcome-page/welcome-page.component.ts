import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  public breakpoint: number;

  constructor(
  ) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
  }


  signin: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.min(4) ]),
    password: new FormControl('', [Validators.required, Validators.min(4) ])
  });

  hide = true;
  get usernameInput() { return this.signin.get('username'); }
  get passwordInput() { return this.signin.get('password'); }




}
