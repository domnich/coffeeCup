import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerOptions,
    Marker,
    ILatLng
} from '@ionic-native/google-maps';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {Observable} from "rxjs/Observable";
import { Cafe } from "../../models/cafe.interface";

declare var google: any;

@IonicPage()
@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') map;

private cafes: Observable<Array<Cafe>>;
    constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private googleMaps: GoogleMaps, private data: DataProvider) {


    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MapPage');
        this.getData();

    }

    getData() {
      this.data.cafesData
          .subscribe(response => {
              if (response && response.length) {
                  this.cafes = response;
              }
          });
    }






    




    ionViewDidEnter222() {
        if(this.map) {
            setTimeout(() => {
                this.map.setVisible(true);
            }, 250);
        }
    }

    loadMap222() {
      //let latLng = new google.maps.LatLng(-34.9290, 138.6010);

        let target: ILatLng  = { lat: 49.975583, lng: 36.292648};

        let mapOptions: GoogleMapOptions = {
            mapType: 'MAP_TYPE_ROADMAP',

            camera: {
                target: target,
                zoom: 10,
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
            // this.map.setClickable(false);
            //
            // this.map.toDataURL().then((res) => {
            //
            //   alert(res)
            // });

            this.addMarkers();
        });
    }


    addMarkers() {
        //infoWindow
        this.cafes.forEach((cafe: any) => {

            console.log(cafe)

            var canvas = document.createElement('canvas'),
                context,
                img = new Image();
            canvas.width = 350;
            canvas.height = 150;
            context = canvas.getContext('2d');
            img.src = "http://via.placeholder.com/350x150";

            img.onload = () => {
                context.drawImage(img, 0, 0);

                context.font = '15pt Calibri';
                context.fillStyle = 'blue';
                context.fillText(cafe.name, 40, 15);
                context.fillText('Tokyo!', 60, 35);


                this.map.addMarker({
                    title: canvas.toDataURL(),
                    snippet: "test",
                    icon: 'blue',
                    position: {
                        lat: cafe.address.geo.lat,
                        lng: cafe.address.geo.lng
                    }
                }).then(marker => {






                    marker.on(GoogleMapsEvent.INFO_CLICK)
                        .subscribe((e,a,b) => {
                            console.log(e,a,b)
                        });








                    marker.on(GoogleMapsEvent.MARKER_CLICK)
                        .subscribe((e) => {
                            console.log(e);
                           // alert('clicked');
                        });
                });

            };

        });
    }

    goToTab(tabId: number) {
        this.map.setVisible(false);
        this.navCtrl.parent.select(tabId);
    }



}
