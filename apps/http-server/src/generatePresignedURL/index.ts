import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const createPresignedUrl = async ({
  region,
  bucket,
  key,
}: {
  region: string;
  bucket: string;
  key: string;
}) => {
  const client = new S3Client({
    region,
    credentials: {
      accessKeyId: process.env.ID as string,
      secretAccessKey: process.env.KEY as string,
    },
  });

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: "video.webm",
  });
  const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
  return signedUrl;
};
