import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, GoogleMapOptions} from '@ionic-native/google-maps';

declare var google: any;

@IonicPage()
@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})
export class MapPage {
    @ViewChild('map') map;
    constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps, public platform: Platform) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MapPage');
        this.loadMap();
    }


    loadMap() {
        let element: HTMLElement = document.getElementById('map');
        let mapOptions: GoogleMapOptions = {
            camera: {
                target: {
                    lat: 43.0741904,
                    lng: -89.3809802
                },
                zoom: 5,
                tilt: 30
            }
        };
        let map: GoogleMap = GoogleMaps.create(element, mapOptions);
        map.one(GoogleMapsEvent.MAP_READY).then(() => {



            map.addMarker({
                title: 'Ionic',
                icon: 'blue',
                animation: 'DROP',
                position: {
                    lat: 43.0741904,
                    lng: -89.3809802
                }
            })
                .then(marker => {
                    marker.on(GoogleMapsEvent.MARKER_CLICK)
                        .subscribe(() => {
                            alert('clicked');
                        });
                });

        });


        // let mapOptions: GoogleMapOptions = {
        //     camera: {
        //         target: {
        //             lat: 43.0741904,
        //             lng: -89.3809802
        //         },
        //         zoom: 10,
        //         tilt: 30
        //     }
        // };
        //
        // this.map = this.googleMaps.create('map_canvas', mapOptions);
        //
        // // Wait the MAP_READY before using any methods.
        // this.map.one(GoogleMapsEvent.MAP_READY)
        //     .then(() => {
        //         console.log('Map is ready!');
        //
        //         // Now you can use all methods safely.
        //         this.map.addMarker({
        //             title: 'Ionic',
        //             icon: 'blue',
        //             animation: 'DROP',
        //             position: {
        //                 lat: 43.0741904,
        //                 lng: -89.3809802
        //             }
        //         })
        //             .then(marker => {
        //                 marker.on(GoogleMapsEvent.MARKER_CLICK)
        //                     .subscribe(() => {
        //                         alert('clicked');
        //                     });
        //             });
        //
        //     });
    }
}
