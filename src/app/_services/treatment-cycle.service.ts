import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Visit} from '../models/visit.model';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TreatmentCycle} from '../models/treatment-cycle.model';

const TREATMENT_CYCLE_API_URL = 'https://localhost:8443/treatmentCycle/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TreatmentCycleService {

  constructor(private http: HttpClient) { }

  getPatientTreatmentCycles(patientId: number): Observable<TreatmentCycle[]> {
    return this.http.get<TreatmentCycle[]>(TREATMENT_CYCLE_API_URL + 'getAll/' + patientId, httpOptions).pipe(
      map(data => data.map(data => new TreatmentCycle().deserialize(data)))
    );
  }
}
