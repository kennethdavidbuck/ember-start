/**
 * Example User model
 *
 * @namespace Models
 * @class User
 */
App.User = RL.Model.extend({
	/**
	 * Users Username
	 * @property username
	 * @type {String}
	 */
	username: RL.attr('string'),
	/**
	 * Users first name
	 * @property firstName
	 * @type {String}
	 */
	firstName: RL.attr('string'),
	/**
	 * Users last name
	 * @property lastName
	 * @type {String}
	 */
	lastName: RL.attr('string'),
	/**
	 * Users Email
	 * @property email
	 * @type {String}
	 */
	email: RL.attr('string'),
	/**
	 * Date user was created
	 * @property createdAt
	 * @type {String}
	 */
	created_at: RL.attr('date'),
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
