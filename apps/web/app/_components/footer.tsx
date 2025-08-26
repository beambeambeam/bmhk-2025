"use client"

import GlassCard from "@/components/glassCard"
import IconCircle from "@/components/iconCircle"
import { siteConfig } from "@/config/site"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Sponsor {
  name: string
  image_path: string
}

function Sponsor() {
  const SPONSOR_LIST: Sponsor[] = [
    /* TBA */
  ]
  if (SPONSOR_LIST.length < 1) return <></>
  return (
    <div className="flex flex-[1_0_0] flex-col items-start gap-7 self-stretch max-lg:items-center">
      <div className="text-body-1 text-[var(--color-gray-50)] max-2xl:text-[20px] max-lg:text-[18px]">
        สนับสนุนโดย
      </div>
      <div className="flex flex-wrap items-center gap-6 self-stretch max-lg:justify-center">
        {SPONSOR_LIST.map((s) => (
          <GlassCard
            className="min-w-15 min-h-15 px-2 py-1 2xl:min-h-20 2xl:min-w-20"
            style={{ borderRadius: 24, border: "1.5px solid rgba(255, 255, 255, 0.10)" }}>
            <img src={s.image_path} />
          </GlassCard>
        ))}
      </div>
      <div className="hidden flex-col items-start gap-3 self-stretch 2xl:flex">
        <div className="text-body-3 text-[var(--color-gray-50)]">
          เราขอขอบคุณ <span>{SPONSOR_LIST.map((s) => s.name).join(", ")}</span>
        </div>
      </div>
    </div>
  )
}

