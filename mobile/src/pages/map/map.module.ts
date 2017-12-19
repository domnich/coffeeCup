import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MapPage} from './map';
import {SearchBarModule} from "../../components/search-bar/search-bar.module";


@NgModule({
    declarations: [
        MapPage,
    ],
    providers: [
        
    ],
    imports: [
        SearchBarModule,
        IonicPageModule.forChild(MapPage),
    ],
})
export class MapPageModule {
}
