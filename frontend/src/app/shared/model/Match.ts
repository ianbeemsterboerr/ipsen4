import {Team} from './team';
import {Result} from './result';

export class Match {
  public result: Result[];

  constructor(
    public opponents: Team[]
  ) {
    this.result = [];
  }
}
