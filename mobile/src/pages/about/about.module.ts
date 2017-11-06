import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
import {CafeListModule} from "../../components/cafe-list/cafe-list.module";

@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutPage),
      CafeListModule
  ],
})
export class AboutPageModule {}
