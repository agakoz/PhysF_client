import {Deserializable} from './deserializable.model';

export class TreatmentCycle implements Deserializable {
  public id: number;
  public patientId: number;
  public title: string;
  public description: string;
  public bodyPart: string;
  public injuryDate: string;
  public symptoms: string;
  public examinationDesc: string;
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
