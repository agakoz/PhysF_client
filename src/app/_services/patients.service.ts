import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const PATIENTS_URL = 'https://localhost:8443/patient/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private patientSource = new BehaviorSubject<any>("");
  currentPatient = this.patientSource.asObservable();

  constructor(private http: HttpClient) {
  }

  getAllPatients(): Observable<any> {
    return this.http.get(PATIENTS_URL + 'all',
      httpOptions);
  }

  deletePatientById(patientId): Observable<any> {
    return this.http.delete(PATIENTS_URL + patientId,
      httpOptions);
  }

  deleteAllPatients(): Observable<any> {
    return this.http.delete(PATIENTS_URL + 'delete/all',
      httpOptions);
  }

  addPatient(patient): Observable<any> {
    return this.http.post(PATIENTS_URL+ 'add', {
        name: patient.name,
        surname: patient.surname,
        birthDate: patient.birthDate,
        pesel: patient.pesel,
        sex: patient.sex,
        address: patient.address,
        city: patient.ccity,
        email: patient.email,
        phone: patient.phoneNum,
        lifestyle: patient.lifestyle,
        profession: patient.profession,
        guardian: patient.guardian,
        pastDiseases: patient.pastDiseases,
        chronicDiseases: patient.chronicDiseases,
        hospitalization: patient.hospitalization,
        surgeries: patient.surgeries,
        pastTreatment: patient.pastTreatment,
        allergies: patient.allergies,
        familyDiseases: patient.familyDiseases,
        medicalCertificate: patient.medicalCertificate,
        extraDetails: patient.extraDetails
      },
      httpOptions);
  }
choosePatient(patient: any){
    this.patientSource.next(patient)
}

}
