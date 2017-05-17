/*global require, module*/
const ApiBuilder = require('claudia-api-builder'),
	AWS = require('aws-sdk'),
	api = new ApiBuilder(),
	dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = api;

api.post('/user', function (request) {
	const params = {
		TableName: 'dynamo-test',
		Item: {
			userid: request.body.userId,
			name: request.body.name,
			age: request.body.age
		}
	};
	return dynamoDb.put(params).promise();
}, { success: 201 }); // Return HTTP status 201 - Created when successful


api.get('/users', function(request) {
	return dynamoDb.scan(
		{TableName: 'dynamo-test'},
	function(err, data) {
		return data;
	}).promise();
});

api.get('/users/{id}', function(request) {
	return dynamoDb.get({
		TableName: 'dynamo-test',
		Key: { "userid": request.pathParams.id}
	}, function(err, data) {
		return data;
	}).promise();
});
