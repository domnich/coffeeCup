import { Injectable } from '@angular/core';

import { LocalStorage } from '../services/localstorage';
import { Facebook } from '@ionic-native/facebook';

@Injectable()
export class Auth {
  constructor(
    private localStorage: LocalStorage,
    private fb: Facebook
  ) {}

  isAuthenticated() {
    return this.localStorage.getAuthorizationObject().then((res) => {
      return res;
    });
  }

  getFacebookUserDetails(userId: string) {
    return this.fb.api("/"+ userId +"/?fields=id,email,name,picture", ["public_profile"])
      .then(res => {
        return res;        
      })
      .catch(e => {
        console.log(e);
      });
  }

  logoutFacebook() {
    this.fb.logout()
    .then( res => {
      console.log(res, 'facebook logout');
    })
    .catch(e => console.log('Error logout from Facebook', e));
  }

}
