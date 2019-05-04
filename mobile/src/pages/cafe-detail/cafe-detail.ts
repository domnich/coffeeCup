import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import { Cafe } from '../../models/cafe.interface';
import { PlacesService } from '../places/shared/places.service';
import { LocalStorage } from '../../app/services/localstorage';

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
        private placesService: PlacesService,
        private localStorage: LocalStorage
        ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CafeDetailPage');
        this.id = this.navParams.get('id');
        const update = this.navParams.get('update'); // Will be used to check with cafe in storage
console.log(this.navParams.get('update'));

        this.localStorage.getCafeById(this.id).then((cafe) => {

           console.log(cafe, 'Full Cafe Info');
            if (cafe && update) {
                this.cafe = cafe;
            } else {
                this.getPlace(this.id);
            }
        });
    }

    getPlace(id: number) {
        this.placesService.getPlaceById(this.id).subscribe((res) => {
            this.cafe = res;
            this.localStorage.saveCafeToStorage(this.cafe);
            console.log(this.cafe, 'Cafe from server');
        });
    }

}
