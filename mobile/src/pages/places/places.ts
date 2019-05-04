import { Component, ViewChild, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { CafeListTab, MapTab } from '../pages';
import { Observable } from "rxjs/Observable";
import { Cafe } from "../../models/cafe.interface";
import { PlacesService } from './shared/places.service';
import { Cancellable } from '../../app/services/cancellable';
import { LocalStorage } from '../../app/services/localstorage';
import { getDistanceFromLatLonInKm, compareDistance } from '../../app/helpers';
import { DataService } from '../../providers/shared/shared.service';
import { KHARKIV_COORDS } from '../../app/constants';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
    selector: 'places',
    templateUrl: 'places.html',
})
export class PlacesPage extends Cancellable implements OnDestroy {
    @ViewChild('tabs') tabRef: Tabs;
    tab1Root: any = CafeListTab;
    tab2Root: any = MapTab;
    places;
    text: string;
    updateFromServer: boolean;
    getDistance = getDistanceFromLatLonInKm;
    compareDistance = compareDistance;
    private userCoords;
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private placesService: PlacesService,
        private localStorage: LocalStorage,
        private shareData: DataService,
        private geolocation: Geolocation
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

        this.addSubscriptionToStack(this.shareData.userCoordinatesSubscriber.subscribe((res) => {
            this.userCoords = res;
            if (this.userCoords !== undefined && this.places !== undefined) {
                this.filterDataAccordingToUserCoordinates();
                this.placesService.loadData(this.places);
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
            console.log(res, 'ressss');
            if(res === null) {
                this.updateFromServer = true;
                this.loadData();
            } else {
                this.updateFromServer = false;
                this.places = res.khariv;
                
               if (this.userCoords) {
                this.filterDataAccordingToUserCoordinates();
               }
               this.placesService.loadData(this.places);
            }
        }, (err) => {
            console.log(err);
        });       
    }

    filterDataAccordingToUserCoordinates() {
        this.places.forEach((item) => {
            item['distance'] = this.getDistance(this.userCoords.latitude, this.userCoords.longitude, item.latitude, item.longitude); 
        });

        this.places.sort(this.compareDistance);
        this.places.forEach((item) => {
            let distanceArray: string[] = ('' + item['distance']).split('.');
            if(distanceArray.length === 1) {
                item['distanceString']  = distanceArray[0] + ' километрa';
            } else {
                if(distanceArray[0] === '0') {
                    item['distanceString']  = distanceArray[1] + ' метрa';
                } else {
                    item['distanceString']  = distanceArray[0] + ' километрa ' + distanceArray[1] + ' метрa';
                }
            }
        });

        
    }

    saveToStorage(arr: Array<any>) {
        this.localStorage.saveCafesToStorage(arr);
    }

    loadData() {
        const request = this.placesService.getPlaces(KHARKIV_COORDS);
        this.addRequestToStack(request);
    }
}
