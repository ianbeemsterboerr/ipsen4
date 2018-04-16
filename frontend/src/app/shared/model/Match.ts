import {Team} from './team';
import {Result} from './result';

export class Match {
  public results: Result[];

  constructor(
    public opponents: Team[]
  ) {
    this.results = [];
  }

  GetResultByTeam(team: Team): Result {
    for (const result of this.results) {
      if (team === result.team) {
        return result;
      }
    }

    return null;
  }

  HasTeams(): boolean {
    return this.opponents.length === 2;
  }
}
