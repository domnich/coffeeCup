import { Component, ViewChild, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { CafeListTab, MapTab } from '../pages';
import { Observable } from "rxjs/Observable";
import { Post } from "../../models/post.interface";
import { PlacesService } from './shared/places.service';
import { Cancellable } from '../../app/services/cancellable';
import { LocalStorage } from '../../app/services/localstorage';

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
    updateFromServer: boolean;
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private placesService: PlacesService,
        private localStorage: LocalStorage
    ) {
        super();
        this.getPlaces();

        this.addSubscriptionToStack(this.placesService.placesData.subscribe(res => {
            if (res && res.length) {
                if(this.updateFromServer) {
                    this.saveToStorage(res);        
                }
                this.places = res;
            }
        })); 
    }

    ionViewDidLoad() {
        this.tabRef.select(0);
    }

    ngOnDestroy() {
        this.cancelSubscriptions();
        this.cancelRequests();
    }

    getPlaces() {
        this.localStorage.getCafesFromStorage().then((res) => {
            if(res === null) {
                this.updateFromServer = true;
                this.loadData();
            } else {
                this.updateFromServer = false;
                this.placesService.loadData(res.khariv);
            }
        }, (err) => {
            console.log(err);
        });       
    }

    saveToStorage(arr: Array<any>) {
        this.localStorage.saveCafesToStorage(arr);
    }

    loadData() {
        let obj = {
            'startLat': 49.991899,
            'endLat': 49.987322,
            'startLng': 36.227468,
            'endLng': 36.236950
        }
        const request = this.placesService.getPlaces(obj);
        this.addRequestToStack(request);
    }
}
