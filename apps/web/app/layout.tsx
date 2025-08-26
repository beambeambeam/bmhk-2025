import CookieConsent from "@/components/accpet-card/cookie"
import Providers from "@/components/provider"
import { siteConfig } from "@/config/site"
import { BreakpointIndicator } from "@workspace/ui/components/breakpoint-indicator"
import "@workspace/ui/globals.css"
import { cn } from "@workspace/ui/lib/utils"
import type { Metadata } from "next"
import { Bai_Jamjuree, Prompt } from "next/font/google"

const fontPrompt = Prompt({
  subsets: ["thai"],
  variable: "--font-prompt",
  weight: ["300", "400", "500", "600", "700", "800"],
})

const fontBaiJamjuree = Bai_Jamjuree({
  subsets: ["thai"],
  variable: "--font-bai-jamjuree",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: ["Bangmod Hackathon", "Hackathon", "Programming Competition", "KMUTT"],
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={cn("font-prompt antialiased", fontPrompt.variable, fontBaiJamjuree.variable)}>
        <Providers>
          {children}
          <CookieConsent />
          <BreakpointIndicator />
        </Providers>
      </body>
    </html>
  )
}
