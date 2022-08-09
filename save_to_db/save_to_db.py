import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('485_test')

def lambda_handler(event, context):
	ID = event['key']
	first_name = event['value']

	response = table.put_item(
		Item={
			'ID': ID,
			'Name': first_name
		})

	return {
		'statusCode': 200,
		'body': json.dumps('My name is '+ first_name)
	}
