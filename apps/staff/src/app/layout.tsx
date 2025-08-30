import type { Metadata } from "next"
import { Sarabun } from "next/font/google"

import "./globals.css"

const sarabunSans = Sarabun({
  variable: "--font-sarabun",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "BMHK 2025 Staff",
  description: "Staff pages.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${sarabunSans.variable} font-sarabun antialiased`}>{children}</body>
    </html>
  )
}
