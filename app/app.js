/**
 * EMBER DEBUGGING APPROACHES
 * source: http://www.akshay.cc/blog/2013-02-22-debugging-ember-js-and-ember-data.html
 *
 * Log Object Bindings:
 * Ember.LOG_BINDINGS = true;
 *
 * View All Registered Route:
 * Ember.keys(App.Router.router.recognizer.names);
 *
 * Log State Transitions:
 * record.stateManager.get('currentPath')
 *
 * View Registered Temlates:
 * Ember.keys(Ember.TEMPLATES)
 *
 * View an instance of something from the container:
 * App.__container__.lookup("controller:posts")
 * App.__container__.lookup("route:application")
 *
 * View ember-data's identity map:
 * App.__container__.lookup('store:main').recordCache # all records in memory
 * App.__container__.lookup('store:main').recordCache[2].get('data.attributes') #attributes
 * App.__container__.lookup('store:main').recordCache[2].get('comments') #loaded associations
 *
 * See all observers for a object, key:
 * Ember.observersFor(comments, keyName);
 *
 * Dealing with deprecations:
 * Ember.ENV.RAISE_ON_DEPRECATION = true
 * Ember.LOG_STACKTRACE_ON_DEPRECATION = true
 *
 *
 * Handlebars:
 * {{debugger}}
 * {{log record}}
 *
 * Implement a Ember.onerror hook to log all errors in production:
 * Ember.onerror = function(error) {
 *  Em.$.ajax('/error-notification', 'POST', {
 *     stack: error.stack,
 *    otherInformation: 'exception message'
 *  });
 * }
 *
 * Use ember extension when its ready:
 * https://github.com/tildeio/ember-extension.git
 */

// Application
window.App = Em.Application.create({
	LOG_TRANSITIONS: true
});