import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('485_test')

def lambda_handler(event, context):
	ID = event['key']
	name = event['value']

	table.put_item(
		Item={
			'ID': ID,
			'Name': name
		})

	return {
		'statusCode': 200,
		'body': json.dumps('Successfully save to database')
	}
