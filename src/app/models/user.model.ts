import {Deserializable} from './deserializable.model';
import {DatePipe, Time} from '@angular/common';

export class User implements Deserializable {
  id : number;
  username: string;
  name: string;
  surname: string;
  company: string;
  address: string;
  city: string;
  licenceNumber: string;
  specializations: string;
  professionalTitle: string;
  birthDate: Date;
  email: string;

  private datePipe: DatePipe = new DatePipe('pl-PL');

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
  getFullName(): string  {
    return this.name + ' ' + this.surname;
  }

}
