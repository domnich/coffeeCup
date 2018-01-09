import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubscriptionPage } from './subscription';
import { WheelSelectorModule } from '../../components/wheel-selector/wheel-selector.module';

@NgModule({
  declarations: [
    SubscriptionPage,

  ],
  imports: [
    WheelSelectorModule,
    IonicPageModule.forChild(SubscriptionPage),
  ],
})
export class SubscriptionPageModule {}
