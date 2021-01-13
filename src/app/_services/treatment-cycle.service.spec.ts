import { TestBed } from '@angular/core/testing';

import { TreatmentCycleService } from './treatment-cycle.service';

describe('TreatmentCycleService', () => {
  let service: TreatmentCycleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreatmentCycleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
