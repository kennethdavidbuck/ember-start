/**
* Reopening of DS.Model
* @namespace Core
* @class Model
*/
DS.Model.reopen({
	/**
	 * Sums up all values from a given property in the model
	 *
	 * @param property The a property (must be an array!) to iterate over
	 * @param key The property being added to the total sum
	 * @return {Number} Resulting total after summing up all object
	 */
	calculate:function(property,key) {
		"use strict";
		var total = 0;
		this.get(property).forEach(function(item){
			var value = item.get(key);
			total+= (Ember.isEmpty(value) || isNaN(value) ) ? 0 : parseInt(value,10);
		});
		
		return total;
	},

	/**
	 * Checks if a given property results to true. If so it includes a value
	 * as produced by calling the given key on the object.
	 *
	 * @param property An array within the current model
	 * @param key Used to check if a given property if true or false
	 * @param value User to obtain property value to add to the total
	 * @return {Number} Sum of values where property of satisfied
	 */
	conditionalAccumulate:function(property,key,value) {
		"use strict";
		var total = 0;
		var paid =  this.get(property).forEach(function(item){
			if(item.get(key)) {
				var tempValue = item.get(value);
				total+= (Ember.isEmpty(tempValue) || isNaN(tempValue)) ? 0 : parseInt(tempValue,10);
			}
		});
		
		return total;
	},

	/**
	 * Checks if a given property results to true. If so a total is incremented
	 *
	 * @param property An array within the current model
	 * @param keys a single, or list of keys to check on the model (for a boolean value)
	 * @return {Number} Total count of objects satisfying all key requirements
	 */
	conditionalCount:function(property,keys) {
		"use strict";
		keys = [].concat(keys);

		var total = 0;
		this.get(property).forEach(function(item){
			var result = true;
			for(var i=0;i<keys.length;i++) {
				result &= item.get(keys[i]);
			}
			if(result) {
				total++;
			}
		});
		
		return total;
	}
});