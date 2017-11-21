import {Component, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {IonicPage, NavController, NavParams, Events} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import { Subscription } from 'rxjs/Subscription';
import {Post} from "../../models/post.interface";
import {DataProvider} from "../../providers/data/data";
import { AppEmitterProvider } from "../../providers/app-emitter/app-emitter";

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
    public subscription: Subscription;
    private contentHeight: any;
    private test: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, private data: DataProvider, private event: Events, private appEmitter: AppEmitterProvider, private sanitizer: DomSanitizer) {
        //this.getPosts();


    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CafeListPage');
        // this.subscription = this.appEmitter.getKeyboardHeightEmitter().subscribe((number) => {
        //
        //     this.calculatePageOffset(number + 40);
        //     this.calculatePageOffset(number + 40);
        // });

        var self = this;
        window.addEventListener('native.keyboardshow', keyboardShowHandler);
        function keyboardShowHandler(e) {

          //  self.calculatePageOffset(e.keyboardHeight);
            document.getElementById("testId").style.height = document.getElementById("testId").clientHeight - e.keyboardHeight - 20 + "px";
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

    calculatePageOffset(n: number) {
        this.contentHeight = this.sanitizer.bypassSecurityTrustStyle("calc(100% - " + n + "px)");

    }

}
