/**
* Formats value and  colors based on a supplied  truthValue.
*
* @namespace Views
* @class ColoredValueView
*/
App.ColoredValueView = Ember.View.extend(JQ.Transition,{
	template:Ember.Handlebars.compile('{{view.formatValue}}'),
	cssProperties:['color'],

	didInsertElement:function(){
		"use strict";
		this._super();
		this.colorObserver();
	},
	
	/**
	* Transition duration
	* @property duration
	* @type {Integer}
	* @default 400
	*/
	duration:400,

	/**
	* Color to use when truthValue is true (hex etc)
	* @property trueColor
	* @type {String} 
	* @default #8dc500
	*/
	trueColor:'#8dc500',
	
	/**
	* Color to use when truthValue is false (hex etc)
	* @property falseColor
	* @type {String} 
	* @default #cc0000
	*/	
	falseColor:'#cc0000',
	
	/**
	* @property truthValue
	* @type {Boolean} 
	* @default true
	*/
	truthValue:true,
	
	/**
	* Actual value to display (a string, number etc.)
	* @property value
	* @type {String}
	* @default 0
	*/
	value:'0',
	
	/**
	* Reverse trueColor and falseColor
	* @property swapColors
	* @type {Boolean}
	* @default false
	*/	
	swapColors:false,
	
	/**
	* If set to true adds a dollar sign, and applicable commas
	* @property isCurrency
	* @type {Boolean}
	* @default false
	*/		
	isCurrency:false,

	/**
	* Current value formatted with $ and commas 
	*
	* @property formatValue
	* @type {String}
	*/		
	formatValue:function() {
		"use strict";
		if(this.get('isCurrency')) {
			return '$'+this.get('value').toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
		}
		return this.get('value');
	}.property('truthValue','trueColor','falseColor','value','swapColors'),

	colorObserver:function() {
		"use strict";
		var truthValue = this.get('truthValue');
		if(this.get('swapColors')) {
			truthValue = !truthValue;
		}
		var color = truthValue ? this.get('trueColor') : this.get('falseColor');
		this.set('color',color);
	}.observes('truthValue','trueColor','falseColor','value','swapColors')
});
