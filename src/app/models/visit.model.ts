import {Deserializable} from './deserializable.model';
import {DatePipe, Time} from '@angular/common';

export class Visit implements Deserializable {
  public id: number;
  public treatmentCycleTitle: string;
  public treatmentCycleId: number;
  public date: Date;
  public startTime: Time;
  public endTime: Time;
  public treatment: string;
  public notes: string;
  private datePipe: DatePipe = new DatePipe('en-US');

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

  getFormattedDate(): String {
   return this.datePipe.transform(this.date, 'dd/MM/yyyy')
  }
}

