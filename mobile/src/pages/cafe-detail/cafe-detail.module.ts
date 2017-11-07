import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CafeDetailPage } from './cafe-detail';

@NgModule({
  declarations: [
    CafeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CafeDetailPage),
  ],
})
export class CafeDetailPageModule {}
