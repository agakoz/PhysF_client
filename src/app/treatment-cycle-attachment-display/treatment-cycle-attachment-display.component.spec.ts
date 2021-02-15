import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentCycleAttachmentDisplayComponent } from './treatment-cycle-attachment-display.component';

describe('TreatmentCycleAttachmentDisplayComponent', () => {
  let component: TreatmentCycleAttachmentDisplayComponent;
  let fixture: ComponentFixture<TreatmentCycleAttachmentDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatmentCycleAttachmentDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentCycleAttachmentDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
