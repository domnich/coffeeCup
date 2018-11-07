import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { ContentHeightModule } from '../../directives/content-height/content-height.module';


@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    ContentHeightModule
  ],
})
export class SignupPageModule {}
