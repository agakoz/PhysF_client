import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const PATIENTS_URL = 'https://localhost:8443/patients/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private http: HttpClient) {
  }

  getAllPatients(): Observable<any> {
    return this.http.get(PATIENTS_URL + 'all',
      httpOptions);
  }
}
