"use client"

import GlassCard from "@/components/glassCard"
import IconCircle from "@/components/iconCircle"
import { siteConfig } from "@/config/site"
import { SponsorList, SponsorTiers } from "@/config/sponsors"
import Link from "next/link"

function Sponsor() {
  if (SponsorList.length < 1) return <></>
  return (
    <div className="flex flex-[1_0_0] flex-col items-start gap-4 self-stretch max-lg:items-center 2xl:gap-10">
      <div className="text-body-1 text-[var(--color-gray-50)] max-2xl:text-[20px] max-lg:text-[18px]">
        สนับสนุนโดย
      </div>
      {SponsorList.map((s) => (
        <div className="flex flex-col items-center gap-[12px] self-stretch max-lg:justify-center lg:flex-row lg:gap-6">
          <GlassCard
            key={s.name}
            className="2xl:min-h-30 2xl:min-w-30 flex aspect-square min-h-[70px] min-w-[70px] items-center justify-center px-6 py-6 lg:min-h-[90px] lg:min-w-[90px]"
            style={{ borderRadius: 24, border: "1.5px solid rgba(255, 255, 255, 0.10)" }}>
            <img
              src={s.image_path}
              className="max-h-[48px] w-auto object-contain lg:max-h-[60px] 2xl:max-h-[80px]"
            />
          </GlassCard>
          <div className="flex flex-col items-center justify-start gap-1 lg:items-start lg:gap-[12px] 2xl:gap-5">
            <div className="text-[20px] font-normal text-[var(--color-gray-50)] lg:text-[22px] 2xl:text-[24px]">
              {s.name}
            </div>
            <div className="text-[16px] font-light text-[var(--color-gray-50)] lg:text-[20px]">
              เราขอขอบคุณ{" "}
              {(() => {
                switch (s.tier) {
                  case 3:
                    return "Diamond Sponsor"
                  case 2:
                    return "Platinum Sponsor"
                  case 1:
                    return "Gold Sponsor"
                  default:
                    return "Sponsor"
                }
              })()}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Footer() {
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
      <div className="flex flex-col items-center justify-center gap-6 self-stretch border-b-[0.5px] border-solid border-[#666] pb-10 lg:gap-10">
        <div className="flex flex-col items-start gap-8 self-stretch 2xl:flex-row 2xl:gap-10">
          <div className="flex w-full flex-[1_0_0] flex-col items-start gap-6 lg:gap-8 2xl:gap-10">
            <div className="hidden w-full items-center justify-between lg:flex">
              {/* Icon */}
              <div className="flex items-center">
                <img
                  src="/static/logo/kmutt-eng-smo-engoph-cpe-bmh-desktop-footer.webp"
                  className="hidden 2xl:block"
                />
                <img
                  src="/static/logo/kmutt-eng-smo-engoph-cpe-bmh-tablet-footer.webp"
                  className="hidden lg:block 2xl:hidden"
                />
              </div>
              <div className="flex items-center gap-6 2xl:hidden">
                {" "}
                {/* Social Media */}
                <a href={siteConfig.links.facebook} target="_blank" rel="noopener noreferrer">
                  <IconCircle className="h-[60px] w-[60px] flex-shrink-0 cursor-pointer lg:h-[70px] lg:w-[70px] 2xl:h-[80px] 2xl:w-[80px]">
                    <img src="/static/icon/Facebook.svg" alt="Facebook Icon" />
                  </IconCircle>
                </a>
                <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer">
                  <IconCircle className="h-[60px] w-[60px] flex-shrink-0 cursor-pointer lg:h-[70px] lg:w-[70px] 2xl:h-[80px] 2xl:w-[80px]">
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
                className="h-auto w-full max-w-[200px]"
              />
              <div className="flex w-full items-center">
                <img
                  src="/static/logo/kmutt-eng-smo-engoph-cpe-bmh-mobile-footer.webp"
                  className="h-auto w-full"
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 self-stretch max-lg:items-center 2xl:gap-6">
              <div className="whitespace-nowrap text-center text-[18px] font-normal text-[var(--color-gray-50)] lg:text-left lg:text-[24px]">
                โครงการแข่งขันแก้ไขปัญหาด้วยการเขียน
                <span className="block lg:hidden"></span>
                โปรแกรมคอมพิวเตอร์ ประจำปี 2568
              </div>
              <div className="hidden text-[20px] font-light text-[var(--color-gray-50)] lg:block">
                จัดโดยภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี
              </div>
              <div className="hidden text-[20px] font-light text-[#9E9E9E] lg:block">
                อาคารวิศววัฒนะ ชั้น 10-11 เลขที่ 126 ถ.ประชาอุทิศ แขวงบางมด เขตทุ่งครุ กรุงเทพฯ 10140
              </div>

              <div className="block whitespace-nowrap text-center text-[14px] font-light text-[#9E9E9E] lg:hidden">
                ภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์
                <span className="block lg:hidden"></span>
                มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี อาคารวิศววัฒนะ
                <span className="block lg:hidden"></span>
                ชั้น 10-11 เลขที่ 126 ถ.ประชาอุทิศ แขวงบางมด เขตทุ่งครุ
                <span className="block lg:hidden"></span>
                กรุงเทพฯ 10140
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
              <IconCircle className="h-[60px] w-[60px] flex-shrink-0 cursor-pointer 2xl:h-[80px] 2xl:w-[80px]">
                <img src="/static/icon/Facebook.svg" alt="Facebook Icon" />
              </IconCircle>
            </a>
            <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer">
              <IconCircle className="h-[60px] w-[60px] flex-shrink-0 cursor-pointer 2xl:h-[80px] 2xl:w-[80px]">
                <img src="/static/icon/Instagram.svg" alt="Instagram Icon" />
              </IconCircle>
            </a>
          </div>
          <div className="hidden items-center justify-between lg:flex lg:w-full 2xl:w-[820px]">
            <div
              className="text-nav-2 group relative cursor-pointer"
              onClick={() => (window.location.hash = "#landing")}>
              <span className="relative z-10">รายละเอียด</span>
              <span className="absolute inset-0 rounded-full bg-[rgba(159,131,220,0.4)] opacity-0 blur-[40px] transition-opacity duration-500 group-hover:opacity-100"></span>
            </div>

            <div
              className="text-nav-2 group relative cursor-pointer"
              onClick={() => (window.location.hash = "#qualification")}>
              <span className="relative z-10">คุณสมบัติ</span>
              <span className="absolute inset-0 rounded-full bg-[rgba(159,131,220,0.4)] opacity-0 blur-[40px] transition-opacity duration-500 group-hover:opacity-100"></span>
            </div>

            <div
              className="text-nav-2 group relative cursor-pointer"
              onClick={() => (window.location.hash = "#award")}>
              <span className="relative z-10">รางวัล</span>
              <span className="absolute inset-0 rounded-full bg-[rgba(159,131,220,0.4)] opacity-0 blur-[40px] transition-opacity duration-500 group-hover:opacity-100"></span>
            </div>

            <div
              className="text-nav-2 group relative cursor-pointer"
              onClick={() => (window.location.hash = "#dateandcontest")}>
              <span className="relative z-10">กำหนดการ</span>
              <span className="absolute inset-0 rounded-full bg-[rgba(159,131,220,0.4)] opacity-0 blur-[40px] transition-opacity duration-500 group-hover:opacity-100"></span>
            </div>

            <div
              className="text-nav-2 group relative cursor-pointer"
              onClick={() => (window.location.hash = "#contact")}>
              <span className="relative z-10">ติดต่อทีมงาน</span>
              <span className="absolute inset-0 rounded-full bg-[rgba(159,131,220,0.4)] opacity-0 blur-[40px] transition-opacity duration-500 group-hover:opacity-100"></span>
            </div>

            <Link className="text-nav-2 group relative cursor-pointer" href="/privacy-policy">
              <span className="relative z-10">นโยบายความเป็นส่วนตัว</span>
              <span className="absolute inset-0 rounded-full bg-[rgba(159,131,220,0.4)] opacity-0 blur-[40px] transition-opacity duration-500 group-hover:opacity-100"></span>
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
