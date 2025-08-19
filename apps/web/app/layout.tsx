import { BreakpointIndicator } from "@workspace/ui/components/breakpoint-indicator"
import "@workspace/ui/globals.css"
import { cn } from "@workspace/ui/lib/utils"
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-prompt antialiased", fontPrompt.variable, fontBaiJamjuree.variable)}>
        {children}
        <BreakpointIndicator />
      </body>
    </html>
  )
}
