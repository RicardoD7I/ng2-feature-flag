import { Component, Input, OnInit, DoCheck, Inject, KeyValueDiffers  } from '@angular/core';

/**
 * This class represents the navigation bar component.
 */
@Component({
  selector: 'feature-flag',
  template: '<ng-content *ngIf="condition"></ng-content>'
})

// TODO2: consider events for dynamic changes of properties on   @Inputs
export class FeatureFlagComponent implements OnInit, DoCheck {

  // ID of the feature to feature-flag
  @Input() feature: string;
  
  // Properties for condition checks
  @Input() country: string;
  @Input() language: string;
  @Input() userRole: string;

  // property for comparison of all the conditions
  differ: any;

  // if this attribute is true, shows the feature
  condition: boolean = false;

  // feature flags for all the features
  features: {};

  /**
  * Class constructor
  */
  constructor( @Inject('featureFlags') featureFlags : any, private differs: KeyValueDiffers) {
    this.differ = differs.find({}).create(null);
    this.features = featureFlags;

  }

  /**
  * When the class init
  */
  ngOnInit() {
    // do all the conditions calculations
    this.calculateConditions();
	this.differ.diff({
        language: this.language,
        country : this.country,
        userRole : this.userRole
      });
  }


     ngDoCheck() {
   	 var changes = this.differ.diff({
        language: this.language,
        country : this.country,
        userRole : this.userRole
      });

   		if(changes) {
			this.calculateConditions()
		} 
   	}


  /*
  * Check all the conditions
  */
  calculateConditions() {
    var featureConditions : any  = this.features[this.feature];
    try {

      // check if there is configuration for a given feature
      if (typeof featureConditions == "undefined") {
        throw "no_configuration(" + this.feature + ")"

      }

      // final resul (true or false) for all the calculations
      var finalResult = true;

      // the possible properties to evaluate for  feature flag conditions
      // TODO1: remove items that are not present in configuration file for a given item
      var properties = ["country", "language", "userRole"];

      // current values of the component, parameters of the feature flag
      var componentValues = {
        country: (typeof this.country != "undefined" ? this.country : null),
        language: (typeof this.language != "undefined" ? this.language : null),
        userRole: (typeof this.userRole != "undefined" ? this.userRole : null)
      }

      // evaluate all the properties for this feature
      for (var itemProperty in properties) {

        // value for each proerty and it's id
        var propertyId = properties[itemProperty];
        var itemValue = featureConditions[propertyId];
        var componentValue : string = componentValues[propertyId];

        // assume that the property condition is valid
        var propertyCondition = true;

        // consider array or single value
        if (typeof itemValue === "undefined") {
          // not defined on configuration file : remove this when TODO1 is done
        } else if (typeof itemValue === "string") {

          // it's a simple string (normalized to lowercase)
          propertyCondition = itemValue.toLowerCase() == componentValue.toLowerCase();

        } else {
          // it's an array, first normalize values to lowercase
          var lowerCaseItemValue : Array<string> = itemValue.map(function(value : string) {
            return value.toUpperCase();
          });

          // check  this condition is true
          propertyCondition = lowerCaseItemValue.indexOf(componentValue.toLowerCase()) > -1
        }

        // stop when the first condition is not true
        if (!propertyCondition) {
          finalResult = false;
          break;
        }
      }

      // assign the final condition value to update the tempalte
      this.condition = finalResult;
    } catch (err) {
      console.error("[feature_flags] [Error] : " + err);
    }
  }




}
