import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Visit} from '../models/visit.model';
import {map} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {VisitEvent} from '../models/visitEvent.model';
import {FinishedVisit} from '../models/finished-visit';
import {stringify} from '@angular/compiler/src/util';
import {VisitAttachment} from '../models/visit-attachment.model';
import {ExternalAttachment} from '../models/external-attachment.model';

const VISIT_API_URL = 'https://localhost:8443/visit/';
const PATIENT_API_URL = 'https://localhost:8443/patient/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})
};
const httpOptionsMultipart = {
  headers: new HttpHeaders({'Content-Type': 'multipart/form-data', 'Accept': 'multipart/form-data'})
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

  planVisitForNewPatient(planVisitForm: FormGroup, newPatient: FormGroup) {
    return this.http.post(
      VISIT_API_URL + 'planVisitForNewPatient',
      {
        visit: {
          date: planVisitForm.get('date').value,
          treatmentCycleId: null,
          startTime: planVisitForm.get('startTime').value,
          endTime: planVisitForm.get('endTime').value,
          notes: planVisitForm.get('notes').value
        },
        patient: {
          name: newPatient.get('name').value,
          surname: newPatient.get('surname').value,
          phone: newPatient.get('phone').value
        }

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

  getVisitEvents(): Observable<VisitEvent[]> {
    return this.http.get<VisitEvent[]>(VISIT_API_URL + 'getCalendarEvents', httpOptions).pipe(
      map(data => data.map(data => new VisitEvent().deserialize(data)))
    );
  }

  getVisitEvent(visitId: number): Observable<VisitEvent> {
    return this.http.get<VisitEvent>(VISIT_API_URL + 'getCalendarEvent/' + visitId, httpOptions).pipe(
      map(data => new VisitEvent().deserialize(data))
    );
  }

  getVisitPlan(visitId: string | number): Observable<Visit> {
    return this.http.get<Visit>(VISIT_API_URL + 'incomingVisit/' + visitId, httpOptions).pipe(
      map(data => new Visit().deserialize(data))
    );
  }

  finishVisit(visitForm: FormGroup, treatmentCycleForm: FormGroup, externalAttachmentForm: FormGroup, visitAttachmentForm: FormGroup): Observable<any> {

    return this.http.post(
      VISIT_API_URL + 'finishVisit',
      {
        visit: {
          id: visitForm.get('id').value,
          date: visitForm.get('date').value,
          treatmentCycleId: visitForm.get('treatmentCycle').value == -1 ? -1 : visitForm.get('treatmentCycle').value.id,
          startTime: visitForm.get('startTime').value,
          endTime: visitForm.get('endTime').value,
          notes: visitForm.get('notes').value,
          treatment: visitForm.get('treatment').value,
          // patientId: visitForm.get('patient').value
        },
        treatmentCycle: {
          id: treatmentCycleForm.get('id').value == -1 ? -1 : visitForm.get('treatmentCycle').value.id,
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
          patientId: visitForm.get('patient').value
          // patientId: treatmentCycleForm.get('patient').value
        },

        externalAttachments: externalAttachmentForm.get('attachment') == null ? null : externalAttachmentForm.get('attachment').value,
        visitAttachments: visitAttachmentForm.get('attachment') == null ? null : visitAttachmentForm.get('attachment').value,
        // attachment: JSON.stringify(externalAttachmentForm.get("attachment").value)

      },
    );
  }


  getFinishedVisitInfo(visitId: number): Observable<FinishedVisit> {
    return this.http.get<FinishedVisit>(VISIT_API_URL + 'getFinishedVisit/' + visitId, httpOptions).pipe(
      map(visit => new FinishedVisit().deserialize(visit))
    );

  }

  checkAnotherVisitPlannedForGivenTime(visitId: number, planVisitForm: FormGroup): Observable<boolean> {
    console.log('service' + visitId);
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


  getAttachmentsAssignedToVisit(visitId: number): Observable<VisitAttachment[]> {
    return this.http.get<ExternalAttachment[]>(VISIT_API_URL + visitId + '/attachments', httpOptions).pipe(
      map(data => data.map(data => new ExternalAttachment().deserialize(data)))
    );
  }
}
