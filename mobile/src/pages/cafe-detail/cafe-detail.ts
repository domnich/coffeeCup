import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-cafe-detail',
  templateUrl: 'cafe-detail.html',
})
export class CafeDetailPage {

  postId: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CafeDetailPage');
    this.postId = this.navParams.get('postId');
    console.log(this.postId)
  }

}
