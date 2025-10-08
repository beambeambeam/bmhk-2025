import { PDFDocument, StandardFonts, rgb } from "pdf-lib"

interface MemberInfo {
  thaiFirstname: string | null
  thaiLastname: string | null
  firstName: string
  lastname: string
}

interface TeamInfo {
  name: string
  school: string
}

export async function generateCertificatePdf(memberInfo: MemberInfo, team: TeamInfo): Promise<string> {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([595, 842])

  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const titleText = "BMHK2025"
  const titleFontSize = 48
  const titleWidth = font.widthOfTextAtSize(titleText, titleFontSize)
  const titleX = (600 - titleWidth) / 2
  const titleY = 500

  page.drawText(titleText, {
    x: titleX,
    y: titleY,
    size: titleFontSize,
    font,
    color: rgb(0, 0, 0),
  })

  let memberName: string
  const nameFont = regularFont

  try {
    memberName = `${memberInfo.thaiFirstname} ${memberInfo.thaiLastname}`
    regularFont.widthOfTextAtSize(memberName, 24)
  } catch {
    memberName = `${memberInfo.firstName} ${memberInfo.lastname}`
  }

  const nameFontSize = 24
  const nameWidth = nameFont.widthOfTextAtSize(memberName, nameFontSize)
  const nameX = (600 - nameWidth) / 2
  const nameY = 400

  page.drawText(memberName, {
    x: nameX,
    y: nameY,
    size: nameFontSize,
    font: nameFont,
    color: rgb(0, 0, 0),
  })

  let teamText: string
  try {
    teamText = `ทีม: ${team.name}`
    regularFont.widthOfTextAtSize(teamText, 18)
  } catch {
    teamText = `Team: ${team.name}`
  }

  const teamFontSize = 18
  const teamWidth = regularFont.widthOfTextAtSize(teamText, teamFontSize)
  const teamX = (600 - teamWidth) / 2
  const teamY = 350

  page.drawText(teamText, {
    x: teamX,
    y: teamY,
    size: teamFontSize,
    font: regularFont,
    color: rgb(0, 0, 0),
  })

  let schoolText: string
  try {
    schoolText = `โรงเรียน: ${team.school}`
    regularFont.widthOfTextAtSize(schoolText, 16)
  } catch {
    schoolText = `School: ${team.school}`
  }

  const schoolFontSize = 16
  const schoolWidth = regularFont.widthOfTextAtSize(schoolText, schoolFontSize)
  const schoolX = (600 - schoolWidth) / 2
  const schoolY = 320

  page.drawText(schoolText, {
    x: schoolX,
    y: schoolY,
    size: schoolFontSize,
    font: regularFont,
    color: rgb(0, 0, 0),
  })

  const bytes = await pdfDoc.save()
  const base64 = Buffer.from(bytes).toString("base64")

  return base64
}
