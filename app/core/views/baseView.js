/**
* @namespace Core
* 
* Mixin' to a to add property delegates for JQ.Transition
*
* @class BaseView
*/
App.BaseView = Ember.View.extend(JQ.Transition, {
	duration: 200,
	router: Ember.computed(function() {
		"use strict";
		return this.get('controller').container.lookup('router:main');
	})
});