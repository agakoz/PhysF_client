import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Visit} from '../models/visit.model';
import {map} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';

const VISIT_API_URL = 'https://localhost:8443/visit/';
const PATIENT_API_URL = 'https://localhost:8443/patient/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json' })
};
const newhttpOptions = {
  headers: new HttpHeaders({' responseType': 'text' })
};

@Injectable({
  providedIn: 'root'
})
export class VisitsService {

  constructor(private http: HttpClient) {
  }

  planFirstVisit(planVisitForm: FormGroup, patientId: number): Observable<any> {
    return this.http.post(
      VISIT_API_URL + 'planFirstVisit/' + patientId,
      {
        date: planVisitForm.get('date').value,
        startTime: planVisitForm.get('startTime').value,
        endTime: planVisitForm.get('endTime').value,
        notes: planVisitForm.get('notes').value
      },
      httpOptions);
  }

  planNextVisit(planVisitForm: FormGroup): Observable<any> {
    return this.http.post(
      VISIT_API_URL + 'planNextVisit',
      {
        date: planVisitForm.get('date').value,
        treatmentCycleId: planVisitForm.get('treatmentCycle').value.id,
        startTime: planVisitForm.get('startTime').value,
        endTime: planVisitForm.get('endTime').value,
        notes: planVisitForm.get('notes').value
      },
      {responseType: 'text'}
      );
  }

  getIncomingVisits(patientId: number): Observable<Visit[]> {
    return this.http.get<Visit[]>(PATIENT_API_URL + patientId + '/incomingVisits', httpOptions).pipe(
      map(data => data.map(data => new Visit().deserialize(data)))
    );
  }

  cancelVisitPlan(visitId: number): Observable<any> {
    return this.http.post(VISIT_API_URL + 'cancel/' + visitId, {},{responseType: 'text'});
  }

  updateVisitPlan(id: number, planVisitForm: FormGroup) {
    return this.http.post(
      VISIT_API_URL + 'updateVisitPlan/' + id,
      {
        date: planVisitForm.get('date').value,
        treatmentCycleId: planVisitForm.get('treatmentCycle').value.id,
        startTime: planVisitForm.get('startTime').value,
        endTime: planVisitForm.get('endTime').value,
        notes: planVisitForm.get('notes').value
      },
      {responseType: 'text'}
    )
  }
}
