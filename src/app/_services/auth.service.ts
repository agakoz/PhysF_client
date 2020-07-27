import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = 'https://localhost:8443/auth/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      username: user.username,
      email: user.email,
      password: user.password,
      name: user.name,
      surname: user.surname,
      address: user.address,
      city: user.ccity,
      birthDate: user.birthdate,
      licenceNumber: user.licenceNumber,
      company: user.company,
      specializations: user.specialization

    }, httpOptions);
  }
  confirmPass(password): Observable<any>{
    return this.http.post(AUTH_API + 'confirmPassword', {
      password
    }, httpOptions);
    }



}
