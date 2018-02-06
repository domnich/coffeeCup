import {Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';

import {Observable} from "rxjs/Observable";
import { Cafe } from "../../models/cafe.interface";
import { PlacesService } from '../places/shared/places.service';
import { Cancellable } from '../../app/services/cancellable';

declare var google: any;

@IonicPage()
@Component({
    selector: 'page-map',
    templateUrl: 'map.html',
})
export class MapPage extends Cancellable implements OnDestroy {
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    private infoWindows: Array<any>;
    private places: Observable<Array<Cafe>>;
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public platform: Platform,
        private placesService: PlacesService
    ) {
        super();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MapPage');
        this.getData();
        this.loadMap();
    }

    ngOnDestroy() {
        this.cancelSubscriptions();
    }

    loadMap(){
        let latLng = new google.maps.LatLng(49.993500, 36.230383);
        let mapOptions = {
            center: latLng,
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }],
            disableDoubleClickZoom: false,
            disableDefaultUI: true,
            zoomControl: true,
            scaleControl: true,
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.generateMakers();
    }


    generateMakers() {
        this.infoWindows = [];
        this.places.forEach((place: any) => {
            this.setMarker(place);
        });
    }

    setMarker(place: any){
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(place.latitude, place.longitude),
            map: this.map,
            title: place.name
        }),
        self = this;


       // var contentWindow = "<button id='clickableItem'>place.name</button> <br/>" + "<img src='"+ place.photos[0] +"' width='100%' height='100' /> <br/>" + place.description;
        var contentWindow = "<button id='clickableItem'>" + place.name + "</button> <br/>" + " <br/>" + place.description
        var infoWindow = new google.maps.InfoWindow({
            content: contentWindow
        });

        this.infoWindows.push(infoWindow);

        google.maps.event.addListener(infoWindow, 'domready', function() {
            var clickableItem = document.getElementById('clickableItem');

            clickableItem.addEventListener('click' , () => {
                self.navigateToDetail(place.id);
            });
        });


        infoWindow.addListener('click', () => {
            alert("yeah");
            console.log("yeah");
        });


        marker.addListener('click', event => {
            this.closeAllInfoWindows();
            infoWindow.open(this.map, marker);
            console.log(place, 222);
        });

    }

    closeAllInfoWindows() {
        for(let window of this.infoWindows) {
            window.close();
        }
    }
    // addMarkerToMap(location, htmlMarkupForInfoWindow){
    //     var infowindow = new google.maps.InfoWindow();
    //     var myLatLng = new google.maps.LatLng(location.latitude, location.longitude);
    //     var marker = new google.maps.Marker({
    //         position: myLatLng,
    //         map: this.map,
    //         // icon: this.mapIcon,
    //         animation: google.maps.Animation.DROP,
    //     });
    //
    //     //Gives each marker an Id for the on click
    //     this.markerCount++;
    //     this.infoWindows.push(infowindow);
    //
    //     let self = this;
    //
    //     //Creates the event listener for clicking the marker and places the marker on the map
    //     google.maps.event.addListener(marker, 'click', ((marker, markerCount) => {
    //         return () => {
    //             self.hideAllInfoWindows();
    //             infowindow.setContent(htmlMarkupForInfoWindow);
    //             infowindow.open(this.map, marker);
    //         }
    //     })(marker, this.markerCount));
    //
    //     // add listener that will capture the click event of the infoWindow
    //     google.maps.event.addListener(infowindow, 'domready', () => {
    //         document.getElementById('content').addEventListener('click', () => {
    //             self.onLocationSelected(location);
    //         }, false);
    //     });
    // }

    getData() {
          this.addSubscriptionToStack(this.placesService.placesData
            .subscribe(res => {
                if (res && res.length) {
                    this.places = res;
                }
            }));
    }


    navigateToDetail(id: number) {
        this.navCtrl.push('CafeDetailPage', {id})
    }












    goToTab(tabId: number) {

        this.navCtrl.parent.select(tabId);
    }



}
