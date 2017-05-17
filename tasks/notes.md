Print all logs:
`aws logs filter-log-events --log-group-name /aws/lambda/web-api --region us-east-1`
`aws logs filter-log-events --log-group-name /aws/lambda/web-api --region us-east-1 --query events[].message`


`aws lambda list-functions --query Functions[].FunctionName`
`aws lambda list-functions --query Functions[].FunctionName --output text`
`aws lambda list-functions --query Functions[].FunctionName --output table`

`aws apigateway get-rest-apis --query 'items[?name==`web-api`].[name, id]' --region us-east-1 --output table`

`aws lambda get-function --region us-east-1 --function-name web-api`

download latest version of function as a zip
`curl $(aws lambda get-function --region us-east-1 --function-name web-api --query Code.Location --output text) > lambda.zip`
