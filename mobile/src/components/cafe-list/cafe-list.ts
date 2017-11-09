import { Component } from '@angular/core';


@Component({
  selector: 'cafe-list',
  templateUrl: 'cafe-list.html'
})
export class CafeListComponent {

  text: string;

  constructor() {
    console.log('Hello CafeListComponent Component');
    this.text = 'Hello World';
  }

}
