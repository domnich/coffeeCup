import {Component,} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {Post} from "../../models/post.interface";
import { Cafe } from "../../models/cafe.interface";
import { DataProvider } from "../../providers/data/data";

@IonicPage({
    name: "cafes",
    segment: "cafes"
})
@Component({
    selector: 'page-cafe-list',
    templateUrl: 'cafe-list.html'
})
export class CafeListPage {
    public cafes: Observable<Array<Cafe>>;
    public toggleMask: boolean = false;
    constructor(public navCtrl: NavController, public navParams: NavParams, private data: DataProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CafeListPage');
        this.getPostsDataListener();
    }

    getPostsDataListener() {
        this.data.cafesData
            .subscribe(response => {
                if (response && response.length) {
                    this.cafes = response;
                }
            });
    }

    navigateToDetail(postId: number) {
        this.navCtrl.push('CafeDetailPage', {postId})
    }


    onMaskToggle(val: boolean): void {
        this.toggleMask = val;
    }

    goToTab(tabId: number) {
        this.navCtrl.parent.select(tabId);
    }

}
