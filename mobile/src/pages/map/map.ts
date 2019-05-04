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
    private places: any;
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
            
            styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
],   
            
            // styles: [
            //     { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }],
            
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
        // for (var i=0; i<this.places.length; i++) {

        // }
        this.places.forEach((place: any, ind: any) => {
            place.description = place.description.slice(0, 7);
            this.setMarker(place, ind);
        });
    }

    setMarker(place: any, ind: any){
        console.log('Set Marker1');


        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(place.latitude, place.longitude),
            map: this.map,
            title: place.name
        }),
        self = this,
        id = 'main-info-window-' + ind;


       // var contentWindow = "<button id='clickableItem'>place.name</button> <br/>" + "<img src='"+ place.photos[0] +"' width='100%' height='100' /> <br/>" + place.description;
        //var contentWindow = "<button id='clickableItem'>" + place.name + "</button> <br/>" + " <br/>" + place.description
        
        
       // var contentWindow = `<button id='clickableItem'>  ${ place.name }  </button> <br/> <br/>  ${ place.description }`;
       var contentWindow = `<div id="${ id }">
                                <div class="text-area">
                                    <span> ${ place.name }</span>
                                    <span> ${ place.description }</span>
                                </div>
                                <img style="width: 268px; height:140px;" src='assets/imgs/coffee_1.png'>
                                <button class="control-btn">
                                Купить чашку
                             
                                </button>
                            </div>`;
       
       var infoWindow = new google.maps.InfoWindow({
            content: contentWindow
        });
//<img src='assets/imgs/coffee_1.png'>
        this.infoWindows.push(infoWindow);

        google.maps.event.addListener(infoWindow, 'domready', function() {
            // var clickableItem = document.getElementById('clickableItem');

            // clickableItem.addEventListener('click' , (e) => {
       
            //     self.navigateToDetail(place.id);
         
            // }, false);

            self.prepareContentWindowStyles(id);
           









//$('#div-main-infoWindow').closest('.gm-style-iw').parent().addClass('custom-iw');
           // var iwOuter = jQuery('.gm-style-iw');

            /* The DIV we want to change is above the .gm-style-iw DIV.
             * So, we use jQuery and create a iwBackground variable,
             * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
             */
            //var iwBackground = iwOuter.prev();
         
            // Remove the background shadow DIV
          //  iwBackground.children(':nth-child(2)').css({'display' : 'none'});
         
            // Remove the white background DIV
           // iwBackground.children(':nth-child(4)').css({'display' : 'none'});

        });

        // google.maps.event.addListener(marker, "click", function() {
        //     infowindow.open(map, marker);
        //   });


        infoWindow.addListener('click', () => {
            alert("yeah");
            console.log("yeah");
        });


        marker.addListener('click', event => {
            this.closeAllInfoWindows();
            infoWindow.open(this.map, marker);
           
        });

    }

    prepareContentWindowStyles(id: string) {
      const windth = document.getElementById(id).parentElement.parentElement.parentElement.parentElement.offsetWidth,
            boxOffset = (windth - 270) / 2,
            holder = document.getElementById(id).parentElement.parentElement.parentElement;
console.log(holder, boxOffset);
       holder.style.marginLeft = boxOffset + 'px';
 

        // var contentWindowHolder = document.getElementById(id).parentElement.parentElement.parentElement.parentElement,
        //     contentWindowChild = contentWindowHolder.firstChild,
        //     nodeToRemove = contentWindowChild.childNodes[0];
   
        // contentWindowChild.removeChild(nodeToRemove);
        // nodeToRemove = contentWindowChild.childNodes[0];
        // contentWindowChild.removeChild(nodeToRemove);
        // nodeToRemove = contentWindowChild.childNodes[1];
        // contentWindowChild.removeChild(nodeToRemove);    
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
        const update = '12334';
        this.navCtrl.push('CafeDetailPage', {id, update})
    }












    goToTab(tabId: number) {

        this.navCtrl.parent.select(tabId);
    }



}
