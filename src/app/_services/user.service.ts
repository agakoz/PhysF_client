import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {Visit} from '../models/visit.model';
import {map} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';

const API_URL = 'https://localhost:8443/profile/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  // getPublicContent(): Observable<any> {
  //   return this.http.get(API_URL + 'all', { responseType: 'text' });
  // }
  //
  // getUserBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'user', { responseType: 'text' });
  // }
  //
  // getModeratorBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'mod', { responseType: 'text' });
  // }
  //
  // getAdminBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'admin', { responseType: 'text' });
  // }

  getPersonalInfo(): Observable<User> {
    return this.http.get<User>(API_URL + 'personalData', httpOptions).pipe(
      map(data => new User().deserialize(data))
    );
  }

  changePassword(passwordChangeForm: FormGroup): Observable<any> {
    return this.http.post(API_URL + 'changePassword', {
      currentPassword: passwordChangeForm.get('currentPassword').value,
      newPassword: passwordChangeForm.get('newPassword').value,
    });
  }

  updateUserInfo(userDataForm: FormGroup): Observable<any> {
    return this.http.post(API_URL + 'update/personal', {
      name: userDataForm.get('name').value,
      surname: userDataForm.get('surname').value,
      company: userDataForm.get('company').value,
      address: userDataForm.get('address').value,
      city: userDataForm.get('city').value,
      licenceNumber: userDataForm.get('licenceNumber').value,
      specializations: userDataForm.get('specializations').value,
      professionalTitle: userDataForm.get('professionalTitle').value,
      email: userDataForm.get('email').value,
    },
      {responseType: 'text'});
  }
}
