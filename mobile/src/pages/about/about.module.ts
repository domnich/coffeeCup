import { CafeListPageModule } from './../cafe-list/cafe-list.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';

@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutPage),
    CafeListPageModule
  ],
})
export class AboutPageModule {}
