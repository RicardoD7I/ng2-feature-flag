import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FeatureFlagComponent } from './feature-flag.component';


@NgModule({
	imports : [BrowserModule ],
  exports: [
    FeatureFlagComponent,
	BrowserModule
  ],
  declarations: [FeatureFlagComponent]
})
export class FeatureFlagModule {
}