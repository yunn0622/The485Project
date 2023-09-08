import boto3
import json
from io import BytesIO
from PyPDF2 import PdfReader, PdfWriter

dynamodb = boto3.client('dynamodb')
s3_client = boto3.client("s3")
S3_BUCKET_NAME = '485project'
object_key = "i-485_first_page.pdf"


def retrieve_from_db(user_id):
    try:
        response = dynamodb.get_item(
            TableName='485_test',
            Key={
                'ID': {'S': user_id}
            })

        print(response)
        if 'Item' in response:
            form_data = json.loads(response['Item']['values']['S'])
            return form_data
        else:
            print("Item not found in DynamoDB")
            return None

    except Exception as e:
        print("Error retrieving data from DynamoDB:", e)
        return None


def lambda_handler(event, context):
    print(event)
    user_id = event['queryStringParameters']['userId']
    user_id = user_id.strip("'")
    form_data = retrieve_from_db(user_id)

    if form_data is None:
        return {
            'statusCode': 404,
            'body': json.dumps('Data not found')
        }

    writer = PdfWriter()
    file_path = '/tmp/' + object_key
    s3_client.download_file(S3_BUCKET_NAME, object_key, file_path)
    pdf_file = PdfReader(file_path)

    page = pdf_file.pages[0]
    writer.add_page(page)

    writer.update_page_form_field_values(
        writer.pages[0], form_data)
    output_file = '/tmp/filled_out.pdf'

    with open(output_file, 'wb') as output_stream:
        writer.write(output_stream)

    s3_client.upload_file(output_file, S3_BUCKET_NAME, 'filled_out.pdf')

    download_url = s3_client.generate_presigned_url(
        ClientMethod='get_object',
        Params={'Bucket': S3_BUCKET_NAME, 'Key': 'filled_out.pdf'},
        ExpiresIn=3000)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Credentials': True
        },
        'body': json.dumps({
            'message': 'Filled out pdf file has been successfully saved to the s3 bucket',
            'url': download_url
        })
    }