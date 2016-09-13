# ng2-featureFlags


A 'feature flag' (or Feature Toggle) is the ability to turn features (sub-sections) of your application on/off with some conditions.
The Feature that is being wrapped around the <feature-flag> tag is not rendered.
This module provides 3 possible variables to turn on/off a feature: language, country and userRole. 
You can use the conditions that you need, and it will map this to the configuration file.

The module was tested with Angular2 RC6.

Please, let me know about if this module is usefull, any feedback is welcome. I.e: new attributes for the conditions.
If you are integrating this in your project, I will be very happy to help with that.


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

#Install from npm
```
npm install ng2-feature-flag --save
```

#Todos:
- unit tests
- build system with gulp