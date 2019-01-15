import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
  styleUrls: []
})

export class OrderComponent implements OnInit {

  config = [
    {
      type: 'input',
      label: 'Full name',
      name: 'name',
      placeholder: 'Enter your name',
    },
    {
      type: 'select',
      label: 'Favourite food',
      name: 'food',
      options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
      placeholder: 'Select an option',
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
