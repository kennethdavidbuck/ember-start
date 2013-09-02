/**
 *	Define base api url
 */
DS.RESTAdapter.reopen({
	namespace: 'public/api'
});

/**
 *	Initialize Store
 */
App.Store = DS.Store.extend();