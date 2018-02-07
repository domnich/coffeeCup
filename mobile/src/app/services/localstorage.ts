import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable()
export class LocalStorage {
  constructor(
    private storage:Storage
  ) {}

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
}