/** @jsxImportSource react */
import { Document, Page, View, Image, StyleSheet, Font, pdf } from "@react-pdf/renderer"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

Font.register({
  family: "Poppins",
  fonts: [
    { src: path.join(__dirname, "poppins/Poppins-Regular.ttf"), fontWeight: 400 },
    { src: path.join(__dirname, "poppins/Poppins-Medium.ttf"), fontWeight: 500 },
    { src: path.join(__dirname, "poppins/Poppins-SemiBold.ttf"), fontWeight: 600 },
    { src: path.join(__dirname, "poppins/Poppins-Bold.ttf"), fontWeight: 700 },
    { src: path.join(__dirname, "poppins/Poppins-ExtraBold.ttf"), fontWeight: 800 },
    { src: path.join(__dirname, "poppins/Poppins-Black.ttf"), fontWeight: 900 },
  ],
})

Font.register({
  family: "Prompt",
  fonts: [
    { src: path.join(__dirname, "prompt/Prompt-Regular.ttf"), fontWeight: 400 },
    { src: path.join(__dirname, "prompt/Prompt-Medium.ttf"), fontWeight: 500 },
    { src: path.join(__dirname, "prompt/Prompt-SemiBold.ttf"), fontWeight: 600 },
    { src: path.join(__dirname, "prompt/Prompt-Bold.ttf"), fontWeight: 700 },
    { src: path.join(__dirname, "prompt/Prompt-ExtraBold.ttf"), fontWeight: 800 },
    { src: path.join(__dirname, "prompt/Prompt-Black.ttf"), fontWeight: 900 },
  ],
})

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

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    gap: 49,
  },
  left: {
    width: 379,
    flexDirection: "column",
    alignItems: "flex-start",
    flexShrink: 0,
    alignSelf: "stretch",
  },
  right: {
    flexDirection: "column",
    alignItems: "flex-start",
    flex: "1 0 0",
    alignSelf: "stretch",
  },
  topLeft: {
    padding: 30,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
    flex: "1 0 0",
    alignSelf: "stretch",
  },
  bottomLeft: {
    height: 283,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
    alignSelf: "stretch",
  },
  orgsIcon: {
    width: 319,
    height: "auto",
  },
})

interface CertificateDocumentProps {
  memberInfo: MemberInfo
  team: TeamInfo
}

const CertificateDocument = ({ memberInfo, team }: CertificateDocumentProps) => {
  void memberInfo
  void team

  const orgsIconPath = path.join(__dirname, "imgs/orgs-icon.png")

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.left}>
          <View style={styles.topLeft}>
            <Image src={orgsIconPath} style={styles.orgsIcon} />
          </View>
          <View style={styles.bottomLeft}></View>
        </View>
        <View style={styles.right}></View>
      </Page>
    </Document>
  )
}

export async function generateCertificatePdf(memberInfo: MemberInfo, team: TeamInfo): Promise<string> {
  const blob = await pdf(<CertificateDocument memberInfo={memberInfo} team={team} />).toBlob()
  const buffer = Buffer.from(await blob.arrayBuffer())
  return buffer.toString("base64")
}
