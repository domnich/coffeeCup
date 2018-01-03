import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SearchResultsComponent } from "./search-results";

@NgModule({
    declarations: [
        SearchResultsComponent,
    ],
    imports: [
        IonicModule
    ],
    exports: [
        SearchResultsComponent
    ]
})
export class SearchResultsModule {}
