import {Deserializable} from './deserializable.model';

export class TreatmentCycle implements Deserializable {
  public id: number;
  public patientId: number;
  public title: string;
  public description: string;
  public body_part: string;
  public injury_date: string;
  public symptoms: string;
  public examination_desc: string;
  public diagnosis: string;
  public treatment: string;
  public recommendations: string;
  public notes: string;
  public archival: string;
  public similarPastProblems: string;


  deserialize(input: any): this {
    return Object.assign(this, input);
  }

}
