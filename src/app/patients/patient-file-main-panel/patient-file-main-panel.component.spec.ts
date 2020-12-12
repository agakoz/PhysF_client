import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFileMainPanelComponent } from './patient-file-main-panel.component';

describe('PatientFileMainPanelComponent', () => {
  let component: PatientFileMainPanelComponent;
  let fixture: ComponentFixture<PatientFileMainPanelComponent>;

  beforeEach(async(() => {
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
