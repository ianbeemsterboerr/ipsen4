import {Component, Input, OnInit} from '@angular/core';
import {Result} from '../../shared/model/result';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  results: Result[];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
