const API = require('claudia-api-builder'),
	api = new API();

module.exports = api;

api.get('/hello', function (request) {
	return 'hello world';
});

api.get('/greet', function(request) {
	const name = request.queryString.name;
	return 'hello ' + name;
});

api.get('/greet/{name}', function(request) {
	const name = request.pathParams.name;
	return 'hello again, ' + name;
});
