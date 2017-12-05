import { Component } from '@angular/core';
import {Gesture, IonicPage, NavController, NavParams} from 'ionic-angular';
import {WheelSelector} from "../../../plugins/cordova-wheel-selector-plugin/examples/ionic2/dist/wheel-selector/index";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
    gesture: Gesture
  constructor(public navCtrl: NavController, public navParams: NavParams, private selector: WheelSelector) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
      this.selector.show({
          title: "How Many?",
          items: [
           [
          { description: "1" },
          { description: "2" },
          { description: "3" }
            ]
          ],
      }).then(
          result => {
              console.log(result[0].description + ' at index: ' + result[0].index);
          },
          err => console.log('Error: ', err)
      );
  }

  navigateToAboutPage() {
      this.navCtrl.push('MapPage');
  }
}
