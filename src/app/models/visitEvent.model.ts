import {Deserializable} from './deserializable.model';
import {DatePipe, Time} from '@angular/common';
import {CalendarEvent} from 'angular-calendar';
import {EventColor} from 'calendar-utils';

export class VisitEvent implements Deserializable, CalendarEvent {
  public id: number;
  public start: Date;
  public end: Date;
  public date: Date;
  public title: string;
  public notes: string;
  public finished: boolean;
  public patientId: number;
  public color: EventColor;
  public cssClass: string = 'event-class';


  deserialize(input: any): this {

    return Object.assign(this, input);
  }


}

