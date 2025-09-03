import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

export const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.S3_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
  forcePathStyle: true,
})

export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME!

export async function getPresignedUrlForKey(key: string, expiresInSeconds = 3600) {
  const command = new GetObjectCommand({ Bucket: S3_BUCKET_NAME, Key: key })
  return await getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds })
}
