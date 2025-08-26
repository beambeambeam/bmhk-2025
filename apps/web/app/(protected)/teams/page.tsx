"use client"

import { useState } from "react"

import Landing from "./Landing"
import Team from "./Team"
import Navbar from "./navbar"

const teams = [
  {
    teamCode: "#BH144",
    teamName: "ทีมอาจารย์นาตาชาเองจ้า",
    teamImage: "https://avatar.iran.liara.run/public",
    school: "โรงเรียนชื่อดังด้านการเขียนโค้ด",
    message: "สู้ๆ นะ ไม่มีอะไรที่เราทำได้",
  },
]

const teamMembers = [
  {
    teamCode: "#BH144",
    role: "อาจารย์ที่ปรึกษา",
    avatar: "/static/teams/teacher.webp",
    info: {
      general: {
        id: "0001",
        nameTH: ["นางสาว", "ณัฐชา เดชดำรง"],
        nameEN: ["Mrs.", "Natasha Dejdumrong"],
        allergyFood: "-",
        foodType: "-",
        allergyMedicine: "-",
        chronicDisease: "-",
      },
      contact: { email: "iamnatashajaa.cpe@kmutt.ac.th", phone: "0912345678", line: "iamnatashajaa" },
      documents: [
        {
          description:
            "สำเนาบัตรประจำตัวประชาชน หรือบัตรประจำตัวสำหรับ บุคคลที่ไม่ใช่สัญชาติไทย พร้อมเซ็นสำเนาถูกต้อง (เฉพาะด้านหน้า)",
          fileName: "NatashaIDcard.pdf",
          size: "7.4 MB",
          href: "#",
        },
        {
          description:
            "เอกสารแสดงสถานภาพการเป็นอาจารย์ประจำ ในสถานศึกษา เช่น บัตรประจำตัวอาจารย์ บัตรข้าราชการครู หรือหนังสือรับรองจากสถานศึกษา",
          fileName: "NatashaKmutt.pdf",
          size: "9.3 MB",
          href: "#",
        },
      ],
    },
  },
  {
    teamCode: "#BH144",
    role: "ผู้เข้าแข่งขันคนที่ 1",
    avatar: "/static/teams/student1.webp",
    info: {
      general: {
        id: "0002",
        nameTH: ["นาย", "สมชาย ใจดี"],
        nameEN: ["Mr.", "Somchai Jaidee"],
        allergyFood: "ถั่วลิสง",
        foodType: "Vegetarian",
        allergyMedicine: "-",
        chronicDisease: "-",
      },
      contact: { email: "somchai@example.com", phone: "0812345678", line: "somchai_line" },
      documents: [
        {
          description: "รูปถ่ายนักเรียนหน้าตรง ขนาด 1.5 นิ้ว",
          fileName: "SaisawanID.pdf",
          size: "4.1 MB",
          href: "#",
        },
        {
          description:
            "สำเนาบัตรประจำตัวประชาชน หรือบัตรประจำตัวสำหรับ บุคคลที่ไม่ใช่สัญชาติไทย พร้อมเซ็นสำเนาถูกต้อง (เฉพาะด้านหน้า)",
          fileName: "SaisawanID.pdf",
          size: "4.1 MB",
          href: "#",
        },
        {
          description: "สำเนา ปพ.7 (ระเบียนแสดงผลการเรียน) ฉบับจริง",
          fileName: "SaisawanID.pdf",
          size: "4.1 MB",
          href: "#",
        },
      ],
    },
  },
  {
    teamCode: "#BH144",
    role: "ผู้เข้าแข่งขันคนที่ 2",
    avatar: "/static/teams/student2.webp",
    info: {
      general: {
        id: "0003",
        nameTH: ["นางสาว", "สายสวรรค์ สวยงาม"],
        nameEN: ["Mrs.", "Saisawan Suayngam"],
        allergyFood: "อาหารทะเล",
        foodType: "Vegan",
        allergyMedicine: "ยาแก้แพ้",
        chronicDisease: "-",
      },
      contact: { email: "saisawan@example.com", phone: "0823456789", line: "saisawan_line" },
      documents: [
        {
          description: "รูปถ่ายนักเรียนหน้าตรง ขนาด 1.5 นิ้ว",
          fileName: "SaisawanID.pdf",
          size: "4.1 MB",
          href: "#",
        },
        {
          description:
            "สำเนาบัตรประจำตัวประชาชน หรือบัตรประจำตัวสำหรับ บุคคลที่ไม่ใช่สัญชาติไทย พร้อมเซ็นสำเนาถูกต้อง (เฉพาะด้านหน้า)",
          fileName: "SaisawanID.pdf",
          size: "4.1 MB",
          href: "#",
        },
        {
          description: "สำเนา ปพ.7 (ระเบียนแสดงผลการเรียน) ฉบับจริง",
          fileName: "SaisawanID.pdf",
          size: "4.1 MB",
          href: "#",
        },
      ],
    },
  },
  {
    teamCode: "#BH144",
    role: "ผู้เข้าแข่งขันคนที่ 3",
    avatar: "/static/teams/student3.webp",
    info: {
      general: {
        id: null,
        nameTH: [],
        nameEN: [],
        allergyFood: "-",
        foodType: "-",
        allergyMedicine: "-",
        chronicDisease: "-",
      },
      contact: { email: "-", phone: "-", line: "-" },
      documents: [
        {
          description: "รูปถ่ายนักเรียนหน้าตรง ขนาด 1.5 นิ้ว",
          fileName: "-",
          size: "-",
          href: "-",
        },
        {
          description:
            "สำเนาบัตรประจำตัวประชาชน หรือบัตรประจำตัวสำหรับ บุคคลที่ไม่ใช่สัญชาติไทย พร้อมเซ็นสำเนาถูกต้อง (เฉพาะด้านหน้า)",
          fileName: "-",
          size: "-",
          href: "-",
        },
        {
          description: "สำเนา ปพ.7 (ระเบียนแสดงผลการเรียน) ฉบับจริง",
          fileName: "-",
          size: "-",
          href: "-",
        },
      ],
    },
  },
]

export default function TeamPage() {
  return (
    <div className="md:pt-15 pb-15 flex min-h-screen w-full flex-col items-center gap-0 overflow-hidden bg-black pt-8 text-white md:gap-10 2xl:gap-20">
      <Navbar />

      {teams.map((team) => {
        const members = teamMembers.filter((m) => m.teamCode === team.teamCode)
        return (
          // <Team key={team.teamCode} team={team} members={members} />
          <Landing key="landing" />
        )
      })}
    </div>
  )
}
