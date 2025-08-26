import { NextResponse } from "next/server"

export const GET = () => {
  return new NextResponse(
    JSON.stringify({
      SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
      WEB_ORIGIN: process.env.NEXT_PUBLIC_WEB_URL,
    })
  )
}
