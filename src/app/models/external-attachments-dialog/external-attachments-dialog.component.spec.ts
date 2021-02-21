import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalAttachmentsDialogComponent } from './external-attachments-dialog.component';

describe('ExternalAttachmentsDialogComponent', () => {
  let component: ExternalAttachmentsDialogComponent;
  let fixture: ComponentFixture<ExternalAttachmentsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalAttachmentsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalAttachmentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
