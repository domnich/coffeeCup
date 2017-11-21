import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import {SearchBarComponent} from "../../components/search-bar/search-bar";

@NgModule({
  declarations: [
    TabsPage,
      SearchBarComponent
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
  ],
})
export class TabsPageModule {}
