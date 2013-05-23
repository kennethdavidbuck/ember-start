/**
* @namespace Views
* @class BackgroundColorView
*/
App.BackgroundColorView = App.BaseView.extend({
	cssProperties:['backgroundColor'],
	didInsertElement:function() {
		"use strict";
		this._super();
		this.setProperties({
			duration:300,
			backgroundColor:this.get('color')
		});
	}
});
