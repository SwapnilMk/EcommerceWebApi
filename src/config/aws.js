// import AWS from 'aws-sdk';

// AWS.config.update({
//   region: process.env.AWS_REGION,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// export const s3 = new AWS.S3();
// export const sns = new AWS.SNS();
// export const ses = new AWS.SES({ apiVersion: '2010-12-01' });

import { S3Client } from "@aws-sdk/client-s3";
import { SNSClient } from "@aws-sdk/client-sns";
import { SESClient } from "@aws-sdk/client-ses";

const config = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

export const s3 = new S3Client(config);
export const sns = new SNSClient(config);
export const ses = new SESClient(config);
