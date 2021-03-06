import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VisitsDialogComponent } from './visits-dialog.component';

describe('IncomingVisitsDialogComponent', () => {
  let component: VisitsDialogComponent;
  let fixture: ComponentFixture<VisitsDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
