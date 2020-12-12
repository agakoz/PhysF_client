import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'https://localhost:8443/visits/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class VisitsService {

  constructor(private http: HttpClient) {
  }

  getIncomingVisits(patientId: number): Observable<any> {
    return this.http.get(API_URL + 'incomingVisits/' + patientId, httpOptions);
  }
}
