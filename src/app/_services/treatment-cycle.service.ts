import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Visit} from '../models/visit.model';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TreatmentCycle} from '../models/treatment-cycle.model';
import {ExternalAttachment} from '../models/external-attachment.model';
import {FormGroup} from '@angular/forms';

const TREATMENT_CYCLE_API_URL = 'https://localhost:8443/treatmentCycle/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TreatmentCycleService {

  constructor(private http: HttpClient) {
  }

  getPatientTreatmentCycles(patientId: number): Observable<TreatmentCycle[]> {
    return this.http.get<TreatmentCycle[]>(TREATMENT_CYCLE_API_URL + 'getAll/' + patientId, httpOptions).pipe(
      map(data => data.map(data => new TreatmentCycle().deserialize(data)))
    );
  }

  getTreatmentCycleData(cycleId: number): Observable<TreatmentCycle> {
    return this.http.get<TreatmentCycle>(TREATMENT_CYCLE_API_URL + 'getCycleInfo/' + cycleId, httpOptions).pipe(
      map(data => new TreatmentCycle().deserialize(data))
    );
  }

  getTreatmentCycleFinishedVisitsTimeInfo(treatmentCycleId: number): Observable<Visit[]> {

    return this.http.get<Visit[]>(TREATMENT_CYCLE_API_URL + 'getTreatmentCycleVisitsTimeInfo/' + treatmentCycleId, httpOptions).pipe(
      map(data => data.map(data => new Visit().deserialize(data)))
    );
  }

  getTreatmentCycleTitlesAndBodyParts(patientId: number): Observable<TreatmentCycle[]> {
    return this.http.get<TreatmentCycle[]>(TREATMENT_CYCLE_API_URL + 'getTreatmentCycleTitlesAndBodyParts/' + patientId, httpOptions).pipe(
      map(data => data.map(data => new TreatmentCycle().deserialize(data)))
    );
  }

  getTreatmentCycleExternalAttachments(treatmentCycleId: number): Observable<ExternalAttachment[]> {
    return this.http.get<ExternalAttachment[]>(TREATMENT_CYCLE_API_URL + treatmentCycleId + '/externalAttachments', httpOptions).pipe(
      map(data => data.map(data => new ExternalAttachment().deserialize(data)))
    );
  }

  saveExternalAttachments(treatmentCycleId: number, attachmentForm: FormGroup) {
    return this.http.post(TREATMENT_CYCLE_API_URL + treatmentCycleId + '/updateExternalAttachments',
      {
        attachments: attachmentForm.get('attachment').value
      },
      {responseType: 'text'}
    );
  }

  deleteExternalAttachment(treatmentCycleId: number, attachmentId: number) {
    return this.http.delete(
      TREATMENT_CYCLE_API_URL + treatmentCycleId + '/removeExternalAttachment/' + attachmentId,
      {responseType: 'text'});
  }
}
