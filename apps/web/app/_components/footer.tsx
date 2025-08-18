"use client"

import GlassCard from "@/components/glassCard"
import IconCircle from "@/components/iconCircle"
import { useRouter } from "next/navigation"

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
                  src="/static/logo/Logo.png"
                  alt="Bangmod Hackathon Logo"
                  className="max-h-[72px] max-w-[220px] object-contain"
                />
                <img
                  src="/static/logo/CPE.png"
                  alt="CPE Logo"
                  className="max-h-[72px] max-w-[220px] object-contain"
                />
                <img
                  src="/static/logo/KMUTT.png"
                  alt="KMUTT Logo"
                  className="max-h-[72px] max-w-[220px] object-contain"
                />
              </div>
              <div className="flex items-center gap-6 2xl:hidden">
                {" "}
                {/* Social Media */}
                <a href="https://www.facebook.com/BangmodHackathon" target="_blank" rel="noopener noreferrer">
                  <IconCircle className="h-[60px] w-[60px] flex-shrink-0 lg:h-[70px] lg:w-[70px] 2xl:h-[80px] 2xl:w-[80px]">
                    <img src="/static/icon/Facebook.svg" alt="Facebook Icon" />
                  </IconCircle>
                </a>
                <a
                  href="https://www.instagram.com/bangmodhack.kmutt"
                  target="_blank"
                  rel="noopener noreferrer">
                  <IconCircle className="h-[60px] w-[60px] flex-shrink-0 lg:h-[70px] lg:w-[70px] 2xl:h-[80px] 2xl:w-[80px]">
                    <img src="/static/icon/Instagram.svg" alt="Instagram Icon" />
                  </IconCircle>
                </a>
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-6 lg:hidden">
              {" "}
              {/* Logo Mobile */}
              <img
                src="/static/logo/Logo.png"
                alt="Bangmod Hackathon Logo"
                className="h-[60px] max-w-[220px] object-contain"
              />
              <div className="flex h-10 gap-4">
                <img
                  src="/static/logo/CPE.png"
                  alt="CPE Logo"
                  className="max-h-[72px] max-w-[220px] object-contain"
                />
                <img
                  src="/static/logo/KMUTT.png"
                  alt="KMUTT Logo"
                  className="max-h-[72px] max-w-[220px] object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-6 self-stretch max-lg:items-center">
              <div className="text-body-1 text-[var(--color-gray-50)] max-2xl:text-[20px] max-lg:text-center max-lg:text-[18px]">
                การแข่งขัน เขียนโปรแกรมคอมพิวเตอร์ บางมดแฮกกาธอน
              </div>
              <div className="flex flex-col items-start gap-3 self-stretch">
                <div className="text-body-3 text-[var(--color-gray-100)] max-lg:text-center max-lg:text-[14px]">
                  ภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี
                  อาคารวิศววัฒนะ ชั้น 10 เลขที่ 126 ถ.ประชาอุทิศ แขวงบางมด เขตทุ่งครุ กรุงเทพฯ 10140
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-[1_0_0] flex-col items-end gap-10 self-stretch">
            {" "}
            {/* Sponsor */}
            <div className="flex flex-[1_0_0] flex-col items-start gap-7 self-stretch max-lg:items-center">
              <div className="text-body-1 text-[var(--color-gray-50)] max-2xl:text-[20px] max-lg:text-[18px]">
                สนับสนุนโดย
              </div>
              <div className="flex flex-wrap items-center gap-6 self-stretch max-lg:justify-center">
                <GlassCard
                  className="w-15 h-15 2xl:h-20 2xl:w-20"
                  style={{ borderRadius: 24, border: "1.5px solid rgba(255, 255, 255, 0.10)" }}
                />
                <GlassCard
                  className="w-15 h-15 2xl:h-20 2xl:w-20"
                  style={{ borderRadius: 24, border: "1.5px solid rgba(255, 255, 255, 0.10)" }}
                />
                <GlassCard
                  className="w-15 h-15 2xl:h-20 2xl:w-20"
                  style={{ borderRadius: 24, border: "1.5px solid rgba(255, 255, 255, 0.10)" }}
                />
                <GlassCard
                  className="w-15 h-15 2xl:h-20 2xl:w-20"
                  style={{ borderRadius: 24, border: "1.5px solid rgba(255, 255, 255, 0.10)" }}
                />
                <GlassCard
                  className="w-15 h-15 2xl:h-20 2xl:w-20"
                  style={{ borderRadius: 24, border: "1.5px solid rgba(255, 255, 255, 0.10)" }}
                />
                <GlassCard
                  className="w-15 h-15 2xl:h-20 2xl:w-20"
                  style={{ borderRadius: 24, border: "1.5px solid rgba(255, 255, 255, 0.10)" }}
                />
              </div>
              <div className="hidden flex-col items-start gap-3 self-stretch 2xl:flex">
                <div className="text-body-3 text-[var(--color-gray-50)]">
                  เราขอขอบคุณ สปอนเซอร์ 1, สปอนเซอร์ 2, สปอนเซอร์ 3, สปอนเซอร์ 4, สปอนเซอร์ 5, สปอนเซอร์ 6
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between self-stretch max-lg:justify-center">
          <div className="flex items-center gap-6 lg:hidden 2xl:flex">
            <a href="https://www.facebook.com/BangmodHackathon" target="_blank" rel="noopener noreferrer">
              <IconCircle className="h-[60px] w-[60px] flex-shrink-0 2xl:h-[80px] 2xl:w-[80px]">
                <img src="/static/icon/Facebook.svg" alt="Facebook Icon" />
              </IconCircle>
            </a>
            <a href="https://www.instagram.com/bangmodhack.kmutt" target="_blank" rel="noopener noreferrer">
              <IconCircle className="h-[60px] w-[60px] flex-shrink-0 2xl:h-[80px] 2xl:w-[80px]">
                <img src="/static/icon/Instagram.svg" alt="Instagram Icon" />
              </IconCircle>
            </a>
          </div>
          <div className="hidden items-center justify-between lg:flex lg:w-full 2xl:w-[820px]">
            <div className="text-nav-2" onClick={() => router.push("/landing")}>
              รายละเอียด
            </div>
            <div className="text-nav-2" onClick={() => router.push("/qualification")}>
              คุณสมบัติ
            </div>
            <div className="text-nav-2" onClick={() => router.push("/award")}>
              รางวัล
            </div>
            <div className="text-nav-2" onClick={() => router.push("/dateandcontest")}>
              กำหนดการ
            </div>
            <div className="text-nav-2" onClick={() => router.push("/contact")}>
              ติดต่อทีมงาน
            </div>
            <div className="text-nav-2" onClick={() => router.push("/")}>
              นโยบายความเป็นส่วนตัว
            </div>
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
