import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('485_test')


def lambda_handler(event, context):
    ID = event['ID']
    values = event['values']

    table.put_item(
        Item={
            'ID': ID,
            'values': values
        })

    return {
        'statusCode': 200
        # 'body': json.dumps('Successfully save to database')
    }