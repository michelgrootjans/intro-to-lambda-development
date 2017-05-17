exports.main = function (eventObject, context, callback) {
	console.log(JSON.stringify(eventObject));
	console.log(eventObject.Records[0].s3.object.key);
	callback(null, 'OK');
};
