import boto3
from PyPDF2 import PdfReader, PdfWriter

s3_client = boto3.client("s3")
S3_BUCKET_NAME = '485project'
object_key = "i-485_first_page.pdf"


def lambda_handler(event, context):
    writer = PdfWriter()
    file_path = '/tmp/' + object_key
    s3_client.download_file(S3_BUCKET_NAME, object_key, file_path)
    pdf_file = PdfReader(file_path)

    page = pdf_file.pages[0]
    writer.add_page(page)
    writer.update_page_form_field_values(
        writer.pages[0], {
            'Pt1Line1a_FamilyName[0]': 'this is',
            'Pt1Line1b_GivenName[0]': 'test',
            'Pt1Line2a_FamilyName[0]': 'Hello'
        }
    )
    output_file = '/tmp/filled_out.pdf'

    with open(output_file, 'wb') as output_stream:
        writer.write(output_stream)

    response = s3_client.upload_file(output_file, S3_BUCKET_NAME, 'filled_out.pdf')

    return response