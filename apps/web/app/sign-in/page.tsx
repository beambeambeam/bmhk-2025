"use client"

import { useEffect, useState } from "react"
import GlassCard from "@/components/glassCard"
import { authClient } from "@/lib/auth-client"

function SignInPage() {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: number; src: string }[]>([])
  const [isTall, setIsTall] = useState(false)

  useEffect(() => {
    // Check initial height and listen to resize
    const checkHeight = () => setIsTall(window.innerHeight >= 960)
    checkHeight()
    window.addEventListener("resize", checkHeight)
    return () => window.removeEventListener("resize", checkHeight)
  }, [])

  useEffect(() => {
    const count = 20
    const starImages = [
      "/static/icon/Star.svg",
      "/static/icon/Star_bright.svg",
      "/static/icon/Star2.svg",
    ]

    const newStars = Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: 20 + Math.random() * 40,
      src: starImages[Math.floor(Math.random() * starImages.length)]!,
    }))

    setStars(newStars)
  }, [])

  return (
    <div
      className={`relative flex h-screen w-screen flex-col justify-between items-center px-[30px] lg:px-0 ${
        isTall ? "2xl:px-[160px]" : ""
      } py-[60px] ${isTall ? "2xl:py-[100px]" : ""} overflow-hidden`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(255, 204, 247, 0.15), rgba(159, 131, 220, 0.15)),
          linear-gradient(rgba(0,0,0,1), rgba(0,0,0,1))
        `,
        backgroundSize: "auto, auto",
        backgroundPosition: "center, center",
        backgroundRepeat: "no-repeat, no-repeat",
      }}
    >
      {/* background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/static/background-image/log_in_background_desktop_1x.webp"
          alt="Login background"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Random Stars */}
      {stars.map((star) => (
        <img
          key={star.id}
          src={star.src}
          alt="star"
          className="absolute animate-pulse z-1"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animation: `fadeInOut ${2 + Math.random() * 3}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* content */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between items-center">
        <img
          src="/static/logo/Logo.webp"
          alt="Bangmod Hackathon Logo"
          className={`ml-[-16px] h-[118px] lg:ml-[-24px] lg:h-[178px] ${isTall ? "2xl:ml-[-32px] 2xl:h-[236px]" : ""}`}
        />

        <div
          className={`flex flex-col justify-between items-center p-4 max-lg:gap-6 lg:h-[300px] lg:p-8 ${
            isTall ? "2xl:h-[368px] 2xl:p-10" : ""
          } rounded-[24px] border-2 border-white/10 bg-[linear-gradient(107deg,rgba(255,204,247,0.05)_-2.48%,rgba(159,131,220,0.05)_29.08%)]`}
        >
          <div className="flex flex-col justify-center items-center gap-6">
            <div className="text-header-2-medium text-[var(--color-white)]">เข้าสู่ระบบ</div>
            <div className="font-light max-lg:text-[16px] text-subheader-2 text-[var(--color-gray-50)] text-center">
              กรุณาเข้าสู่ระบบ ด้วยบัญชี Google ของคุณ
            </div>
          </div>
          <GlassCard className="group relative cursor-pointer w-full flex gap-6 items-center justify-center px-3 py-3 lg:py-4 2xl:py-5 rounded-[24px]">
            <div className="absolute inset-0 rounded-[24px] bg-[rgba(159,131,220,0.6)] blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <img src="/static/icon/Google.svg" alt="Google Icon" className="relative z-10" />
            <div
              className="relative z-10 text-body-1 text-[var(--color-white)]"
              onClick={() =>
                authClient.signIn.social({
                  provider: "google",
                  callbackURL: `${process.env.NEXT_PUBLIC_WEB_URL}/teams`,
                })
              }
            >
              ดำเนินการต่อด้วย Google
            </div>
          </GlassCard>
        </div>

        <img
          src="/static/logo/KMUTT_CPE.svg"
          alt="KMUTT CPE Logo"
          className={`h-[50px] lg:h-[60px] ${isTall ? "2xl:h-[90px]" : ""}`}
        />
      </div>

      {/* keyframes */}
      <style jsx>{`
        @keyframes fadeInOut {
          0%,
          100% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default SignInPage
