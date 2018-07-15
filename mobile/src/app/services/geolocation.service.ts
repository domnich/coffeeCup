import { Injectable } from '@angular/core';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';
import { DataService } from '../../providers/shared/shared.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Injectable()
export class GeolocationService {

  constructor(
    private diagnostic: Diagnostic,
    private geolocation: Geolocation,
    private shareDate: DataService,
    private alertCtrl: AlertController,
    private openNativeSettings: OpenNativeSettings
  ) {

  }

  getUserCoordinates() {
    this.diagnostic.getLocationAuthorizationStatus().then((res) => {
      console.log(res, 'getLocationAuthorizationStatus');

      // IOS
      //1. если еще не спрашивали not_determined
      //2. если при первом разрешить  использ. локацию requestLocationAuthorization, был denied, то getLocationAuthorizationStatus в след раз выдаст denied.
      //3. если был not_determined (т.е. первый запуск) и потом разрешили , то статус в requestLocationAuthorization будет - authorized_when_in_use
      // 4. если мы разрешили использовать локацию, при  запуске приложения будет authorized_when_in_use и получаем геолокаию

      if(res === 'not_determined' || res === 'denied') {
        if (res === 'denied') {
          this.askToOpenSettingsPage();
        } else {
          this.askGeoPermissions();
        }
      } else if(res === 'authorized_when_in_use') {
        this.requestGeolocation();
      }
    });
  }

  askToOpenSettingsPage() {
    let alert = this.alertCtrl.create({
      title: 'Allow geolocation',
      message: "The Settings page for the app will now open. Select \"Location\" and set it to \"Always\" then return to this app via the Home screen",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Opening Settings page',
          handler: () => {
            console.log('TADAM');
            // Что то не открывает на иосе
            this.openNativeSettings.open('location').then(res => {
              console.log('im here!!!!!')
              this.shareDate.updateUserLocation = true;
              console.log(this.shareDate.updateUserLocation, '==111234===');
              // на app.resume запросить флаг и если тру, то сделать повторный запрос на геолокацию
            });
          }
        }
      ]
    });
    alert.present();
   
  }

  askGeoPermissions() {
    this.diagnostic.requestLocationAuthorization().then((status) => {
      if(status === 'not_determined' || status === 'authorized_when_in_use') {
        this.requestGeolocation();
      }
    }, (err) => {
      console.log(err, "ERURURURUR");
    }).catch((err) => {
      console.log(err, 'ITS ERROR');
    });
  }

  requestGeolocation() {
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

}
