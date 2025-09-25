// Award options with English values in UPPER case
export const awardOptions = [
  { value: "REGISTERED", label: "Registered", english: "Registered" },
  { value: "ROUND_1_PARTICIPANT", label: "Round 1 Participant", english: "Round 1 Participant" },
  { value: "ROUND_2_PARTICIPANT", label: "Round 2 Participant", english: "Round 2 Participant" },
  { value: "HONORABLE_MENTION", label: "Honorable Mention", english: "Honorable Mention" },
  { value: "3RD_PLACE", label: "3rd Place", english: "3rd Place" },
  { value: "2ND_PLACE", label: "2nd Place", english: "2nd Place" },
  { value: "1ST_PLACE", label: "1st Place", english: "1st Place" },
]

// Helper function to get award display info
export function getAwardDisplay(award: string) {
  const option = awardOptions.find((opt) => opt.value === award)
  return option || { label: award, english: award }
}
