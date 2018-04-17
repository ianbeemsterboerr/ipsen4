import {Component, Input, OnInit} from '@angular/core';
import {Result} from '../model/result';

@Component({
  selector: 'app-number-spinner',
  templateUrl: './number-spinner.component.html',
  styleUrls: ['./number-spinner.component.css']
})
export class NumberSpinnerComponent implements OnInit {
  @Input() result: Result;

  constructor() { }

  ngOnInit() {
  }

  increment() {
    this.result.score++;
  }

  decrement() {
    this.result.score--;
  }
}
