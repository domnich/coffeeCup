import { Component } from '@angular/core';
import {Gesture, IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
    gesture: Gesture
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
      
  }

  navigateToAboutPage() {
      this.navCtrl.push('MapPage');
  }
}
