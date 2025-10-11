export const Awards = {
  Registered: "REGISTERED",
  Round1Participant: "ROUND_1_PARTICIPANT",
  Round2Participant: "ROUND_2_PARTICIPANT",
  HonorableMention: "HONORABLE_MENTION",
  ThirdPlace: "3RD_PLACE",
  SecondPlace: "2ND_PLACE",
  FirstPlace: "1ST_PLACE",
} as const

export type AwardKeys = (typeof Awards)[keyof typeof Awards]

type GradientColors = {
  start: string
  end: string
}

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
  gradient?: GradientColors
  teamPrefix: "อาจารย์ที่ปรึกษา จากทีม" | "จากทีม"
  lowerImage: string
  topImage: string
}

export const adviser: CertificateTemplate = {
  of: "APPRECIATION",
  award: null,
  awardTextCSS: {
    color: "#282828",
  },
  teamPrefix: "อาจารย์ที่ปรึกษา จากทีม",
  lowerImage: "lower-default.png",
  topImage: "top-right-art.png",
}

export const awardCertificates: Record<AwardKeys, CertificateTemplate> = {
  [Awards.Registered]: {
    of: "PARTICIPATION",
    award: "เข้าร่วมการแข่งขัน",
    awardTextCSS: { color: "#9F83DC" },
    teamPrefix: "จากทีม",
    lowerImage: "lower-default.png",
    topImage: "top-right-art.png",
  },
  [Awards.Round1Participant]: {
    of: "PARTICIPATION",
    award: "ผ่านเข้ารอบ 36 ทีมสุดท้าย",
    awardTextCSS: { color: "#9F83DC" },
    teamPrefix: "จากทีม",
    lowerImage: "lower-default.png",
    topImage: "top-right-art.png",
  },
  [Awards.Round2Participant]: {
    of: "PARTICIPATION",
    award: "ผ่านเข้ารอบ 12 ทีมสุดท้าย",
    awardTextCSS: { color: "#9F83DC" },
    teamPrefix: "จากทีม",
    lowerImage: "lower-default.png",
    topImage: "top-right-art.png",
  },
  [Awards.HonorableMention]: {
    of: "ACHIEVEMENT",
    award: "ได้รับรางวัลชมเชย",
    awardTextCSS: { color: "#9B9B9B" },
    gradient: { start: "#9B9B9B", end: "#BCBCBC" },
    teamPrefix: "จากทีม",
    lowerImage: "lower-special.png",
    topImage: "top-right-art-no-icon.png",
  },
  [Awards.ThirdPlace]: {
    of: "ACHIEVEMENT",
    award: "ได้รับรางวัลรองชนะเลิศอันดับที่สอง",
    awardTextCSS: { color: "#C63C51" },
    gradient: { start: "#C63C51", end: "#601D27" },
    teamPrefix: "จากทีม",
    lowerImage: "lower-3rd.png",
    topImage: "top-right-art-no-icon.png",
  },
  [Awards.SecondPlace]: {
    of: "ACHIEVEMENT",
    award: "ได้รับรางวัลรองชนะเลิศอันดับที่หนึ่ง",
    awardTextCSS: { color: "rgba(140, 48, 97, 0.65)" },
    gradient: { start: "rgba(140, 48, 97, 0.65)", end: "rgba(212, 0, 113, 0.65)" },
    teamPrefix: "จากทีม",
    lowerImage: "lower-2.png",
    topImage: "top-right-art-no-icon.png",
  },
  [Awards.FirstPlace]: {
    of: "ACHIEVEMENT",
    award: "ได้รับรางวัลชนะเลิศ",
    awardTextCSS: { color: "#9F83DC" },
    gradient: { start: "#9F83DC", end: "#FFCCF7" },
    teamPrefix: "จากทีม",
    lowerImage: "lower-1st.png",
    topImage: "top-right-art-no-icon.png",
  },
}
