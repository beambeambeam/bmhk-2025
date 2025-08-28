import { s3Client, S3_BUCKET_NAME } from "@/lib/s3"
import { PutObjectCommand } from "@aws-sdk/client-s3"

export async function uploadFileToS3(params: { file: File; key: string }) {
  const { file, key } = params
  const arrayBuffer = await file.arrayBuffer()
  const body = Buffer.from(arrayBuffer)

  await s3Client.send(
    new PutObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: key,
      Body: body,
      ContentType: file.type || "application/octet-stream",
    })
  )

  return key
}
