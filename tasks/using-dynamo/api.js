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
		{TableName: request.env.userTable},
	function(err, data) {
		return data;
	}).promise();
});

api.get('/users/{id}', function(request) {
	return dynamoDb.get({
		TableName: request.env.userTable,
		Key: { "userid": request.pathParams.id}
	}, function(err, data) {
		return data;
	}).promise();
});

api.put('/users/{id}/{name}', function(request) {
	return dynamoDb.update({
		TableName: request.env.userTable,
		Key: { "userid": request.pathParams.id},
		UpdateExpression: "set name=:n",
		ExpressionAttributeValues:{
			":n": request.pathParams.name
		}
	}, function(err, data) {
		return data;
	}).promise();
});

api.get('/debug', function(request) {
	console.log(request);
	return request;
});

api.get('/users/search/{q}', function(request) {
	return dynamoDb.query({
		TableName: request.env.userTable,
		KeyConditionExpression: '...'
	}, function(err, data) {
		return data;
	}).promise();
});
