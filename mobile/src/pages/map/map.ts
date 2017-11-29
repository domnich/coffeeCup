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
            mapType: 'MAP_TYPE_ROADMAP',

            camera: {
                target: {
                    lat: 43.0741904,
                    lng: -89.3809802
                },
                zoom: 15,
                tilt: 30
            },
            controls: {
                myLocationButton: true,
                compass: false
            },

            preferences: {
                building: false
            }

        };

        this.map = GoogleMaps.create('map', mapOptions);
        this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
            console.log(this.map)
            this.map.setClickable(false);

            this.map.toDataURL().then((res) => {
              alert(1);
              alert(res)
            });
        });
    }

    goToTab(tabId: number) {
        this.navCtrl.parent.select(tabId);
    }



}
