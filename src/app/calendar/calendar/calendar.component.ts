import {Component, Injectable, OnInit} from '@angular/core';
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
  addHours,
} from 'date-fns';
import {registerLocaleData} from '@angular/common';
import localePl from '@angular/common/locales/pl';
import {Subject} from 'rxjs';
import {adapterFactory} from 'angular-calendar/date-adapters/moment';
import {PlanVisitDialogComponent} from '../../visits/plan-visit-dialog/plan-visit-dialog.component';
import {MatDialog} from '@angular/material/dialog';

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
})
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
registerLocaleData(localePl);

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss', '../../globalStyles.scss'],
  providers: [{
    provide: CalendarDateFormatter,
    useClass: CustomDateFormatter
  }]

})
export class CalendarComponent implements OnInit {
  locale: string;
  viewDate: Date;
  activeDayIsOpen: boolean = true;
  monthView: CalendarView = CalendarView.Month;
  weekView: CalendarView = CalendarView.Week;
  dayView: CalendarView = CalendarView.Day;
  view: CalendarView;
  events: CalendarEvent[];
  refresh: Subject<any> = new Subject();

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.locale = 'pl';
    this.viewDate = new Date();
    this.view = this.weekView;
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

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('handle action: \naction: ' + action + '\n event: ' + event);
  }

  eventTimesChanged({event, newStart, newEnd,}: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  getChosenDay($event) {
    console.log($event)
    this.viewDate = $event
  }

  openPlanVisit() {
    this.dialog.open(PlanVisitDialogComponent, {
      width: '600px',
      data: {
        patient: undefined,
        title: 'Zaplanuj wizytę',
      },
    }).afterClosed().subscribe(result => {
      if (result.event == 'Success') {
        //this.loadIncomingVisits();
      }
    });
  }
}
