import { CafeListPageModule } from './../cafe-list/cafe-list.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainPage } from './main';

@NgModule({
  declarations: [
    MainPage,
  ],
  imports: [
    IonicPageModule.forChild(MainPage)
  ],
  entryComponents: [
    MainPage
  ],
})
export class MainPageModule {}
