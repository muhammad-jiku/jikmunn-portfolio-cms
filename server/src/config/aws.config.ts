import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

export const awsConfig = {
  region: process.env.AWS_S3_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  s3: {
    bucketName: process.env.AWS_S3_BUCKET_NAME || '',
  },
};

// Configure AWS SDK
AWS.config.update({
  region: awsConfig.region,
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey: awsConfig.secretAccessKey,
});

// Create S3 instance
export const s3 = new AWS.S3();

// Validate required AWS config
if (!awsConfig.accessKeyId || !awsConfig.secretAccessKey || !awsConfig.s3.bucketName) {
  console.warn('⚠️  AWS S3 configuration is incomplete. File uploads will not work properly.');
}
