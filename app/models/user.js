/**
 * Example User model
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
	 * Users first name
	 * @property username
	 * @type {String}
	 */
	firstName: DS.attr('string'),
	/**
	 * Users last name
	 * @property username
	 * @type {String}
	 */
	lastName: DS.attr('string'),
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
		return "%@ %@".fmt(this.get('firstName'), this.get('lastName'));
	}.property('firstName', 'lastName')
});