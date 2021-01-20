import {Deserializable} from './deserializable.model';

export class Patient implements Deserializable {

  public id: number;
  public name: string;
  public surname: string;
  public birthDate: Date;
  public pesel: string;
  public sex: string;
  public address: string;
  public city: string;
  public email: string;
  public phone: string;
  public lifestyle: string;
  public profession: string;
  public guardian: string;
  public pastDiseases: string;
  public chronicDiseases: string;
  public hospitalization: string;
  public surgeries: string;
  public pastTreatment: string;
  public allergies: string;
  public familyDiseases: string;
  public medicalCertificate: string;
  public extraDetails: string;

  deserialize(input: any): this {
    console.log("model: " + input)
    return Object.assign(this, input);
  }

  getFullName(): string  {
    return this.name + ' ' + this.surname;
  }

  getAge() : number {
    return (new Date().getFullYear())-(new Date(this.birthDate).getFullYear())
  }

  getPhoneInFormat(): string {
// return this.phone
    //501 141 254
    return this.phone.substr(0, 3) + "-" + this.phone.substr(3, 3) + "-" + this.phone.substr(6, 3)
  }

  isAdult() : boolean {
    return this.getAge() >= 18
  }
}
