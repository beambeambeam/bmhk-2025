export const Awards = {
  None: "NONE",
  Registered: "REGISTERED",
  Round1Participant: "ROUND_1_PARTICIPANT",
  Round2Participant: "ROUND_2_PARTICIPANT",
  HonorableMention: "HONORABLE_MENTION",
  ThirdPlace: "3RD_PLACE",
  SecondPlace: "2ND_PLACE",
  FirstPlace: "1ST_PLACE",
} as const

// Convert object key in a type
export type AwardKeys = (typeof Awards)[keyof typeof Awards]

type CertificateTemplate = {
  of: string
  award: string | null
  awardTextCSS: {
    color?: string
    background?: string
    backgroundClip?: string
    WebkitBackgroundClip?: string
    WebkitTextFillColor?: string
  }
  teamPrefix: "อาจารย์ที่ปรึกษา จากทีม" | "จากทีม"
  lowerImage: string
}

export const adviser: CertificateTemplate = {
  of: "APPRECIATION",
  award: null,
  awardTextCSS: {
    color: "#282828",
  },
  teamPrefix: "อาจารย์ที่ปรึกษา จากทีม",
  lowerImage: "lower-default.png",
}
