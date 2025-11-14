import dotenv from 'dotenv';

dotenv.config();

export const cognitoConfig = {
  region: process.env.AWS_REGION || 'us-east-1',
  userPoolId: process.env.AWS_COGNITO_USER_POOL_ID || '',
  clientId: process.env.AWS_COGNITO_CLIENT_ID || '',
  issuer: process.env.AWS_COGNITO_ISSUER || '',
};

// Validate required Cognito config
if (!cognitoConfig.userPoolId || !cognitoConfig.clientId || !cognitoConfig.issuer) {
  console.warn('⚠️  AWS Cognito configuration is incomplete. Authentication will not work properly.');
}
