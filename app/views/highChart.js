/**
* Simple Wrapper View for HighCharts
*
* @namespace Views
* @class HighChartView
*/
App.HighChartView = App.BaseView.extend({
	/**
	* A wrapped instance of HighChart
	* @property chart
	* @type {HighChart}
	*/
	chart:false,
		
	//
	didInsertElement:function() {
		"use strict";
		this._super();
		this.set('chart',new Highcharts.Chart(this.get('data')));
	},
	
	//
	dataObserver:function() {
		"use strict";
		this.set('chart',new Highcharts.Chart(this.get('data')));
	}.observes('data')
});