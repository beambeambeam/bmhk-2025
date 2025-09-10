export function normalizeSchoolName(schoolName: string): string {
  return schoolName.replace(/^โรงเรียน/, "").trim()
}

export function shouldColorSchoolRed(schoolName: string, allSchoolNames: string[]): boolean {
  const normalized = normalizeSchoolName(schoolName)
  const normalizedAll = allSchoolNames.map(normalizeSchoolName)
  const count = normalizedAll.filter((name) => name === normalized).length
  return count > 2
}
