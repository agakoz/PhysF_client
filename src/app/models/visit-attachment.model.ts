import {Deserializable} from './deserializable.model';

export class VisitAttachment  implements Deserializable {
  public id: number;
  public fileId: number;
  public fileName: string;
  public description: string;


  deserialize(input: any): this {

    return Object.assign(this, input);
  }
}
