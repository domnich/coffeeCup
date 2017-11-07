import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import { Post } from "../../models/post.interface";
import { DataProvider } from "../../providers/data/data";

@IonicPage({
    name: "cafes",
    segment: "cafes"
})
@Component({
  selector: 'page-cafe-list',
  templateUrl: 'cafe-list.html',
})
export class CafeListPage {

  posts: Observable<Array<Post>>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private data: DataProvider) {
    this.getPosts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CafeListPage');
  }

  getPosts() {
     this.posts = this.data.getPosts();
  }

  navigateToDetail(postId: number) {
    this.navCtrl.push('CafeDetailPage', {postId})
  }

}
