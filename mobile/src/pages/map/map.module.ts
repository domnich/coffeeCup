import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MapPage} from './map';
import {GoogleMaps} from "@ionic-native/google-maps";
import {SearchBarModule} from "../../components/search-bar/search-bar.module";


@NgModule({
    declarations: [
        MapPage,
    ],
    providers: [
        GoogleMaps
    ],
    imports: [
        SearchBarModule,
        IonicPageModule.forChild(MapPage),
    ],
})
export class MapPageModule {
}
