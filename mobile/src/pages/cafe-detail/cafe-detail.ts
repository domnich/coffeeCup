import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {Observable} from "rxjs/Observable";
import {Post} from "../../models/post.interface"

@IonicPage({
    segment: 'cafes/:postId',
    defaultHistory: ['cafes']
})
@Component({
    selector: 'page-cafe-detail',
    templateUrl: 'cafe-detail.html',
})
export class CafeDetailPage {
    post: Observable<Post>;
    postId: number;

    constructor(public navCtrl: NavController, public navParams: NavParams, private data: DataProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CafeDetailPage');
        this.postId = this.navParams.get('postId');
        this.post = this.data.getPostById(this.postId);
    }

}
