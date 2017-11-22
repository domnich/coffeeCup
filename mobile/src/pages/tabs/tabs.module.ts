import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import {SearchBarModule} from "../../components/search-bar/search-bar.module";


@NgModule({
  declarations: [
    TabsPage
  ],
  imports: [
      SearchBarModule,
    IonicPageModule.forChild(TabsPage),
  ],
})
export class TabsPageModule {}
