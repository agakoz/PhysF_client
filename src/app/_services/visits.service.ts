import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Visit} from '../models/visit.model';
import {map} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {VisitEvent} from '../models/visitEvent.model';
import {FinishedVisit} from '../models/finished-visit';

const VISIT_API_URL = 'https://localhost:8443/visit/';
const PATIENT_API_URL = 'https://localhost:8443/patient/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})
};
const newhttpOptions = {
  headers: new HttpHeaders({' responseType': 'text'})
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
    return this.http.post(VISIT_API_URL + 'cancel/' + visitId, {}, {responseType: 'text'});
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
    );
  }

  getVisits(): Observable<VisitEvent[]> {
    return this.http.get<VisitEvent[]>(VISIT_API_URL + 'getCalendarEvents', httpOptions).pipe(
      map(data => data.map(data => new VisitEvent().deserialize(data)))
    );
  }

  getVisitPlan(visitId: string | number): Observable<Visit> {
    return this.http.get<Visit>(VISIT_API_URL + 'incomingVisit/' + visitId, httpOptions).pipe(
      map(data => new Visit().deserialize(data))
    );
  }

  finishVisit(visitForm: FormGroup, treatmentCycleForm: FormGroup): Observable<any> {
    console.log(treatmentCycleForm.value);
    return this.http.post(
      VISIT_API_URL + 'finishVisit',
      {
        visit: {
          id: visitForm.get('id').value,
          date: visitForm.get('date').value,
          treatmentCycleId: visitForm.get('treatmentCycle').value.id,
          startTime: visitForm.get('startTime').value,
          endTime: visitForm.get('endTime').value,
          notes: visitForm.get('notes').value,
          treatment: visitForm.get('treatment').value
        },
        treatmentCycle: {
          title: treatmentCycleForm.get('title').value,
          bodyPart: treatmentCycleForm.get('bodyPart').value,
          description: treatmentCycleForm.get('description').value,
          injuryDate: treatmentCycleForm.get('injuryDate').value,
          symptoms: treatmentCycleForm.get('symptoms').value,
          examinationDesc: treatmentCycleForm.get('examinationDesc').value,
          diagnosis: treatmentCycleForm.get('diagnosis').value,
          treatment: treatmentCycleForm.get('treatment').value,
          recommendations: treatmentCycleForm.get('recommendations').value,
          notes: treatmentCycleForm.get('notes').value,
          similarPastProblems: treatmentCycleForm.get('similarPastProblems').value,
        }
      },
      {responseType: 'text'});
  }

  getFinishedVisitInfo(visitId: number): Observable<FinishedVisit> {
    return this.http.get<FinishedVisit>(VISIT_API_URL + 'getFinishedVisit/' + visitId, httpOptions).pipe(
      map(visit => new FinishedVisit().deserialize(visit))
    );

  }

  checkAnotherVisitPlannedForGivenTime(visitId: number, planVisitForm: FormGroup): Observable<boolean> {
    return this.http.post<boolean>(VISIT_API_URL + 'isVisitPlannedForGivenTime',
      {
        visitId: visitId,
        date: planVisitForm.get('date').value,
        startTime: planVisitForm.get('startTime').value,
        endTime: planVisitForm.get('endTime').value,
      });
  }


  getFinishedVisitsDataFromTreatmentCycle(treatmentCycleId: number): Observable<FinishedVisit[]> {
    return this.http.get<FinishedVisit[]>(VISIT_API_URL + 'finishedVisitsDataFromTreatmentCycle/' + treatmentCycleId).pipe(
      map(data => data.map(data => new FinishedVisit().deserialize(data)))
    );
  }
}
