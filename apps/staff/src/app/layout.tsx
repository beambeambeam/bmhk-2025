import { BreakpointIndicator } from "@/components/breakpoint-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { Sarabun } from "next/font/google"
import { NuqsAdapter } from "nuqs/adapters/next/app"

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${sarabunSans.variable} antialiased`}>
        <NuqsAdapter>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <BreakpointIndicator />
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  )
}
