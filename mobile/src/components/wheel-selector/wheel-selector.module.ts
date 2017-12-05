import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { WheelSelectorComponent } from "./wheel-selector";

@NgModule({
    declarations: [
        WheelSelectorComponent,
    ],
    imports: [
        IonicModule
    ],
    exports: [
        WheelSelectorComponent
    ]
})
export class WheelSelectorModule {}
