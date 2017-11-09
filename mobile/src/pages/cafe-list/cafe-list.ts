import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import { Post } from "../../models/post.interface";
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

   private posts: Observable<Array<Post>>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private data: DataProvider, private event: Events) {
    //this.getPosts();


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CafeListPage');
      console.log('Passed params', this.navCtrl['rootParams']);
    this.posts = this.navCtrl['rootParams'];

  }

  getPosts() {

  }

  navigateToDetail(postId: number) {
    this.navCtrl.push('CafeDetailPage', {postId})
  }

}
