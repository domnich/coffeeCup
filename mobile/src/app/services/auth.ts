import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { LocalStorage } from '../services/localstorage';
import { Facebook } from '@ionic-native/facebook';
import { API_URL } from '../constants';

@Injectable()
export class Auth {
  constructor(
    private localStorage: LocalStorage,
    private http: Http,
    private fb: Facebook
  ) {}

  loginUsingFacebook(obj: any) {
    const url = `${ API_URL }/auth/fb`;
    return this.http.post(url, obj)
    .do((res) => res)
    .map((res) => {
      console.log(res);
    })
  }

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
