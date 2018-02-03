import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlacesPage } from './places';
import { SearchBarModule } from "../../components/search-bar/search-bar.module";


@NgModule({
  declarations: [
    PlacesPage
  ],
  imports: [
    SearchBarModule,
    IonicPageModule.forChild(PlacesPage),
  ]
})
export class PlacesPageModule {}
