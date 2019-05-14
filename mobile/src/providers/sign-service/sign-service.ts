import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../app/constants';

@Injectable()
export class SignServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SignServiceProvider Provider');
  }

  public createUser(user) {
    return this.http.post(`${API_URL}/auth`, user);
  }

}
