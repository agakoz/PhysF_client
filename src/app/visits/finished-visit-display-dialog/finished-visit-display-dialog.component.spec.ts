import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FinishedVisitDisplayDialogComponent } from './finished-visit-display-dialog.component';

describe('FinishedVisitDisplayDialogComponent', () => {
  let component: FinishedVisitDisplayDialogComponent;
  let fixture: ComponentFixture<FinishedVisitDisplayDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishedVisitDisplayDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedVisitDisplayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
