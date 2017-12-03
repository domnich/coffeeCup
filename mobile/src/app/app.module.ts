import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {DataProvider} from '../providers/data/data';
import {HttpModule} from "@angular/http";
import { AppEmitterProvider } from '../providers/app-emitter/app-emitter';
import {Keyboard} from "@ionic-native/keyboard";
import {CitySelectModule} from "../components/city-select/city-select.module";

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        CitySelectModule,
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp, {
            tabsPlacement: 'top',
            scrollAssist: false,
            scrollPadding: false
        }
        )
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        StatusBar,
        Keyboard,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        DataProvider,
        AppEmitterProvider
    ]
})
export class AppModule {
}
