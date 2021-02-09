import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injectable,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent, CalendarModule, CalendarNativeDateFormatter,
  CalendarView, DateAdapter, DateFormatterParams,
} from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours, differenceInMinutes, startOfHour,
} from 'date-fns';
import {registerLocaleData} from '@angular/common';
import localePl from '@angular/common/locales/pl';
import {Subject} from 'rxjs';
import {adapterFactory} from 'angular-calendar/date-adapters/moment';
import {PlanVisitDialogComponent} from '../../visits/plan-visit-dialog/plan-visit-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {VisitsService} from '../../_services/visits.service';
import {HandleEventQuestionDialogComponent} from '../handle-event-dialog/handle-event-question-dialog.component';
import {PatientsService} from '../../_services/patients.service';
import {Patient} from '../../models/patient.model';
import {Visit} from '../../models/visit.model';
import {VisitEvent} from '../../models/visitEvent.model';
import {VisitFormDialogComponent} from '../../visits/start-visit-dialog/visit-form-dialog.component';
import {EditVisitDialogComponent} from '../../visits/edit-visit-dialog/edit-visit-dialog.component';
import {ApprovalQuestionDialogComponent} from '../../approval-question-dialog/approval-question-dialog.component';
import {FinishedVisit} from '../../models/finished-visit';
import {FinishedVisitDisplayDialogComponent} from '../../visits/finished-visit-display-dialog/finished-visit-display-dialog.component';

