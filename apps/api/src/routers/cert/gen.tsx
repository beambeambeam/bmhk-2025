/** @jsxImportSource react */
import {
  Document,
  Page,
  View,
  Image,
  StyleSheet,
  Font,
  pdf,
  Text,
  Svg,
  Defs,
  LinearGradient,
  Stop,
} from "@react-pdf/renderer"
import path from "path"
import { fileURLToPath } from "url"

import { adviser, awardCertificates, type AwardKeys } from "./constants.js"

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
  type: "member" | "adviser"
  thaiFirstname: string | null
  thaiLastname: string | null
  award?: AwardKeys
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
    flexDirection: "row",
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
  signatureProfContainer: {
    height: 100,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
    width: "50%",
  },
  profSignature1: {
    width: 100,
    height: 68,
    flexShrink: 0,
  },
  profSignature2: {
    width: 81,
    height: 67,
    flexShrink: 0,
  },
  debugText: {
    fontSize: 10,
    color: "#ff0000",
    fontFamily: "Poppins",
  },
  profInfoContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 8,
    flex: "1 0 0",
    alignSelf: "stretch",
  },
  profName: {
    color: "#282828",
    fontFamily: "Prompt",
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 1.2,
  },
  profDetail: {
    color: "#282828",
    fontFamily: "Prompt",
    fontSize: 10,
    fontWeight: 300,
    lineHeight: 1.2,
  },
})

interface CertificateDocumentProps {
  memberInfo: MemberInfo
  team: TeamInfo
}

const CertificateDocument = ({ memberInfo, team }: CertificateDocumentProps) => {
  const orgsIconPath = path.join(__dirname, "imgs/orgs-icon.png")
  const topRightArtPath = path.join(__dirname, "imgs/top-right-art.png")
  const profSignature1 = path.join(__dirname, "imgs/prof1.png")
  const profSignature2 = path.join(__dirname, "imgs/prof2.png")

  const isAdviser = memberInfo.type === "adviser"

  const config = isAdviser
    ? adviser
    : memberInfo.award
      ? awardCertificates[memberInfo.award]
      : awardCertificates["REGISTERED"]

  const certificateType = config.of
  const teamPrefix = config.teamPrefix
  const bottomLeftArtPath = path.join(__dirname, "imgs", config.lowerImage)

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
                <Text style={styles.certText3}>OF {certificateType}</Text>
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
                <Text style={styles.nameText2Text}>{memberInfo.thaiFirstname}</Text>
                <Text style={styles.nameText2Text}>{memberInfo.thaiLastname}</Text>
              </View>
              <Text style={styles.nameText3}>
                {teamPrefix}
                {team.name}
              </Text>
            </View>
            <View style={styles.awardCotainer}>
              {!isAdviser &&
                config.award &&
                (config.gradient ? (
                  <Svg width="400" height="50">
                    <Defs>
                      <LinearGradient id="awardGradient" x1="0" y1="0" x2="1" y2="0">
                        <Stop offset="0%" stopColor={config.gradient.start} />
                        <Stop offset="100%" stopColor={config.gradient.end} />
                      </LinearGradient>
                    </Defs>
                    <Text x="0" y="35" fill="url(#awardGradient)" style={styles.awardText1}>
                      {config.award}
                    </Text>
                  </Svg>
                ) : (
                  <Text style={[styles.awardText1, config.awardTextCSS]}>{config.award}</Text>
                ))}
              <Text style={styles.awardText2}>
                โครงการแข่งขันแก้ไขปัญหา ด้วยการเขียนโปรแกรมคอมพิวเตอร์ ระดับมัธยมศึกษาตอนปลาย ปีการศึกษา
                2568{" "}
              </Text>
            </View>
            <View style={styles.signatureContaienr}>
              <View style={styles.signatureProfContainer}>
                <Image style={styles.profSignature1} src={profSignature1} />
                <View style={styles.profInfoContainer}>
                  <Text style={styles.profName}>รศ. ดร.ณัฐชา เดชดำรง</Text>
                  <Text style={styles.profDetail}>
                    ที่ปรึกษาโครงการ และประธานหลักสูตร วิศวกรรมคอมพิวเตอร์ (นานาชาติ)
                  </Text>
                </View>
              </View>
              <View style={styles.signatureProfContainer}>
                <Image style={styles.profSignature2} src={profSignature2} />
                <View style={styles.profInfoContainer}>
                  <Text style={styles.profName}>ผศ. ดร.สันติธรรม พรหมอ่อน</Text>
                  <Text style={styles.profDetail}>หัวหน้าภาควิชาวิศวกรรมคอมพิวเตอร์</Text>
                </View>
              </View>
            </View>
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
