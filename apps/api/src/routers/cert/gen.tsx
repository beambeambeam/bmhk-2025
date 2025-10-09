/** @jsxImportSource react */
import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer"

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
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 40,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 40,
  },
  name: {
    fontSize: 24,
    marginBottom: 20,
  },
  team: {
    fontSize: 18,
    marginBottom: 10,
  },
  school: {
    fontSize: 16,
  },
})

interface CertificateDocumentProps {
  memberInfo: MemberInfo
  team: TeamInfo
}

const CertificateDocument = ({ memberInfo, team }: CertificateDocumentProps) => {
  const memberName =
    memberInfo.thaiFirstname && memberInfo.thaiLastname
      ? `${memberInfo.thaiFirstname} ${memberInfo.thaiLastname}`
      : `${memberInfo.firstName} ${memberInfo.lastname}`

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.container}>
          <Text style={styles.title}>BMHK2025</Text>
          <Text style={styles.name}>{memberName}</Text>
          <Text style={styles.team}>Team: {team.name}</Text>
          <Text style={styles.school}>School: {team.school}</Text>
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
