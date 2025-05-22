import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

console.log("Id: ", process.env.ID);
console.log("key: ", process.env.KEY);

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
    ContentType: "video/mp4",
  });
  const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
  return signedUrl;
};

// Example usage:
//
// createPresignedUrl({
//   region: "ap-south-1",
//   bucket: "your-bucket-name",
//   key: "uploads/video.mp4",
// }).then((url) => {
//   console.log("Presigned URL:", url);
// });
