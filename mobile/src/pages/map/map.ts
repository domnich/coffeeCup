import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerOptions,
    Marker
} from '@ionic-native/google-maps';
import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';


declare var google: any;

@IonicPage()
@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') map;

    constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private googleMaps: GoogleMaps) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MapPage');

        this.loadMap();
    }

    loadMap() {
        let mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: 43.0741904,
                    lng: -89.3809802
                },
                zoom: 18,
                tilt: 30
            }
        };

        this.map = GoogleMaps.create('map', mapOptions);
    }

    goToTab(tabId: number) {
        this.navCtrl.parent.select(tabId);
    }



}
