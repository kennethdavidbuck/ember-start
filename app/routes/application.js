App.ApplicationRoute = Em.Route.extend({
	/**
	* Executed upon entering the route
	*/
	activate:function() {
		"use strict";
		console.log('activate');
	},
	
	/**
	* Executed upone exiting the route
	*/
	deactivate:function() {
		"use strict";
		console.log('deactivate');
	}
});