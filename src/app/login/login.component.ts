import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: string;
  username: string;
  hide = true;
  public redirectUrl: string;
  infoMessage = '';

  constructor(
    private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router, private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if (params.loggedIn == 'false') {
          this.infoMessage = 'Zaloguj się, aby kontynuować!';

        }
      });
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;
    }

  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
// console.log( "token po logowaniu:" + this.tokenStorage.getToken());
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.tokenStorage.getUser().role;

        this.router.navigate(['profile']);
        // if (this.redirectUrl) {
        //
        //   this.redirectUrl = null;
        // }

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );


  }

  reloadPage(): void {
    window.location.reload();

  }


}
