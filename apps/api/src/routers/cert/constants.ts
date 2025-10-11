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
