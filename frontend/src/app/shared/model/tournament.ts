/*tslint:disable:no-bitwise*/

import {Match} from './Match';
import {Team} from './team';
import {Bracket} from './bracket';
import {Result} from './result';

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
        const newMatch = new Match([]);
        newMatch.results = [];
        newMatch.results.push(new Result(null, 0));
        newMatch.results.push(new Result(null, 0));
        matches.push(newMatch);
      }

      this.brackets.push(new Bracket(matches));
    }

    // TODO: Shuffle team array

    // Fill first bracket
    for (let i = 0; i < this.teams.length; i++) {
      const matchIndex = Math.floor(i / 2);

      this.brackets[0].matches[matchIndex].opponents.push(this.teams[i]);
      this.brackets[0].matches[matchIndex].results[i % 2].team = this.teams[i];
    }
  }

  public static DetermineWinner(match: Match): Team {
    return match.results[0].score > match.results[1].score ? match.results[0].team : match.results[1].team;
  }

  private IsTeamsPowerOfTwo(): boolean {
    const x = this.teams.length;
    return (x & (x - 1)) === 0;
  }

  public MatchUpdated(match: Match) {
    const bracket = this.FindMatchBracket(match);

    if (this.brackets.indexOf(bracket) !== this.brackets.length - 1) {
      const nextBracket = this.brackets[this.brackets.indexOf(bracket) + 1];
      const nextMatch = nextBracket.matches[Math.floor(bracket.matches.indexOf(match) / 2)];

      const winner = Tournament.DetermineWinner(match);

      nextMatch.opponents[bracket.matches.indexOf(match) % 2] = winner;
      nextMatch.results[nextMatch.opponents.indexOf(winner)].team = winner;
    }
  }

  public FindMatchBracket(match: Match): Bracket {
    for (const bracket of this.brackets) {
      for (const bracketMatch of bracket.matches) {
        if (bracketMatch === match) {
          return bracket;
        }
      }
    }

    return null;
  }
}
