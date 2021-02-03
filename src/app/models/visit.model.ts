import {Deserializable} from './deserializable.model';
import {DatePipe, Time} from '@angular/common';


export class Visit implements Deserializable {
  public id: number;
  public treatmentCycleTitle: string;
  public treatmentCycleId: number;
  public date: Date;
  public startTime: Time;
  public endTime: Time;
  public notes: string;
  public patientId: number;
  private datePipe: DatePipe = new DatePipe('pl-PL');

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

  getFormattedDate(): String {
   return this.datePipe.transform(this.date, 'dd/MM/yyyy')
  }
}

