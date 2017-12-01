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
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    private infoWindows: Array<any>;
    private cafes: Observable<Array<Cafe>>;
    constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,  private data: DataProvider) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MapPage');
        this.getData();
        this.loadMap();
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
        this.cafes.forEach((cafe: any) => {
            this.setMarker(cafe);
        });
    }

    setMarker(cafe: Cafe){
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(cafe.address.geolocation.lat, cafe.address.geolocation.lng),
            map: this.map,
            title: cafe.name
        });


        var contentWindow = "<button id='clickableItem'>cafe.name</button> <br/>" + "<img src='"+ cafe.photos[0] +"' width='100%' height='100' /> <br/>" + cafe.address.street
        var infoWindow = new google.maps.InfoWindow({
            content: contentWindow
        });

        this.infoWindows.push(infoWindow);

        google.maps.event.addListener(infoWindow, 'domready', function() {
            var clickableItem = document.getElementById('clickableItem');

            clickableItem.addEventListener('click' , () => {
                console.log(cafe, 111)
            });
        });


        infoWindow.addListener('click', () => {
            alert("yeah");
            console.log("yeah");
        });


        marker.addListener('click', event => {
            this.closeAllInfoWindows();
            infoWindow.open(this.map, marker);
            console.log(cafe, 222);
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
      this.data.cafesData
          .subscribe(response => {
              if (response && response.length) {
                  this.cafes = response;
              }
          });
    }















    goToTab(tabId: number) {

        this.navCtrl.parent.select(tabId);
    }



}
