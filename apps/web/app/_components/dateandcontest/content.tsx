import type { DateItem } from "./types"

export const registerDate: DateItem[] = [
  { date: "วันนี้", label: "ยังไม่เปิดรับสมัคร", isActive: true },
  { date: "19 สิงหาคม 2025", label: "เปิดรับสมัคร", isActive: false },
  { date: "12 กันยายน 2025", label: "ปิดรับสมัคร", isActive: false },
]

export const competitionDate: DateItem[] = [
  { date: "20 กันยายน 2025", label: "คัดเลือกรอบแรก\n(Online)", isActive: false },
  { date: "25 กันยายน 2025", label: "ประกาศรายชื่อ 36 ทีม\nที่ผ่านเข้ารอบ", isActive: false },
  { date: "11 ตุลาคม 2025", label: "แข่งรอบชิงชนะเลิศและ\nประกาศผล (Onsite)", isActive: false },
]
