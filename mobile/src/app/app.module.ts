import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import { CommonModule } from "@angular/common";
import {MyApp} from './app.component';
import {DataProvider} from '../providers/data/data';
import {HttpModule} from "@angular/http";
import { AppEmitterProvider } from '../providers/app-emitter/app-emitter';
import {Keyboard} from "@ionic-native/keyboard";

import {CitySelectComponent} from "../components/city-select/city-select";

import {HomePageModule} from "../pages/home/home.module";
import {WheelSelector} from "../../plugins/cordova-wheel-selector-plugin/examples/ionic2/dist/wheel-selector/index";
import { DataService } from '../providers/shared/shared.service';

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        CommonModule,
        HomePageModule,
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
        MyApp,

    ],
    providers: [
        DataService,
        WheelSelector,
        CitySelectComponent,
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
