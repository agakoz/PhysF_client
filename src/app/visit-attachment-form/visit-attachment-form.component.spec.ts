import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitAttachmentFormComponent } from './visit-attachment-form.component';

describe('VisitAttachmentFormComponent', () => {
  let component: VisitAttachmentFormComponent;
  let fixture: ComponentFixture<VisitAttachmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitAttachmentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitAttachmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
