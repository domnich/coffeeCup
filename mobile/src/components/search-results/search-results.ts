import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Content } from 'ionic-angular';
import * as $ from 'jquery';
import { DataService } from '../../providers/shared/shared.service';
import { Cafe, FilteredCafes } from "../../models/cafe.interface";
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'search-results',
  templateUrl: 'search-results.html'
})
export class SearchResultsComponent {

  public showResultsContainer: boolean = true;
  public cafes: Cafe[] = [];
  @ViewChild('galleryContainer') galleryContainer: ElementRef;
  constructor(private element: ElementRef, private shareData: DataService) {
    console.log(this.galleryContainer, 'galleryContainer')
    this.shareData.filteredCafesSubscriber.subscribe((obj: FilteredCafes) => {
      this.showResultsContainer = !!(Object.keys(obj) && Object.keys(obj).length && (obj.data.length || obj.value.length));
      this.cafes = obj.data ? obj.data : [];
      console.log(obj.data, 'obj.data');
      if(this.cafes.length) {
    
      }
           
    });
    console.log(this, 'thissss')


  

    
  }

  ngAfterViewInit() {
    console.log('TADA111M');
    this.galleryContainer.ionScroll.subscribe((event) => {
          console.log(123);
        $('.searchbar-input').focus();
      })
   
      // this.content.ionScroll.subscribe((event) => {
      //     console.log(123);
      //   $('.searchbar-input').focus();
      // })
  }
 
}
