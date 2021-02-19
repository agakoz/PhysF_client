import {Deserializable} from './deserializable.model';

export class UploadedFile implements Deserializable {
  public name: string;
  public type: string;
  public data: Blob;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

}
