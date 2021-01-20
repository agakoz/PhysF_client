import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentCycleFormComponent } from './treatment-cycle-form.component';

describe('TreatmentCycleFormComponent', () => {
  let component: TreatmentCycleFormComponent;
  let fixture: ComponentFixture<TreatmentCycleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentCycleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentCycleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
