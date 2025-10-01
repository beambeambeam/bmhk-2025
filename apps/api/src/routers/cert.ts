import { protectedProcedure } from "@/lib/orpc"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"

export const certRouter = {
  generate: protectedProcedure.handler(async () => {
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([600, 600])

    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    const fontSize = 48
    const text = "BMHK2025"

    const textWidth = font.widthOfTextAtSize(text, fontSize)
    const textHeight = font.heightAtSize(fontSize)

    const x = (600 - textWidth) / 2
    const y = (600 - textHeight) / 2

    page.drawText(text, {
      x,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    })

    const bytes = await pdfDoc.save()
    const base64 = Buffer.from(bytes).toString("base64")

    return {
      success: true,
      contentType: "application/pdf",
      data: base64,
    }
  }),
}
