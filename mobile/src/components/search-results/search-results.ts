import { Component, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { DataService } from '../../providers/shared/shared.service';
import { Cafe, FilteredCafes } from "../../models/cafe.interface";
import {Observable} from "rxjs/Observable";
import { Keyboard } from '@ionic-native/keyboard';
import { Content } from 'ionic-angular';

@Component({
  selector: 'search-results',
  templateUrl: 'search-results.html'
})
export class SearchResultsComponent {
  @ViewChild('Content') content: Content;
  public showResultsContainer: boolean = true;
  public cafes: Cafe[] = [];
  constructor(private element: ElementRef, private shareData: DataService, private keyboard: Keyboard) {
    console.log(this.content, 'CONTENT')
    this.shareData.filteredCafesSubscriber.subscribe((obj: FilteredCafes) => {
      this.showResultsContainer = !!(Object.keys(obj) && Object.keys(obj).length && (obj.data.length || obj.value.length));
      this.cafes = obj.data ? obj.data : [];
      console.log(obj.data, 'obj.data');
    });
  }
 
}
