import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html',
  styleUrls: []
})
export class RatingComponent implements OnInit {

  @Output() rated = new EventEmitter<number>();

  rates: number[] = [1, 2, 3, 4, 5];
  rate: number = 0;
  previousRate: number = undefined;

  constructor() { }

  ngOnInit() {
  }

  setRate(value: number){
    this.rate = value;
    this.previousRate = undefined;
    this.rated.emit(value);
  }

  setTemporaryRate(value: number){
    if (this.previousRate === undefined)
      this.previousRate = this.rate;

    this.rate = value;
  }

  clearTemporaryRate(){
    if(this.previousRate != undefined){
      this.rate = this.previousRate;
      this.previousRate = undefined;
    }
  }
}
