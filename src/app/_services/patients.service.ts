import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Patient} from '../models/patient.model';
import {Visit} from '../models/visit.model';
import {map} from 'rxjs/operators';
import {Form, FormGroup} from '@angular/forms';

const PATIENTS_URL = 'https://localhost:8443/patient/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private patientSource = new BehaviorSubject<any>('');

  constructor(private http: HttpClient) {
  }

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(PATIENTS_URL + 'all', httpOptions).pipe(
      map(data => data.map(data => new Patient().deserialize(data)))
    );
  }

  getPatient(id: number | string): Observable<Patient> {
    return this.http.get<Patient>(PATIENTS_URL + id, httpOptions).pipe(
      map(data => new Patient().deserialize(data))
    );
  }

  deletePatientById(patientId: number): Observable<any> {
    return this.http.delete(PATIENTS_URL + patientId, httpOptions);
  }

  // deleteAllPatients(): Observable<any> {
  //   return this.http.delete(PATIENTS_URL + 'delete/all',
  //     httpOptions);
  // }
  deletePatientsGroup(patientIds: number[]): Observable<any> {
    return this.http.post(PATIENTS_URL + 'delete', patientIds);
  }

  addPatient(patient: FormGroup): Observable<any> {
    return this.http.post(PATIENTS_URL + 'add', {
        name: patient.get('name').value,
        surname: patient.get('surname').value,
        birthDate: patient.get('birthDate').value,
        pesel: patient.get('pesel').value,
        sex: patient.get('sex').value,
        address: patient.get('address').value,
        city: patient.get('city').value,
        email: patient.get('email').value,
        phone: patient.get('phone').value,
        lifestyle: patient.get('lifestyle').value,
        profession: patient.get('profession').value,
        guardian: patient.get('guardian').value,
        pastDiseases: patient.get('pastDiseases').value,
        chronicDiseases: patient.get('chronicDiseases').value,
        hospitalization: patient.get('hospitalization').value,
        surgeries: patient.get('surgeries').value,
        allergies: patient.get('allergies').value,
        familyDiseases: patient.get('familyDiseases').value,
        medicalCertificate: patient.get('medicalCertificate').value,
        extraDetails: patient.get('extraDetails').value
      },
      httpOptions);
  }

  choosePatient(patient: Patient) {
    this.patientSource.next(patient);
  }

  updatePatient(patientId: number, patient: FormGroup): Observable<any> {
    return this.http.post(PATIENTS_URL + 'update/' + patientId, {
        name: patient.get('name').value,
        surname: patient.get('surname').value,
        birthDate: patient.get('birthDate').value,
        pesel: patient.get('pesel').value,
        sex: patient.get('sex').value,
        address: patient.get('address').value,
        city: patient.get('city').value,
        email: patient.get('email').value,
        phone: patient.get('phone').value,
        lifestyle: patient.get('lifestyle').value,
        profession: patient.get('profession').value,
        guardian: patient.get('guardian').value,
        pastDiseases: patient.get('pastDiseases').value,
        chronicDiseases: patient.get('chronicDiseases').value,
        hospitalization: patient.get('hospitalization').value,
        surgeries: patient.get('surgeries').value,
        allergies: patient.get('allergies').value,
        familyDiseases: patient.get('familyDiseases').value,
        medicalCertificate: patient.get('medicalCertificate').value,
        extraDetails: patient.get('extraDetails').value

      },
      httpOptions);
  }


  getPatientsBasicInfo(): Observable<Patient[]> {
    return this.http.get<Visit[]>(PATIENTS_URL + 'PatientsBasicInfo', httpOptions).pipe(
      map(data => data.map(data => new Patient().deserialize(data)))
    );
  }

  getPatientBasicInfo(patientId): Observable<Patient> {
    return this.http.get<Visit[]>(PATIENTS_URL + 'PatientBasicInfo/' + patientId, httpOptions).pipe(
      map(data => new Patient().deserialize(data))
    );
  }

  getPatientPersonalData(patientId) {
    return this.http.get<Patient>(PATIENTS_URL + 'personalData/' + patientId, httpOptions).pipe(
      map(data => new Patient().deserialize(data))
    );
  }
}
