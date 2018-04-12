import {Match} from './Match';
import {Team} from './team';

export class Tournament {
  public matches: Match[];
  public brackets: number;

  constructor(
    public name: string,
    public teams: Team[]
  ) {
    if (this.teams.length % 2 !== 0) {
      throw new Error('Cannot create Tournament with uneven amount of teams.');
    }

    this.brackets = Math.ceil(Math.log2(this.teams.length));

    this.matches = new Match[this.teams.length - 1];
    for (let i = 0; i < this.teams.length / 2; i++) {
      this.matches[i] = new Match(
        [
          this.teams[i * 2],
          this.teams[i * 2 + 1]
        ]
      );
    }

  }
}
