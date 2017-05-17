# Create dynamo table
aws dynamodb create-table --table-name dynamo-test \
  --attribute-definitions AttributeName=userid,AttributeType=S \
  --key-schema AttributeName=userid,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --query TableDescription.TableArn --output text

  aws dynamodb create-table --table-name users \
    --attribute-definitions AttributeName=userid,AttributeType=S \
    --key-schema AttributeName=userid,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
    --query TableDescription.TableArn --output text

# Get all users
curl https://vl1ua4xwdf.execute-api.eu-central-1.amazonaws.com/latest/users

# Create new user
curl -H "Content-Type: application/json" -X POST --data @example.json https://vl1ua4xwdf.execute-api.eu-central-1.amazonaws.com/latest/user

# Update existing user
curl -H "Content-Type: application/json" -X PUT https://vl1ua4xwdf.execute-api.eu-central-1.amazonaws.com/latest/users/123/NewName
