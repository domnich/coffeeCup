import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import { CommonModule } from "@angular/common";
import { Facebook } from '@ionic-native/facebook';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { GooglePlus } from '@ionic-native/google-plus';

import {MyApp} from './app.component';
import {DataProvider} from '../providers/data/data';
import {HttpModule} from "@angular/http";
import { AppEmitterProvider } from '../providers/app-emitter/app-emitter';
import {Keyboard} from "@ionic-native/keyboard";
import {CitySelectComponent} from "../components/city-select/city-select";
import { DataService } from '../providers/shared/shared.service';
import { PlacesService } from '../pages/places/shared/places.service';
import { LocalStorage } from '../app/services/localstorage';
import { Auth } from '../app/services/auth';
import { UserProfileComponent } from '../components/user-profile/user-profile';

@NgModule({
    declarations: [
        MyApp,
        UserProfileComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp, {
            tabsPlacement: 'top',
            scrollAssist: false,
            scrollPadding: false
        }
        ),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        DataService,
        CitySelectComponent,
        StatusBar,
        Keyboard,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        DataProvider,
        AppEmitterProvider,
        Facebook,
        PlacesService,
        LocalStorage,
        Geolocation,
        Diagnostic,
        Auth,
        GooglePlus
        
    ],
    exports: [
        UserProfileComponent
    ]
})
export class AppModule {

}
