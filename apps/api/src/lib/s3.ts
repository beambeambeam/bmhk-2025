import { S3Client } from "@aws-sdk/client-s3"

const requiredEnv = ["S3_ACCESS_KEY_ID", "S3_SECRET_KEY", "S3_ENDPOINT", "S3_BUCKET_NAME"]

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required env: ${key}`)
  }
}

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
