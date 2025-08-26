import { s3Client, S3_BUCKET_NAME } from "@/lib/s3"
import { PutObjectCommand } from "@aws-sdk/client-s3"

function buildPublicUrl(key: string) {
  const endpoint = process.env.S3_ENDPOINT as string
  const trimmed = endpoint.endsWith("/") ? endpoint.slice(0, -1) : endpoint
  return `${trimmed}/${S3_BUCKET_NAME}/${key}`
}

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

  return buildPublicUrl(key)
}
