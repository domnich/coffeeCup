import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'main-page'
})
@Component({
  selector: 'main-page',
  templateUrl: 'main.html',
})
export class MainPage {
  placesTab = 'PlacesPage';
  subscriptionTab = 'SubscriptionPage';
  loginTab = 'LoginPage';
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

}
