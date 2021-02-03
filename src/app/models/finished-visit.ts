import {Visit} from './visit.model';

export class FinishedVisit extends Visit{
  public finished: boolean
  public treatment: string
}
