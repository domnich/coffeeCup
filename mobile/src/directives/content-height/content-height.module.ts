import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentHeightDirective } from './content-height';
@NgModule({
	declarations: [ContentHeightDirective],
	imports: [
		IonicModule,
		CommonModule
    ],
	exports: [ContentHeightDirective]
})
export class ContentHeightModule {}
