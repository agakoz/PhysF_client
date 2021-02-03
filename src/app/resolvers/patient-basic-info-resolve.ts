import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Patient} from '../models/patient.model';
import {PatientsService} from '../_services/patients.service';
import {Observable} from 'rxjs';

export class PatientBasicInfoResolve implements  Resolve<Patient>{

  constructor(private patientsService : PatientsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Patient> | Promise<Patient> | Patient {
    return this.patientsService.getPatientBasicInfo(route.paramMap.get('patientId'))
  }
}
