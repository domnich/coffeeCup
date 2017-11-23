import {Component,} from '@angular/core';
import {IonicPage, NavController, NavParams, Events} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {Post} from "../../models/post.interface";
import {DataProvider} from "../../providers/data/data";


@IonicPage({
    name: "cafes",
    segment: "cafes"
})
@Component({
    selector: 'page-cafe-list',
    templateUrl: 'cafe-list.html'
})
export class CafeListPage {
    private posts: Observable<Array<Post>>;

    constructor(public navCtrl: NavController, public navParams: NavParams, private data: DataProvider) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CafeListPage');

        window.addEventListener('native.keyboardshow', keyboardShowHandler);
        window.addEventListener('native.keyboardhide', keyboardHideHandler);
        function keyboardShowHandler(e) {
            document.getElementById("cafes-list").style.height = document.getElementById("cafes-list").clientHeight - e.keyboardHeight + "px";
        }

        function keyboardHideHandler(e) {
            document.getElementById("cafes-list").style.height = "100%";
        }

        this.getPostsDataListener();
    }

    getPostsDataListener() {
        this.data.Settings
            .subscribe(response => {
                if (response && response.length) {
                    this.posts = response;
                }
            });
    }

    navigateToDetail(postId: number) {
        this.navCtrl.push('CafeDetailPage', {postId})
    }


    goToTab(tabId: number) {
        this.navCtrl.parent.select(tabId);
    }

}
