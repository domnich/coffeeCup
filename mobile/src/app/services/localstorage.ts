import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FacebookLoginResponse } from '@ionic-native/facebook';

@Injectable()
export class LocalStorage {
  constructor(
    private storage:Storage
  ) {}

  saveAuthorizationObject(obj: {type: string, data: FacebookLoginResponse | any}) {
    console.log(obj, 'SAVE FB AUTH OBJ TO STORAGE');
    console.log(this.stringifyObj(obj), 123456);
    
    this.storage.set('auth', this.stringifyObj(obj));
  }

  getAuthorizationObject() {
    return this.storage.get('auth').then( auth => {
      return this.parseResponse(auth);
    });
  }

  saveCafesToStorage(cafes: Array<any>) {
    let obj = {
      khariv: cafes
    };
    this.storage.set('cafes', this.stringifyObj(obj));
  }

  getCafesFromStorage() {
    return this.storage.get('cafes').then( cafes => {
      return this.parseResponse(cafes);
    });
  }

  setUserLocation(geolocation: {latitude: string, longitude: string}) {
    this.storage.set('geolocation', this.stringifyObj(geolocation));
  }

  getUserLocation() {
    return this.storage.get('geolocation').then( geolocation => {
      return this.parseResponse(geolocation);
    });
  }

  stringifyObj(obj) {
    return JSON.stringify(obj);
  }

  parseResponse(res: any) {
    return JSON.parse(res);
  }

  clearStorage() {
    this.storage.clear().then(()=>{
      console.log('all keys are cleared');
    });
  }

  getCafeById(id: number) {
    return this.storage.get('cafeInfo').then((res) => {
      let cafes = this.parseResponse(res);
      console.log(cafes, 'cafes');
      return cafes && cafes[id] || null;
    });
  }

  saveCafeToStorage(cafe) {
    this.storage.get('cafeInfo').then((res) => {
        let list = {};
        if (res) {
          list = this.parseResponse(res);
        }
        list[cafe.id] = cafe;
        this.storage.set('cafeInfo', this.stringifyObj(list));
    });
  }
}
