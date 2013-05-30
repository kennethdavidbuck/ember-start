/**
* Mixin to add property delegates for JQ.Transition
* @namespace Core
* @class BaseView
*/
App.BaseView = Ember.View.reopen(JQ.Transition, {
	duration: 200
});