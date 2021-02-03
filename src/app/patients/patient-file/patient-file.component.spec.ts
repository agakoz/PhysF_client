import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatientFileComponent } from './patient-file.component';

describe('PatientFileComponent', () => {
  let component: PatientFileComponent;
  let fixture: ComponentFixture<PatientFileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
