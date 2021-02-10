import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentCycleAttachmentFormComponent } from './treatment-cycle-attachment-form.component';

describe('TreatmentCycleAttachmentFormComponent', () => {
  let component: TreatmentCycleAttachmentFormComponent;
  let fixture: ComponentFixture<TreatmentCycleAttachmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatmentCycleAttachmentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentCycleAttachmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
