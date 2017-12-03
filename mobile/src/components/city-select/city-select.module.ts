import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CitySelectComponent } from "./city-select";

@NgModule({
    declarations: [
        CitySelectComponent,
    ],
    imports: [
        IonicModule
    ],
    exports: [
        CitySelectComponent
    ]
})
export class CitySelectModule {}
