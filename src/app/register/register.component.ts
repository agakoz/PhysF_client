import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // <== add the imports!

import {Router} from '@angular/router';
import {DateAdapter, ErrorStateMatcher} from '@angular/material/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  // providers: [{
  //   provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  // }]
})
export class RegisterComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  hide = true;

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private authService: AuthService, private _formBuilder: FormBuilder, private router: Router, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('pl');
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],

    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  goBackToMain(): void {
    this.router.navigate(['']);
  }


}

