"use client"

import { orpc } from "@/utils/orpc"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo } from "react"

interface CertPreviewPageProps {
  member: "member1" | "member2" | "member3" | "adviser"
}

export default function CertPreviewPage({ member }: CertPreviewPageProps) {
  const { data, isLoading, isError } = useQuery(
    orpc.cert.generate.queryOptions({
      input: { member },
    })
  )

  const url = useMemo(() => {
    if (!data?.data) return null
    const bytes = Uint8Array.from(atob(data.data), (c) => c.charCodeAt(0))
    const blob = new Blob([bytes], { type: "application/pdf" })
    return URL.createObjectURL(blob)
  }, [data])

  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url)
    }
  }, [url])

  if (isLoading || !url) {
    return (
      <div className="flex w-full items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 animate-spin rounded-full border-4 border-white/30 border-t-white" />
          <p className="text-[1rem] opacity-70">กำลังโหลดใบประกาศนียบัตร...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex w-full items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <p className="text-[1rem] text-red-400">ไม่สามารถโหลดใบประกาศนียบัตรได้</p>
          <p className="text-[0.875rem] opacity-70">กรุณาลองใหม่อีกครั้ง</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <object
        data={url}
        type="application/pdf"
        className="h-[400px] w-full rounded-lg md:h-[500px] lg:h-[595px] lg:w-[842px]">
        <div className="flex flex-col items-center gap-3 py-8">
          <p className="text-[1rem] opacity-70">ไม่สามารถแสดง PDF ในเบราว์เซอร์</p>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="rounded-[20px] bg-white px-6 py-2 text-[1rem] font-medium text-black transition-all hover:bg-white/90">
            เปิด PDF
          </a>
        </div>
      </object>
    </div>
  )
}
