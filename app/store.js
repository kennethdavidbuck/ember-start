// Initialize DataStore
App.store = DS.Store.create({
	revision: 12,
	adapter: DS.RESTAdapter.create({
		bulkCommit: false,
		url:'http://localhost/public/api',
		// TODO: Find out if there is a better way to pluralize
		serializer:DS.RESTSerializer.extend({
			init:function() {
				"use strict";
				this._super();
				this.configurations.set('plurals',{category:'categories'});
			}
		})
	})
});
