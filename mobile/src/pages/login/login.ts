import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { LocalStorage } from '../../app/services/localstorage';
import { LOGIN_TYPES } from './shared/login-types';

declare var VkSdk;

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
    private localStorage: LocalStorage
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
      this.localStorage.saveAuthorizationObject(obj);
    })
    .catch(e => console.log('Error logging into Facebook', e));
  }

  vkontakteLogin() {


console.log(1);
    VkSdk.initiateLogin(['photos', 'offline'], function(res) {
      console.log(res, "RESSESESE");
    }, function(error) {
      console.log(error, "ERRRORRRR");
    });

    document.addEventListener('vkSdk.newToken', function(token) {
      console.log('New token is ' + token);
    });

  }

}
