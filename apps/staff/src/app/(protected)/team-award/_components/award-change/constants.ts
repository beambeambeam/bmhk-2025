// Award options with English values in UPPER case
export const awardOptions = [
  { value: "REGISTERED", label: "ลงทะเบียน", english: "Registered" },
  { value: "ROUND_1_PARTICIPANT", label: "เข้าร่วมรอบที่ 1", english: "Round 1 Participant" },
  { value: "ROUND_2_PARTICIPANT", label: "เข้าร่วมรอบที่ 2", english: "Round 2 Participant" },
  { value: "HONORABLE_MENTION", label: "ชมเชย", english: "Honorable Mention" },
  { value: "3RD_PLACE", label: "ที่ 3", english: "3rd Place" },
  { value: "2ND_PLACE", label: "ที่ 2", english: "2nd Place" },
  { value: "1ST_PLACE", label: "ที่ 1", english: "1st Place" },
]

// Helper function to get award display info
export function getAwardDisplay(award: string) {
  const option = awardOptions.find((opt) => opt.value === award)
  return option || { label: award, english: award }
}