function Footer() {
  const router = useRouter()

  return (
    <GlassCard
      className="lg:py-15 p-6 lg:px-20 2xl:px-[120px] 2xl:py-[90px]"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 40,
        alignSelf: "stretch",
        borderRadius: "60px 60px 0 0",
        background: `
          radial-gradient(
            66.31% 84.48% at 52.63% -21.84%,
            rgba(255, 204, 247, 0.5) 0%,
            rgba(2, 6, 3, 0) 100%
          ),
          linear-gradient(
            -106.52deg,
            rgba(255, 204, 247, 0.09) -2.48%,
            rgba(159, 131, 220, 0.09) 29.08%
          )
        `,
        borderTop: "none",
        borderLeft: "none",
      }}>
      <div className="flex flex-col items-center justify-center gap-10 self-stretch border-b-[0.5px] border-solid border-[#666] pb-10">
        <div className="flex flex-col items-start gap-10 self-stretch 2xl:flex-row">
          <div className="flex flex-[1_0_0] flex-col items-start gap-10">
            <div className="hidden w-full items-center justify-between lg:flex">
              <div className="flex h-[70px] items-center gap-10 2xl:h-[75px]">
                {" "}
                {/* Icon */}
                <img
                  src="/static/logo/Logo.webp"
                  alt="Bangmod Hackathon Logo"
                  className="ml-[-24px] h-[100px] 2xl:ml-[-32px] 2xl:h-[140px]"
                />
                <img
                  src="/static/logo/KMUTT_CPE.webp"
                  alt="KMUTT CPE Logo"
                  className="max-h-[72px] max-w-[220px] object-contain"
                />
              </div>
              <div className="flex items-center gap-6 2xl:hidden">
                {" "}
                {/* Social Media */}
                <a href={siteConfig.links.facebook} target="_blank" rel="noopener noreferrer">
                  <IconCircle className="h-[60px] w-[60px] flex-shrink-0 lg:h-[70px] lg:w-[70px] 2xl:h-[80px] 2xl:w-[80px] cursor-pointer">
                    <img src="/static/icon/Facebook.svg" alt="Facebook Icon" />
                  </IconCircle>
                </a>
                <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer">
                  <IconCircle className="h-[60px] w-[60px] flex-shrink-0 lg:h-[70px] lg:w-[70px] 2xl:h-[80px] 2xl:w-[80px] cursor-pointer">
                    <img src="/static/icon/Instagram.svg" alt="Instagram Icon" />
                  </IconCircle>
                </a>
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-6 lg:hidden">
              {" "}
              {/* Logo Mobile */}
              <img
                src="/static/logo/Logo.webp"
                alt="Bangmod Hackathon Logo"
                className="ml-[-24px] h-[100px]"
              />
              <div className="flex h-10 items-center">
                <img
                  src="/static/logo/KMUTT_CPE.webp"
                  alt="KMUTT CPE Logo"
                  className="max-h-[45px] max-w-[220px] object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-6 self-stretch max-lg:items-center">
              <div className="text-body-1 text-[var(--color-gray-50)] max-2xl:text-[20px] max-lg:text-center max-lg:text-[18px]">
                การแข่งขันเขียนโปรแกรมคอมพิวเตอร์ BangMod Hackathon 2025
              </div>
              <div className="flex flex-col items-start gap-3 self-stretch">
                <div className="text-body-3 text-[var(--color-gray-100)] max-lg:text-center max-lg:text-[14px]">
                  ภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี
                  อาคารวิศววัฒนะ ชั้น 10-11 เลขที่ 126 ถ.ประชาอุทิศ แขวงบางมด เขตทุ่งครุ กรุงเทพฯ 10140
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-[1_0_0] flex-col items-end gap-10 self-stretch">
            {" "}
            {/* Sponsor */}
            <Sponsor />
          </div>
        </div>
        <div className="flex items-center justify-between self-stretch max-lg:justify-center">
          <div className="flex items-center gap-6 lg:hidden 2xl:flex">
            <a href={siteConfig.links.facebook} target="_blank" rel="noopener noreferrer">
              <IconCircle className="h-[60px] w-[60px] flex-shrink-0 2xl:h-[80px] 2xl:w-[80px] cursor-pointer">
                <img src="/static/icon/Facebook.svg" alt="Facebook Icon" />
              </IconCircle>
            </a>
            <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer">
              <IconCircle className="h-[60px] w-[60px] flex-shrink-0 2xl:h-[80px] 2xl:w-[80px] cursor-pointer">
                <img src="/static/icon/Instagram.svg" alt="Instagram Icon" />
              </IconCircle>
            </a>
          </div>
          <div className="hidden items-center justify-between lg:flex lg:w-full 2xl:w-[820px]">
            <div
              className="relative text-nav-2 cursor-pointer group"
              onClick={() => (window.location.hash = "#landing")}
            >
              <span className="relative z-10">รายละเอียด</span>
              <span className="absolute inset-0 rounded-full bg-[rgba(159,131,220,0.4)] blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </div>

            <div
              className="relative text-nav-2 cursor-pointer group"
              onClick={() => (window.location.hash = "#qualification")}
            >
              <span className="relative z-10">คุณสมบัติ</span>
              <span className="absolute inset-0 rounded-full bg-[rgba(159,131,220,0.4)] blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </div>

            <div
              className="relative text-nav-2 cursor-pointer group"
              onClick={() => (window.location.hash = "#award")}
            >
              <span className="relative z-10">รางวัล</span>
              <span className="absolute inset-0 rounded-full bg-[rgba(159,131,220,0.4)] blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </div>

            <div
              className="relative text-nav-2 cursor-pointer group"
              onClick={() => (window.location.hash = "#dateandcontest")}
            >
              <span className="relative z-10">กำหนดการ</span>
              <span className="absolute inset-0 rounded-full bg-[rgba(159,131,220,0.4)] blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </div>

            <div
              className="relative text-nav-2 cursor-pointer group"
              onClick={() => (window.location.hash = "#contact")}
            >
              <span className="relative z-10">ติดต่อทีมงาน</span>
              <span className="absolute inset-0 rounded-full bg-[rgba(159,131,220,0.4)] blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </div>

            <Link
              className="relative text-nav-2 cursor-pointer group"
              href="/privacy-policy"
            >
              <span className="relative z-10">นโยบายความเป็นส่วนตัว</span>
              <span className="absolute inset-0 rounded-full bg-[rgba(159,131,220,0.4)] blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </Link>
          </div>
        </div>
      </div>
      <div className="text-body-3 text-center text-[16px] max-lg:text-[10px]">
        © 2025 Bangmod Hackathon, Department of Computer Engineering. All rights reserved.
      </div>
    </GlassCard>
  )
}

export default Footer
