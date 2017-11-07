import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CafeListPage } from './cafe-list';

@NgModule({
  declarations: [
    CafeListPage,
  ],
  imports: [
    IonicPageModule.forChild(CafeListPage),
  ],
})
export class CafeListPageModule {}
