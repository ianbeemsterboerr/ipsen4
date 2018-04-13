/*tslint:disable:no-bitwise*/

import {Match} from './Match';
import {Team} from './team';
import {Bracket} from './bracket';

export class Tournament {
  public brackets: Bracket[];

  constructor(
    public name: string,
    public teams: Team[]
  ) {
    // todo: Implement bye's in case amount of teams is not to the power of two: https://en.wikipedia.org/wiki/Bye_(sports)
    if (!this.IsTeamsPowerOfTwo()) {
      throw new Error('The prototype requires the amount of teams to be a power of two.');
    }

    this.brackets = [];

    const bracketCount = Math.log2(this.teams.length);

    // Fill brackets array
    for (let i = 0; i < bracketCount; i++) {
      const matchesInBracket = this.teams.length / 2 / Math.pow(2, i);
      const matches: Match[] = [];

      // Fill array of empty matches
      for (let match = 0; match < matchesInBracket; match++) {
        matches.push(new Match([]));
      }

      this.brackets.push(new Bracket(matches));
    }


    // TODO: Shuffle team array

    // Fill first bracket
    for (let i = 0; i < this.teams.length; i++) {
      const matchIndex = Math.floor(i / 2);

      this.brackets[0].matches[matchIndex].opponents.push(this.teams[i]);
    }
  }

  private IsTeamsPowerOfTwo(): boolean {
    const x = this.teams.length;
    return (x & (x - 1)) === 0;
  }
}
