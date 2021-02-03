import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VisitFormDialogComponent } from './visit-form-dialog.component';

describe('VisitFormDialogComponent', () => {
  let component: VisitFormDialogComponent;
  let fixture: ComponentFixture<VisitFormDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
