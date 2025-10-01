"use client"

import { orpc } from "@/utils/orpc"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo } from "react"

export default function CertPreviewPage() {
  const { data, isLoading, isError } = useQuery(orpc.cert.generate.queryOptions())

  const url = useMemo(() => {
    if (!data) return null
    const bytes = Uint8Array.from(atob(data.data), (c) => c.charCodeAt(0))
    const blob = new Blob([bytes], { type: data.contentType })
    return URL.createObjectURL(blob)
  }, [data])

  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url)
    }
  }, [url])

  if (isLoading || !url) return <div>Loading…</div>
  if (isError) return <div>Failed to load certificate</div>

  return (
    <div className="flex w-full items-center justify-center p-4">
      <object data={url} type="application/pdf" width={600} height={600}>
        <a href={url} target="_blank" rel="noreferrer">
          Open PDF
        </a>
      </object>
    </div>
  )
}
