import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('485_test')


def lambda_handler(event, context):
    last_name = event['lName']
    first_name = event['fName']

    with table.batch_writer() as batch:
        batch.put_item(
            Item={
                'ID': "Pt1Line1a_FamilyName[0]",
                'Name': last_name
            }
        )
        batch.put_item(
            Item={
                'ID': "Pt1Line1b_GivenName[0]",
                'Name': first_name
            }
        )

    return {
        'statusCode': 200,
        'body': json.dumps('Successfully save to database')
    }
