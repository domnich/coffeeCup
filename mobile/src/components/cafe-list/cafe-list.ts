import { Component } from '@angular/core';

/**
 * Generated class for the CafeListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
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
