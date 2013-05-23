// Adds a dollar sign and appropriate commas to a provided number.
Ember.Handlebars.registerBoundHelper('formatCurrency', function(value) {
	value += '';
	// do not format empty values.
	if(!value) return '';

	//
	var x = value.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return '$'+ x1 + x2;
});

// Converts a given string to all upper case characters
Ember.Handlebars.registerBoundHelper('toUpperCase', function(value) {
	return String(value).toUpperCase();
});
