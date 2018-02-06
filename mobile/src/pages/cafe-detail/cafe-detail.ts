import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import { Cafe } from '../../models/cafe.interface';
import { PlacesService } from '../places/shared/places.service';

@IonicPage({
    segment: 'cafes/:id',
    defaultHistory: ['cafes']
})
@Component({
    selector: 'page-cafe-detail',
    templateUrl: 'cafe-detail.html',
})
export class CafeDetailPage {
    private id: number;
    public cafe: Cafe;
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        private placesService: PlacesService) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CafeDetailPage');
        this.id = this.navParams.get('id');
        this.placesService.getPlaceById(this.id).subscribe((res) => {
            this.cafe = res;
          // this.cafe = res;
        });
    }

}
