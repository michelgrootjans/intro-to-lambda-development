exports.main = function (eventObject, context, callback) {
	var AWS = require('aws-sdk');
	var s3 = new AWS.S3();
	var fs = require('fs');

	// console.log(JSON.stringify(eventObject));
	// console.log(JSON.stringify(context));
	var fileName = eventObject.Records[0].s3.object.key;
	var bucketName= eventObject.Records[0].s3.bucket.name;
	var tempFile ='/tmp/'+ context.awsRequestId + '.jpg';

	var params = {
		Bucket: bucketName,
		Key: fileName
	}

	s3.getObject(params, function(err, data) {
		console.log(JSON.stringify(data));
		// save data to tmp/lkqshjdf
		fs.writeFile(tempFile, data.Body, function(err) {
			console.log("file just created: " + tempFile);

			var thumbnailFile = tempFile + ".thumbnail.jpg";
			var command = "convert " + tempFile + " -resize 50% " + thumbnailFile ;
			// create thumbnail with imagemagick
			require('child_process').exec(command, function(err, data) {
				console.log(err);
				// upload thumbnail to S3
				var thumbnailParams = {
					Bucket: bucketName,
					Key: '/thumbnails/' + thumbnailFile,
					Body: fs.createReadStream(thumbnailFile)
				};
				s3.upload(thumbnailParams, function(err, data) {
				  console.log(err, data);
				});	})
			});

		});

	callback(null, 'OK');
};
