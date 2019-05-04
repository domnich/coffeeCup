import { Component,  ViewChild, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { Content, NavController } from 'ionic-angular';
import * as $ from 'jquery';
import { DataService } from '../../providers/shared/shared.service';
import { Cafe, FilteredCafes } from "../../models/cafe.interface";
import { Cancellable } from '../../app/services/cancellable';

@Component({
  selector: 'search-results',
  templateUrl: 'search-results.html'
})
export class SearchResultsComponent extends Cancellable implements AfterViewInit, OnDestroy {
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
    super();
    this.addSubscriptionToStack(this.shareData.filteredCafesSubscriber.subscribe((obj: FilteredCafes) => {
      this.data = obj;
      this.height = isNaN(this.data.height) ? 200 : this.data.height;
      this.cafes = this.data.data ? this.data.data : [];
      this.searchValue = this.data.hasOwnProperty('value') ? this.data.value : '';
      this.startEntering = this.data.hasOwnProperty('data') && this.searchValue;
    }));
  }

  ngAfterViewInit() {
    this.galleryContainer.ionScroll.subscribe((event) => {
      $('.searchbar-input').focus();
    });
  }
  
  navigateToDetail(id: number) {
    const update = '12334';
    this.navCtrl.push('CafeDetailPage', {id, update})
  }

  ngOnDestroy() {
    this.cancelSubscriptions();
  }

}
