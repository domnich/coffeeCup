import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';
import {CafeListTab, MapTab} from '../pages';
import {Observable} from "rxjs/Observable";
import {Post} from "../../models/post.interface";
import {DataProvider} from "../../providers/data/data";

@IonicPage()
@Component({
    selector: 'places',
    templateUrl: 'places.html',
})
export class PlacesPage {
    @ViewChild('tabs') tabRef: Tabs;
    tab1Root: any = CafeListTab;
    tab2Root: any = MapTab;

    posts: Observable<Array<Post>>;
    text: string;
    private searchValue: string;
    constructor(public navCtrl: NavController, public navParams: NavParams, private data: DataProvider) {
        this.getPosts();
    }

    ionViewDidLoad() {
        this.tabRef.select(0);
    }

    getPosts() {
        this.data.getPosts();
        this.data.cafesData
            .subscribe(response => {
                if (response && response.length) {
                    this.posts = response;
                }
            });
    }


}
