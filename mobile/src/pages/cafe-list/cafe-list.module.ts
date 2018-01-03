import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CafeListPage } from './cafe-list';
import { SearchBarModule } from "../../components/search-bar/search-bar.module";
import { WheelSelectorModule } from "../../components/wheel-selector/wheel-selector.module";
import { SearchResultsModule } from '../../components/search-results/search-results.module';

@NgModule({
    declarations: [
        CafeListPage,
    ],
    imports: [
        SearchResultsModule,
        SearchBarModule,
        WheelSelectorModule,
        IonicPageModule.forChild(CafeListPage),
    ],
})
export class CafeListPageModule {
}