@Injectable()
class CustomDateFormatter extends CalendarNativeDateFormatter {
  public dayViewHour({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat('pl', {
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  }

  public weekViewHour({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat('pl', {
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  }
}

CalendarModule.forRoot({
  provide: DateAdapter,
  useFactory: adapterFactory
}, {
  dateFormatter: {
    provide: CalendarDateFormatter,
    useClass: CustomDateFormatter
  }
});
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  cyan: {
    primary: '#009688',
    secondary: '#97c8c4',
  },
  gray: {
    primary: '#989898',
    secondary: '#b8b8b8',
  },
};
registerLocaleData(localePl);

@Component({
  selector: 'app-calendar',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss', '../../globalStyles.scss'],
  providers: [{
    provide: CalendarDateFormatter,
    useClass: CustomDateFormatter
  }]

})
export class CalendarComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer: ElementRef<HTMLElement>;

  locale: string;
  viewDate = new Date();
  activeDayIsOpen: boolean = true;
  monthView: CalendarView = CalendarView.Month;
  weekView: CalendarView = CalendarView.Week;
  dayView: CalendarView = CalendarView.Day;
  view: CalendarView;
  events: VisitEvent[];
  refresh: Subject<any> = new Subject();

  constructor(
    public dialog: MatDialog,
    private visitsService: VisitsService,
    private patientsService: PatientsService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.locale = 'pl';
    this.viewDate = new Date();
    this.view = this.weekView;
    this.loadVisitEvents();
    // this.scrollToCurrentView();
  }

  ngAfterViewInit(): void {
    // this.scrollToCurrentView();
  }

  viewChanged() {
    this.cdr.detectChanges();
    // this.scrollToCurrentView();
  }

  private scrollToCurrentView() {
    if (this.view === CalendarView.Week || CalendarView.Day) {
      // each hour is 60px high, so to get the pixels to scroll it's just the amount of minutes since midnight
      const minutesSinceStartOfDay = differenceInMinutes(
        startOfHour(new Date()),
        startOfDay(new Date())
      );
      const headerHeight = this.view === CalendarView.Week ? 60 : 0;
      this.scrollContainer.nativeElement.scrollTop =
        minutesSinceStartOfDay + headerHeight;
    }
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: VisitEvent): void {
    console.log(event);
    if (event.finished) {
      this.visitsService.getFinishedVisitInfo(event.id).subscribe(visit => this.openVisitInfoDisplay(visit));
    } else {
      this.dialog.open(HandleEventQuestionDialogComponent, {
        maxHeight: '680px',
        width: '600px',
      }).afterClosed().subscribe(result => {
        if (result.event == 'cancelVisit') {
          this.cancelVisit(event);
        } else if (result.event == 'editVisit') {
          this.visitsService.getVisitPlan(event.id).subscribe(visit => this.openEditVisitForm(visit));
          this.loadVisitEvents();
        } else if (result.event == 'startVisit') {
          this.visitsService.getVisitPlan(event.id).subscribe(visit => this.openStartVisitForm(visit));
        }
      });
    }
  }

  cancelVisit(eventToDelete: VisitEvent) {
    let message = 'Czy na pewno chcesz odwołać tę wizytę?';
    this.dialog.open(ApprovalQuestionDialogComponent, {
      width: '600px',
      data: message
    }).afterClosed().subscribe(result => {
      if (result.event == 'Approved') {
        this.visitsService.cancelVisitPlan(Number(eventToDelete.id)).subscribe(data => {
            this.events = this.events.filter((iEvent) => iEvent !== eventToDelete);
          }, error => console.log('error ' + error)
        );

      }
    });
  }

  openEditVisitForm(visit: Visit): void {
    this.dialog.open(EditVisitDialogComponent, {
      width: '600px',
      data: {
        visit: visit
      },
    }).afterClosed().subscribe(result => {
      if (result.event == 'Success') {
        this.visitsService.getVisitEvent(result.visitId).subscribe(
          updatedVisit => {
            updatedVisit.start = new Date(updatedVisit.start);
            updatedVisit.end = new Date(updatedVisit.end);
            updatedVisit.color = updatedVisit.finished ? colors.gray : colors.cyan;

            this.events = this.events.filter((iEvent) => iEvent.id !== updatedVisit.id);
            this.events = [
              ...this.events,
              updatedVisit,
            ];

          }
        );
      }
    });
  }

  openStartVisitForm(visit: Visit) {
    this.dialog.open(VisitFormDialogComponent, {
      width: '80%',
      maxHeight: '680px',
      data: {
        visit: visit,
        patientId: visit.patientId
      }
    }).afterClosed().subscribe(result => {
      if (result.event == 'Success') {
        this.visitsService.getVisitEvent(result.visitId).subscribe(
          finishedVisit => {
            finishedVisit.color = colors.gray;
            finishedVisit.start = new Date(finishedVisit.start);
            finishedVisit.end = new Date(finishedVisit.end);

            this.events = this.events.filter((iEvent) => iEvent.id !== finishedVisit.id);
            this.events = [
              ...this.events,
              finishedVisit,
            ];

          }
        );
      }
    });
  }

  private openVisitInfoDisplay(visit: FinishedVisit) {
    this.dialog.open(FinishedVisitDisplayDialogComponent, {
      width: '80%',
      height: '700px',
      data: {
        visit: visit,
        patientId: visit.patientId
      }
    });
  }

  eventTimesChanged({event, newStart, newEnd,}: CalendarEventTimesChangedEvent): void {
    // this.events = this.events.map((iEvent) => {
    //   if (iEvent === event) {
    //     return {
    //       ...event,
    //       start: newStart,
    //       end: newEnd,
    //     };
    //   }
    //   return iEvent;
    // });
    // this.handleEvent('Dropped or resized', event);
  }

  getChosenDay($event) {
    console.log($event);
    this.viewDate = $event;
  }

  openPlanVisit() {

    this.dialog.open(PlanVisitDialogComponent, {
      width: '600px',
      data: {
        patientId: undefined,
        title: 'Zaplanuj wizytę',
      },
    }).afterClosed().subscribe(result => {
      if (result.event == 'Success') {
        this.visitsService.getVisitEvent(result.visitId).subscribe(
          newVisit => {
            newVisit.start = new Date(newVisit.start);
            newVisit.end = new Date(newVisit.end);
            newVisit.color = colors.cyan;

            this.events = [
              ...this.events,
              newVisit,
            ];
          }
        );

      }
    });
  }

  private loadVisitEvents() {
    this.visitsService.getVisitEvents().subscribe(result => {
      this.events = result;
      this.events.forEach(event => {
        event.start = new Date(event.start);
        event.end = new Date(event.end);
        // // if (event.title == '' || event.title == null) {
        //   event.title = String(event.patientId);
        // // }
        if (event.finished) {
          event.color = colors.gray;
        } else {
          event.color = colors.cyan;
        }
      });
    });
  }


  startVisitWithoutPlan() {
    this.openStartVisitWithoutPlanForm();
  }


  openStartVisitWithoutPlanForm() {
    this.dialog.open(VisitFormDialogComponent, {
      width: '80%',
      height: '700px',
      data: {}
    }).afterClosed().subscribe(result => {
      if (result.event == 'Success') {
        this.visitsService.getVisitEvent(result.visitId).subscribe(
          newVisit => {
            newVisit.start = new Date(newVisit.start);
            newVisit.end = new Date(newVisit.end);
            newVisit.color = colors.gray;

            this.events = [
              ...this.events,
              newVisit,
            ];
          }
        );

      }
    });
  }

}
