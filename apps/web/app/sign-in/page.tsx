"use client"

import GlassCard from "@/components/glassCard"
import { showToast } from "@/components/toast"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

function SignInPage() {
  const { data: session, isPending } = authClient.useSession()
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null) // ref for login card
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: number; src: string }[]>(
    []
  )
  const [isTall, setIsTall] = useState(false)
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    const checkHeight = () => setIsTall(window.innerHeight >= 960)
    checkHeight()
    window.addEventListener("resize", checkHeight)
    return () => window.removeEventListener("resize", checkHeight)
  }, [])

  useEffect(() => {
    if (session?.user && !isPending) {
      router.push("/teams")
    }
  }, [session, isPending, router])

  useEffect(() => {
    const generateStars = () => {
      const isLarge = window.innerWidth >= 1024
      const count = isLarge ? 20 : 10
      const starImages = [
        "/static/icon/Star_small_bright.svg",
        "/static/icon/Star_bright.svg",
        "/static/icon/Star2.svg",
      ]

      const cardBox = cardRef.current?.getBoundingClientRect()
      const margin = 40
      const newStars = []

      for (let i = 0; i < count; i++) {
        let top: number, left: number
        let tries = 0
        do {
          top = Math.random() * window.innerHeight
          left = Math.random() * window.innerWidth
          tries++
        } while (
          cardBox &&
          left > cardBox.left - margin &&
          left < cardBox.right + margin &&
          top > cardBox.top - margin &&
          top < cardBox.bottom + margin &&
          tries < 20 // safety break
        )

        newStars.push({
          id: i,
          top: `${(top / window.innerHeight) * 100}%`,
          left: `${(left / window.innerWidth) * 100}%`,
          size: 20 + Math.random() * 40,
          src: starImages[Math.floor(Math.random() * starImages.length)]!,
        })
      }

      setStars(newStars)
    }

    generateStars()
    window.addEventListener("resize", generateStars)
    return () => window.removeEventListener("resize", generateStars)
  }, [])

  return (
    <div
      className={`relative flex h-screen w-screen flex-col items-center justify-between px-[30px] lg:px-0 ${
        isTall ? "2xl:px-[160px]" : ""
      } py-[60px] ${isTall ? "2xl:py-[100px]" : ""} select-none overflow-hidden`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(255, 204, 247, 0.15), rgba(159, 131, 220, 0.15)),
          linear-gradient(rgba(0,0,0,1), rgba(0,0,0,1))
        `,
        backgroundSize: "auto, auto",
        backgroundPosition: "center, center",
        backgroundRepeat: "no-repeat, no-repeat",
      }}>
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
          className="z-1 absolute animate-pulse"
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
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-between">
        <img
          src="/static/logo/Logo.webp"
          alt="Bangmod Hackathon Logo"
          className={`ml-[-16px] h-[118px] lg:ml-[-24px] lg:h-[178px] ${isTall ? "2xl:ml-[-32px] 2xl:h-[236px]" : ""}`}
        />

        {/* login card */}
        <div
          ref={cardRef} // ref for ensures stars don’t overlap this
          className={`flex flex-col items-center justify-between p-4 max-lg:gap-6 lg:h-[300px] lg:p-8 ${
            isTall ? "2xl:h-[368px] 2xl:p-10" : ""
          } rounded-[24px] border-2 border-white/10 bg-[linear-gradient(107deg,rgba(255,204,247,0.05)_-2.48%,rgba(159,131,220,0.05)_29.08%)]`}>
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="text-header-2-medium text-[var(--color-white)]">เข้าสู่ระบบ</div>
            <div className="text-subheader-2 text-center font-light text-[var(--color-gray-50)] max-lg:text-[16px]">
              กรุณาเข้าสู่ระบบด้วยบัญชี Google ของคุณ
            </div>
          </div>
          <GlassCard className="group relative flex w-full cursor-pointer items-center justify-center gap-6 rounded-[24px] px-3 py-3 lg:py-4 2xl:py-5">
            <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-[rgba(159,131,220,0.6)] opacity-0 blur-[40px] transition-opacity duration-500 group-hover:opacity-100"></div>
            <img src="/static/icon/Google.svg" alt="Google Icon" className="relative z-10" />
            <button
              className="text-body-1 relative z-10 text-[var(--color-white)]"
              disabled={redirecting}
              onClick={() => {
                setRedirecting(true)
                authClient.signIn
                  .social({
                    provider: "google",
                    callbackURL: `${process.env.NEXT_PUBLIC_WEB_URL}/teams`,
                    errorCallbackURL: `${process.env.NEXT_PUBLIC_WEB_URL}/sign-in`,
                  })
                  .catch((e) => {
                    setRedirecting(false)
                    console.log(e)
                  })
              }}>
              {redirecting ? "กำลังโหลด..." : "ดำเนินการต่อด้วย Google"}
            </button>
          </GlassCard>
        </div>

        <img
          src="/static/logo/KMUTT_CPE.webp"
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
