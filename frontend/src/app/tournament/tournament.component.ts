import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Tournament} from '../shared/model/tournament';
import {Team} from '../shared/model/team';
import {Player} from '../shared/model/player';
import {Bracket} from '../shared/model/bracket';
import {Match} from '../shared/model/Match';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ScoreComponent} from './score/score.component';
import {Result} from '../shared/model/result';
import {tick} from '@angular/core/testing';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {
  schema_height: number;
  schema_width: number;

  bracket_width = 200;
  bracket_spacing = 60;
  bracket_distances: number[];

  players: Player[] = [];
  teams: Team[] = [];
  tournament: Tournament;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    // Generate teams and players
    const teamCount = 32;

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

    // Calculate values for svg display
    this.schema_width = this.tournament.brackets.length * this.bracket_width;
    this.schema_height = Math.max(this.tournament.teams.length * this.bracket_spacing, 800);
    this.bracket_distances = [];

    for (const bracket of this.tournament.brackets) {
      this.bracket_distances.push(this.schema_height / bracket.matches.length);
    }
  }

  CalculateBracketYOffset(bracket: Bracket) {
    return (this.schema_height / bracket.matches.length / 2) - (this.schema_height / this.tournament.brackets[0].matches.length / 2);
  }

  onMatchClick(match: Match) {
    if (!match.HasTeams()) { return; }

    const activeModal = this.modalService.open(ScoreComponent);
    activeModal.componentInstance.results = match.results;

    activeModal.result.then((result) => {
      this.tournament.MatchUpdated(match);
    }, (reason) => {
      console.log('User cancelled score input');
    });
  }
}
