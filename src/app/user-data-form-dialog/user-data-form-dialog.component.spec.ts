import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataFormDialogComponent } from './user-data-form-dialog.component';

describe('UserDataFormDialogComponent', () => {
  let component: UserDataFormDialogComponent;
  let fixture: ComponentFixture<UserDataFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDataFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDataFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
