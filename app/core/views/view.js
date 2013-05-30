/**
* Reopending of Em.View with JQ.Transition mixin added
* @namespace Core
* @class View
*/
App.BaseView = Em.View.reopen(JQ.Transition, {
	duration: 200
});