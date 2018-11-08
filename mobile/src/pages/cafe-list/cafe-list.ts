import {Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import { Cafe } from "../../models/cafe.interface";
import { PlacesService } from '../places/shared/places.service';
import { Cancellable } from '../../app/services/cancellable';

@IonicPage({
    name: "cafes",
    segment: "cafes"
})
@Component({
    selector: 'page-cafe-list',
    templateUrl: 'cafe-list.html'
})
export class CafeListPage extends Cancellable implements OnDestroy {
    public places: Observable<Array<Cafe>>;
    public toggleMask: boolean = false;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private cd: ChangeDetectorRef,
        private placesSerive: PlacesService
    ) {
        super();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CafeListPage');
        this.getPlacesDataListener();

    }

    ngOnDestroy() {
        this.cancelSubscriptions();
    }

    getPlacesDataListener() {
        this.addSubscriptionToStack(this.placesSerive.placesData
            .subscribe(res => {
                if (res && res.length) {
                    res.forEach((item) => {
                        if (item.id === 1 || item.id === 4 || item.id === 7 || item.id === 10 || item.id === 13) {
                            item.src = 'assets/imgs/coffee_1.png';
                        } else if (item.id === 2 || item.id === 5 || item.id === 8 || item.id === 11 || item.id === 14) {
                            item.src = 'assets/imgs/coffee_2.png';
                        } else {
                            item.src = 'assets/imgs/coffee_3.png';
                        }
                        if (!item.description) {
                            item.description = 'Some test address';
                        }
                    });
                    this.places = res;
                    console.log(this.places, 'this.places')
                }
            }));
    }

    navigateToDetail(id: number) {
        this.navCtrl.push('CafeDetailPage', {id})
    }

    onSearchValueChanged(event) {
        console.log(event, '777')
    }

    onMaskToggle(val: boolean): void {
        this.toggleMask = val;
        this.cd.detectChanges();
    }

    goToTab(tabId: number) {
        this.navCtrl.parent.select(tabId);
    }

}
