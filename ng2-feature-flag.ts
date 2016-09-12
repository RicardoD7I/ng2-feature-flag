import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FeatureFlagComponent} from './src/feature-flag.component';

@NgModule({
    imports: [BrowserModule],
    declarations: [FeatureFlagComponent],
    exports: [FeatureFlagComponent]
})
export class FeatureFlagModule {}
