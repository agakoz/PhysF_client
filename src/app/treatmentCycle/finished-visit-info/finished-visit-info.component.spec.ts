import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedVisitInfoComponent } from './finished-visit-info.component';

describe('FinishedVisitInfoComponent', () => {
  let component: FinishedVisitInfoComponent;
  let fixture: ComponentFixture<FinishedVisitInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishedVisitInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedVisitInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
