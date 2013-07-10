/**
 *	Define base api url
 */
DS.RESTAdapter.reopen({
	namespace: 'public/api'
});
/**
 *	Specialized Plurals
 */
DS.RESTAdapter.configure("plurals", {});
/**
 *	Initialize Store
 */
App.Store = DS.Store.extend();