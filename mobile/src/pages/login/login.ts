import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { LocalStorage } from '../../app/services/localstorage';
import { LOGIN_TYPES } from './shared/login-types';
import { Auth } from '../../app/services/auth';
import { GooglePlus } from '@ionic-native/google-plus';


// declare var SocialVk;

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: Facebook,
    private auth: Auth,
    private localStorage: LocalStorage,
    private googlePlus: GooglePlus
  ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  facebookLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => {
      let obj = {
        type: LOGIN_TYPES.FACEBOOK,
        data: res
      };

this.auth.loginUsingFacebook(res).subscribe((response) => {
  console.log(response);
})


      this.localStorage.saveAuthorizationObject(obj);
    })
    .catch(e => console.log('Error logging into Facebook', e));
  }

  clear() {
    this.localStorage.clearStorage();

  }

  vkontakteLogin() {

    // SocialVk.login(['photos', 'offline'], function(res) {
    //   console.log(res, "RESSESESE");
    // }, function(error) {
    //   console.log(error, "ERRRORRRR");
    // });

  }


  vkLogout() {
    // SocialVk.logout( function(res) {
    //   console.log(res, "RESSESESE logout");
    // }, function(error) {
    //   console.log(error, "ERRRORRRR logout");
    // });
  }

  googleLogin() {
    this.googlePlus.login({
   // 'webClientId': '242141053973-unp2dtn1tmroab90oev9c072eg03ae2v.apps.googleusercontent.com', // Android

   'webClientId': '242141053973-2f5vvfaoveonio3pl1fq3iit459pfm43.apps.googleusercontent.com', // was worked for ios todo- test without it
      'offline': true 
    })
    .then(res => console.log(res))
    .catch(err => console.error(err));
  }

  mailLogin(type: string) {
    this.navCtrl.push('page-signup', {type: type});
  }

  goToInfo() {
    console.log('11111 CLICK 2222');
    this.navCtrl.push('page-info', null, {
      duration: 200,
      easing: 'cubic-bezier(0.36,0.66,0.9,1)'
    });
  }  

}


