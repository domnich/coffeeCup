import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CafeListComponent } from "./cafe-list";

@NgModule({
    declarations: [
        CafeListComponent,
    ],
    imports: [
        IonicModule
    ],
    exports: [
        CafeListComponent
    ]
})
export class CafeListModule {}
