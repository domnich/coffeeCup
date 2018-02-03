import { Component, ViewChild, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { CafeListTab, MapTab } from '../pages';
import { Observable } from "rxjs/Observable";
import { Post } from "../../models/post.interface";
import { PlacesService } from './shared/places.service';
import { Cancellable } from '../../app/services/cancellable';

@IonicPage()
@Component({
    selector: 'places',
    templateUrl: 'places.html',
})
export class PlacesPage extends Cancellable implements OnDestroy {
    @ViewChild('tabs') tabRef: Tabs;
    tab1Root: any = CafeListTab;
    tab2Root: any = MapTab;

    places: Observable<Array<Post>>;
    text: string;
    private searchValue: string;
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private placesService: PlacesService
    ) {
        super();
        this.getPlaces();
    }

    ionViewDidLoad() {
        this.tabRef.select(0);
    }

    ngOnDestroy() {
        this.cancelSubscriptions();
        this.cancelRequests();
    }

    getPlaces() {
        let obj = {
            'startLat': 49.991899,
            'endLat': 49.987322,
            'startLng': 36.227468,
            'endLng': 36.236950
          }
       const request = this.placesService.getPlaces(obj);
       this.addSubscriptionToStack(this.placesService.placesData.subscribe(res => {
            if (res && res.length) {
                this.places = res;
            }
        }));
        this.addRequestToStack(request);
    }
}
