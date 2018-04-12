import { Component, OnInit } from '@angular/core';
import {Tournament} from '../shared/model/tournament';
import {Team} from '../shared/model/team';
import {Player} from '../shared/model/player';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {
  players: Player[] = [
    new Player('Player 1'),
    new Player('Player 2'),
    new Player('Player 3'),
    new Player('Player 4'),
    new Player('Player 5'),
    new Player('Player 6'),
    new Player('Player 7'),
    new Player('Player 8')
  ];

  teams: Team[] = [
    new Team('Team A', [this.players[0], this.players[1]]),
    new Team('Team B', [this.players[2], this.players[3]]),
    new Team('Team C', [this.players[4], this.players[5]]),
    new Team('Team C', [this.players[6], this.players[7]])
  ];

  tournament: Tournament = new Tournament(
    'Test tournament',
    this.teams
  );

  constructor() { }

  ngOnInit() {

  }

}
