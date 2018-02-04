import {Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import { Post } from "../../models/post.interface";
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
                    this.places = res;
                }
            }));
    }

    navigateToDetail(postId: number) {
        this.navCtrl.push('CafeDetailPage', {postId})
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
