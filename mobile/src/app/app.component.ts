import { Component, ViewChild } from '@angular/core';
import {Platform, Nav, ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from "@ionic-native/keyboard";
import { HomePage } from "../pages/home/home";
import { DataService } from '../providers/shared/shared.service';
import { Auth } from './services/auth';
import { LOGIN_TYPES } from '../pages/login/shared/login-types';
import { Facebook } from '@ionic-native/facebook';
import { GeolocationService } from './services/geolocation.service';
// declare var SocialVk: any;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'main-page';

  @ViewChild(Nav) nav: Nav;
  
    pages: any[] = [
        { title: 'Места', component: "PlacesPage" },
        { title: 'Подписка', component: "SubscriptionPage" },
        { title: 'История чашек', component: 'CupHistoryPage' },
        { title: 'Login', component: 'LoginPage' }
    ];

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    keyboard: Keyboard,
    public modalCtrl: ModalController,
    private shareDate: DataService,
    private auth: Auth,
    private fb: Facebook,
    private geolocationService: GeolocationService
  ) {
    platform.ready().then(() => {

      if (platform.is('ios') || platform.is('android')) {        
        this.geolocationService.getUserCoordinates();
      }

      this.checkUserAuthorization();

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
          //statusBar.styleDefault();

        //  statusBar.overlaysWebView(true);
        statusBar.backgroundColorByHexString('#c56200');
        //  SocialVk.init('6356607', function(res) {
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

  checkUserAuthorization() {
    this.auth.isAuthenticated().then(res => {
      console.log('YEP, ITS TRUE!!!!');
      if(res && res.type && res.type === LOGIN_TYPES.FACEBOOK) {
        this.auth.getFacebookUserDetails(res.data.authResponse.userID).then((user) => {
          console.log(user, 'useruseruseruser')
          let obj = {
            name: user.name,
            picture: user.picture.data.url
          }
          console.log(obj, 'USER OBJECT');
          this.shareDate.emitUserProfile(obj);
        });
      }
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

