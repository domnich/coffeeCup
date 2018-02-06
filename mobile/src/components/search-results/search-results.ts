import { Component,  ViewChild, AfterViewInit, Input } from '@angular/core';
import { Content, NavController } from 'ionic-angular';
import * as $ from 'jquery';
import { DataService } from '../../providers/shared/shared.service';
import { Cafe, FilteredCafes } from "../../models/cafe.interface";

@Component({
  selector: 'search-results',
  templateUrl: 'search-results.html'
})
export class SearchResultsComponent implements AfterViewInit {
  @Input('val')
  public val: boolean = false;
  public height: number;
  public cafes: Cafe[] = [];
  public startEntering: any;
  public data: FilteredCafes;
  public searchValue: string;
  @ViewChild('galleryContainer') galleryContainer: Content;
  constructor(
    private shareData: DataService,
    private navCtrl: NavController
  ) {
    this.shareData.filteredCafesSubscriber.subscribe((obj: Cafe) => {
      this.data = obj;
      this.height = isNaN(this.data.height) ? 200 : this.data.height;
      this.cafes = this.data.data ? this.data.data : [];
      this.searchValue = this.data.hasOwnProperty('value') ? this.data.value : '';
      this.startEntering = this.data.hasOwnProperty('data') && this.searchValue;
    });
  }

  ngAfterViewInit() {
    this.galleryContainer.ionScroll.subscribe((event) => {
      $('.searchbar-input').focus();
    });
  }
  
  navigateToDetail(id: number) {
    this.navCtrl.push('CafeDetailPage', {id})
  }

}
