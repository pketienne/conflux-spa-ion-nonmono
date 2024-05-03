import { Resource } from 'sst';
import Form from '@/components/form';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import styles from './form.module.css';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export default async function Home() {
	const command = new PutObjectCommand({
		Key: crypto.randomUUID(),
		Bucket: Resource.MyBucket.name,
	});
	const url = await getSignedUrl(new S3Client({}), command);

	await client.send(
		new QueryCommand({
			TableName: Resource.MyTable.name,
			KeyConditionExpression: 'userId = :userId',
			ExpressionAttributeValues: {
				':userId': 'my-user-id',
			},
		}),
	);

	return (
		<main className={styles.main}>
			<Form url={url} />
		</main>
	);
}
