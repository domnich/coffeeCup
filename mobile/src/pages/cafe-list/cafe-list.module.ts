import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CafeListPage } from './cafe-list';
import { SearchBarModule } from "../../components/search-bar/search-bar.module";
import { WheelSelectorModule } from "../../components/wheel-selector/wheel-selector.module";

@NgModule({
    declarations: [
        CafeListPage,
    ],
    imports: [
        SearchBarModule,
        WheelSelectorModule,
        IonicPageModule.forChild(CafeListPage),
    ],
})
export class CafeListPageModule {
}
