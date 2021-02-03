import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Visit} from '../models/visit.model';
import {VisitsService} from '../_services/visits.service';
import {Injectable} from '@angular/core';

@Injectable()
export class VisitPlanResolver implements Resolve<Visit> {

  constructor(private visitsService: VisitsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Visit> | Promise<Visit> | Visit {
    return this.visitsService.getVisitPlan(route.paramMap.get('visitId'));
  }
}
