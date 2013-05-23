/**
* Basic User model
*
* @namespace Models
* @class User
*/
App.User = DS.Model.extend({
	/**
	* Users Username 
	* @property username
	* @type {String} 
	*/
	username: DS.attr('string'),
	
	/**
	* Users Email
	* @property email
	* @type {String} 
	*/
	email: DS.attr('string'),

	/**
	* Date user was created
	* @property createdAt
	* @type {String} 
	*/
	created_at: DS.attr('date'),
	
	/**
	* Users Full Name (firstName LastName)
	* @property fullName
	* @type {String} 
	*/	
	full_name: function() {
		"use strict";
		return "%@ %@".fmt(this.get('first_name'), this.get('last_name'));
	}.property('first_name', 'last_name')
	
});