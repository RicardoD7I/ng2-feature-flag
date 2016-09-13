# ng2-featureFlags

This is public beta.

The project will contain a component for feature flags in Angular 2.
The Feature that is being wrapped around the <feature-flag> tag is not rendered.

Please, let me know about if this module is usefull, any feedback is welcome. I.e: new attributes for the conditions.
Todos:
- unit tests
- build system with gulp


# Usage
```html
<feature-flag feature="frenchMessage" language="{{browserLang}}">
  <div class="pull-right">
      <img src="http://cromwell-intl.com/travel/athens-to-paris/pictures/france_small.png"/>
    </div>
</feature-flag>


```
You can use also: country, userRole and language, this should map against the provided configuration
```
<feature-flag feature="frenchMessage" language="EN" country="AR" userRole="admin">
```


# configuration (example on a shared module, to reuse the feature flag)
```javascript

// main module
import { FeatureFlagModule } from '/feature-flag/index';

// feature flags configuration
import {Features} from './config/features.config';


@NgModule({
  imports: [FeatureFlagModule],
  declarations: [],
  exports: [ FeatureFlagModule ]
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


# features flags config file. I.e.: ./config/features.config
This file maps a feature with it's conditions to be shown
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
