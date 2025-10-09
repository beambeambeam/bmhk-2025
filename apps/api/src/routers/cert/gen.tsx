/** @jsxImportSource react */
import { Document, Page, View, Image, StyleSheet, Font, pdf, Text } from "@react-pdf/renderer"
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
  certContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
    flex: "1 0 0",
  },
  certTextContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
  },
  certText1: {
    color: "#282828",
    fontFamily: "Prompt",
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 1.2,
    letterSpacing: 0.54,
  },
  certText2: {
    color: "#000",
    fontFamily: "Poppins",
    fontSize: 55,
    fontWeight: 700,
    lineHeight: 1.4,
    letterSpacing: 1.2,
  },
  certText3: {
    color: "#000",
    fontFamily: "Poppins",
    fontSize: 20,
    fontWeight: 400,
    lineHeight: 1.4,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  certLine: {
    width: 349,
    height: 1,
    backgroundColor: "#282828",
  },
  topRight: {
    height: 170,
    flexDirection: "column",
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
  bottomRight: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
    flex: "1 0 0",
    alignSelf: "stretch",
  },
  nameContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
  },
  awardCotainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
  },
  signatureContaienr: {
    alignItems: "flex-start",
    alignSelf: "stretch",
  },
  nameText1: {
    color: "#282828",
    fontFamily: "Prompt",
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.2,
  },
  nameText2: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    gap: 20,
  },
  nameText2Text: {
    color: "#282828",
    fontFamily: "Prompt",
    fontSize: 40,
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: 2,
  },
  nameText3: {
    color: "#282828",
    fontFamily: "Prompt",
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 1.2,
  },
  awardText1: {
    fontFamily: "Prompt",
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 1.6,
  },
  awardText2: {
    color: "#282828",
    fontFamily: "Prompt",
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 1.6,
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
  const bottomLeftArtPath = path.join(__dirname, "imgs/bottom-left-art.png")
  const topRightArtPath = path.join(__dirname, "imgs/top-right-art.png")

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.left}>
          <View style={styles.topLeft}>
            <Image src={orgsIconPath} style={styles.orgsIcon} />
            <View style={styles.certContainer}>
              <View style={styles.certTextContainer}>
                <Text style={styles.certText1}>ประกาศนียบัตร</Text>
                <Text style={styles.certText2}>Certificate</Text>
                <Text style={styles.certText3}>OF XXXXXXXXXX</Text>
              </View>
              <View style={styles.certLine} />
            </View>
          </View>
          <Image style={styles.bottomLeft} src={bottomLeftArtPath} />
        </View>
        <View style={styles.right}>
          <Image style={styles.topRight} src={topRightArtPath} />
          <View style={styles.bottomRight}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameText1}>ประกาศนียบัตรฉบับนี้ ให้ไว้เพื่อแสดงว่า</Text>
              <View style={styles.nameText2}>
                <Text style={styles.nameText2Text}>อนุทิน</Text>
                <Text style={styles.nameText2Text}>ชาญวีรกุล</Text>
              </View>
              <Text style={styles.nameText3}>จากทีมภูมิใจไทย</Text>
            </View>
            <View style={styles.awardCotainer}>
              <Text style={styles.awardText1}>ได้รับรางวัลชนะเลิศ</Text>
              <Text style={styles.awardText2}>
                โครงการแข่งขันแก้ไขปัญหา ด้วยการเขียนโปรแกรมคอมพิวเตอร์ ระดับมัธยมศึกษาตอนปลาย ปีการศึกษา
                2568{" "}
              </Text>
            </View>
            <View style={styles.signatureContaienr}></View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export async function generateCertificatePdf(memberInfo: MemberInfo, team: TeamInfo): Promise<string> {
  const blob = await pdf(<CertificateDocument memberInfo={memberInfo} team={team} />).toBlob()
  const buffer = Buffer.from(await blob.arrayBuffer())
  return buffer.toString("base64")
}
