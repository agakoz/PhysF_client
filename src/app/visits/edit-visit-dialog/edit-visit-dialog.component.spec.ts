import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditVisitDialogComponent } from './edit-visit-dialog.component';

describe('EditVisitDialogComponent', () => {
  let component: EditVisitDialogComponent;
  let fixture: ComponentFixture<EditVisitDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVisitDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVisitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
