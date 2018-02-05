import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable()
export class LocalStorage {
  constructor(
    private storage:Storage
  ) {}

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
