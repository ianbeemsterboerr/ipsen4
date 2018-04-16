import { Component, OnInit } from '@angular/core';
import {Tournament} from '../shared/model/tournament';
import {Team} from '../shared/model/team';
import {Player} from '../shared/model/player';
import {Bracket} from "../shared/model/bracket";

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {
  schema_height: number;
  schema_width: number;

  bracket_width: number = 200;

  players: Player[] = [];
  teams: Team[] = [];
  tournament: Tournament;

  constructor() { }

  ngOnInit() {
    // Generate teams and players
    const teamCount = 8;

    // Generate players
    for (let i = 0; i < teamCount * 2; i++) {
      this.players.push(new Player('Player ' + i));
    }

    // Generate teams
    for (let i = 0; i < teamCount; i++) {
      this.teams.push(
        new Team(
          'Team ' + i,
          [
            this.players[i * 2],
            this.players[i * 2 + 1]
          ]
        )
      );
    }

    this.tournament  = new Tournament(
      'Test tournament',
      this.teams
    );

    this.schema_width = this.tournament.brackets.length * this.bracket_width;
    this.schema_height = this.tournament.teams.length * 100;

    // print tournament
    for (const bracket of this.tournament.brackets) {
      console.log('Bracket: ' + this.tournament.brackets.indexOf(bracket));

      for (const match of bracket.matches) {
        let matchString = '\t match: ';

        for (const opponent of match.opponents) {
          matchString += opponent.name;

          if (match.opponents.indexOf(opponent) !== match.opponents.length - 1) {
            matchString += ' VS ';
          }
        }

        console.log(matchString);
      }
    }
  }

  CalculateBracketYOffset(bracket: Bracket) {
    return (this.schema_height / bracket.matches.length / 2)/2 - 50;
  }

  CalculateBracketYDistance(bracket: Bracket) {
    return this.schema_height / bracket.matches.length / 2;
  }
}
