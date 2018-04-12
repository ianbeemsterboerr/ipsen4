import {Player} from './player';

export class Team {
  constructor (
    public name: string,
    public members: Player[]
  ) {}
}
