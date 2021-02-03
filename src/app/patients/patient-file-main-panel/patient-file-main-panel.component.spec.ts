import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatientFileMainPanelComponent } from './patient-file-main-panel.component';

describe('PatientFileMainPanelComponent', () => {
  let component: PatientFileMainPanelComponent;
  let fixture: ComponentFixture<PatientFileMainPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientFileMainPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFileMainPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
