import { v4 as uuidv4 } from 'uuid';
import { awsConfig, s3 } from '../config/aws.config';

interface UploadResult {
  url: string;
  key: string;
}

/**
 * Upload file to S3
 */
export const uploadToS3 = async (
  file: Express.Multer.File,
  folder: string = 'general'
): Promise<UploadResult> => {
  try {
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${folder}/${uuidv4()}.${fileExtension}`;

    const params = {
      Bucket: awsConfig.s3.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read' as const,
    };

    const uploadResult = await s3.upload(params).promise();

    return {
      url: uploadResult.Location,
      key: uploadResult.Key,
    };
  } catch (error) {
    console.error('S3 upload error:', error);
    throw new Error('Failed to upload file to S3');
  }
};

/**
 * Upload multiple files to S3
 */
export const uploadMultipleToS3 = async (
  files: Express.Multer.File[],
  folder: string = 'general'
): Promise<UploadResult[]> => {
  try {
    const uploadPromises = files.map(file => uploadToS3(file, folder));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('S3 multiple upload error:', error);
    throw new Error('Failed to upload files to S3');
  }
};

/**
 * Delete file from S3
 */
export const deleteFromS3 = async (key: string): Promise<void> => {
  try {
    const params = {
      Bucket: awsConfig.s3.bucketName,
      Key: key,
    };

    await s3.deleteObject(params).promise();
  } catch (error) {
    console.error('S3 delete error:', error);
    throw new Error('Failed to delete file from S3');
  }
};

/**
 * Delete multiple files from S3
 */
export const deleteMultipleFromS3 = async (keys: string[]): Promise<void> => {
  try {
    const params = {
      Bucket: awsConfig.s3.bucketName,
      Delete: {
        Objects: keys.map(key => ({ Key: key })),
      },
    };

    await s3.deleteObjects(params).promise();
  } catch (error) {
    console.error('S3 multiple delete error:', error);
    throw new Error('Failed to delete files from S3');
  }
};

/**
 * Generate signed URL for private file access
 */
export const getSignedUrl = (key: string, expiresIn: number = 3600): string => {
  const params = {
    Bucket: awsConfig.s3.bucketName,
    Key: key,
    Expires: expiresIn, // URL expires in seconds
  };

  return s3.getSignedUrl('getObject', params);
};

/**
 * Get pre-signed URL for direct upload from client
 */
export const getPresignedUploadUrl = (
  fileName: string,
  fileType: string,
  folder: string = 'general'
): { uploadUrl: string; key: string } => {
  const key = `${folder}/${uuidv4()}-${fileName}`;

  const params = {
    Bucket: awsConfig.s3.bucketName,
    Key: key,
    Expires: 300, // 5 minutes
    ContentType: fileType,
    ACL: 'public-read',
  };

  const uploadUrl = s3.getSignedUrl('putObject', params);

  return {
    uploadUrl,
    key,
  };
};
