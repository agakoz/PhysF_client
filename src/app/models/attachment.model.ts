import {Deserializable} from './deserializable.model';

export class Attachment implements Deserializable{
  public id: number;
  public file: File;
  public visitId: number;
  public description: string;


  deserialize(input: any): this {
    console.log('model: ' + input);
    return Object.assign(this, input);
  }
}
