// Converts a given string to all upper case characters
Em.Handlebars.registerBoundHelper('toUpperCase', function(value) {
	return String(value).toUpperCase();
});
