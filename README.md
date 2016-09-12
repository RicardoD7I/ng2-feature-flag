# ng2-featureFlags

This is public beta.

The project will contain a component for feature flags in Angular 2.

# Usage
```html
<feature-flag feature="frenchMessage" language="{{browserLang}}">
  <div class="pull-right">
      <img src="http://cromwell-intl.com/travel/athens-to-paris/pictures/france_small.png"/>
    </div>
</feature-flag>
```

# configuration (example on a shared module, to reuse the feature flag)
```javascript

// main module
import { FeatureFlagComponent } from '/feature-flag/index';
// feature flags configuration
import {Features} from './config/features.config';


@NgModule({
  imports: [],
  declarations: [
   
    FeatureFlagComponent

  ],
  exports: [

    FeatureFlagComponent,

  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
  	    {
          provide: 'featureFlags',
          useValue: Features
        }]
    };
  }
}
```


# features flags config file
```javascript
export const Features = {
  "navbar" : {
    "country" : ["AR","BR"],
    "language" : "ES",
    "userRole" : ["user"]
  },
  "frenchMessage" : {
    "language" : "fr"
  }
};
```
