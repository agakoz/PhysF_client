import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitAttachmentDisplayDialogComponent } from './visit-attachment-display-dialog.component';

describe('VisitAttachmentDisplayDialogComponent', () => {
  let component: VisitAttachmentDisplayDialogComponent;
  let fixture: ComponentFixture<VisitAttachmentDisplayDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitAttachmentDisplayDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitAttachmentDisplayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
