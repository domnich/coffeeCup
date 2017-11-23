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
    constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MapPage');
          
    }


}
