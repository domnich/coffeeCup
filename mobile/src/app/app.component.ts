import { Component, ViewChild } from '@angular/core';
import {Platform, Nav, ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Keyboard} from "@ionic-native/keyboard";


import {HomePage} from "../pages/home/home";

//declare var VkSdk;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = "PlacesPage";

  @ViewChild(Nav) nav: Nav;

    pages: any[] = [
        { title: 'Места', component: "PlacesPage" },
        { title: 'Подписка', component: "SubscriptionPage" },
        { title: 'Login', component: 'LoginPage' }
    ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, keyboard: Keyboard, public modalCtrl: ModalController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
          //statusBar.styleDefault();
  


// VkSdk.init('6356607', function(res) {
//   console.log(res, 'RESSSSS');
// }, function(error) {
//   console.log(error, "ERRRRRR");
// });



        splashScreen.hide();

        // if (platform.is('ios')) {
        //     keyboard.disableScroll(true);
        // }

    });
  }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

    openCitySelectorModal() {
        let cityModal = this.modalCtrl.create(HomePage);
        cityModal.present();
    }
}

