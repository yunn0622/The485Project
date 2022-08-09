import json
import boto3

dynamodb = boto3.client('dynamodb')

def lambda_handler(event, context):
    ID = event['ID']
    data = dynamodb.get_item(
        TableName='485_test',
        Key={
            'ID': {"S": ID}
        })

    response = {
        'statusCode': 200,
        'body': json.dumps(data)
    }

    return response
