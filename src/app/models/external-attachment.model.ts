import {Deserializable} from './deserializable.model';

export class ExternalAttachment implements Deserializable {
  public id: number;
  public fileId: number;
  public fileName: string;
  public description: string;
  public link: string


  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
