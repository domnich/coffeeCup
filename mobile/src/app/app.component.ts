import { Component, ViewChild } from '@angular/core';
import {Platform, Nav, ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from "@ionic-native/keyboard";
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { HomePage } from "../pages/home/home";
import { LocalStorage } from './services/localstorage';
import { DataService } from '../providers/shared/shared.service';
import { Auth } from './services/auth';
import { LOGIN_TYPES } from '../pages/login/shared/login-types';
import { Facebook } from '@ionic-native/facebook';

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

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    keyboard: Keyboard, 
    private localStorage: LocalStorage,
    public modalCtrl: ModalController,
    private geolocation: Geolocation,
    private diagnostic: Diagnostic,
    private shareDate: DataService,
    private auth: Auth,
    private fb: Facebook
  ) {
    platform.ready().then(() => {

    // this.localStorage.setUserLocation({
    //   latitude: '49.993500,', 
    //   longitude: '36.230383'
    // });

      if (platform.is('ios') || platform.is('android')) {
        this.tryToGetUserCoordinates();
   
      }

      this.checkUserAuthorization();

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

  tryToGetUserCoordinates() {
    this.diagnostic.getLocationAuthorizationStatus().then((res) => {
      console.log(res, 'getLocationAuthorizationStatus')
      if(res === this.diagnostic.motionStatus.NOT_DETERMINED || res === this.diagnostic.motionStatus.DENIED) {
        console.log('IM HERE')
        this.diagnostic.requestLocationAuthorization().then((status) => {

          console.log(status, 'statusstatusstatusstatus');

          if(status === this.diagnostic.motionStatus.NOT_DETERMINED || status === 'authorized_when_in_use') {
            this.initializeRequestForGeolocation();
          }
        }, (err) => {
          console.log(err, "ERURURURUR");
        }).catch((err) => {
          console.log(err, 'ITS ERROR');
        });

      } else if(res === 'authorized_when_in_use') {
        this.initializeRequestForGeolocation();
      }
    });
  }

    initializeRequestForGeolocation() {
      this.geolocation.getCurrentPosition().then((resp) => {
        console.log(resp.coords);
        this.shareDate.emitUserCoordinates({
          latitude: resp.coords.latitude,
          longitude: resp.coords.longitude
        });
      }).catch((error) => {
        console.log('Error getting location', error);
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

