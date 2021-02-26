import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitAttachmentDisplayComponent } from './visit-attachment-display.component';

describe('VisitAttachmentDisplayComponent', () => {
  let component: VisitAttachmentDisplayComponent;
  let fixture: ComponentFixture<VisitAttachmentDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitAttachmentDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitAttachmentDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
