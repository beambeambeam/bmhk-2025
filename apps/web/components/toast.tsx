"use client"

import { toast } from "sonner"

type ToastVariant = "positive" | "negative"

export function showToast({ variant, title }: { variant: ToastVariant; title: string }) {
  toast.custom(() => (
    <div
      className="inline-flex w-full max-w-[90vw] items-center justify-center gap-[40px] rounded-[48px] border border-white/10 bg-white/10 px-[60px] py-[32px] pr-[60px] shadow-[0_0_100px_0_rgba(255,255,255,0.25)] backdrop-blur-3xl"
      role="status"
      aria-live="polite">
      {variant == "positive" ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
          <rect width="60" height="60" rx="30" fill="#00C951" />
          <path
            d="M15 32L23.5715 40L45 20"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
          <g clipPath="url(#clip0_4222_13745)">
            <circle cx="30.5" cy="30" r="20" fill="white" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M60.5 30C60.5 46.5684 47.0684 60 30.5 60C13.9314 60 0.5 46.5684 0.5 30C0.5 13.4314 13.9314 0 30.5 0C47.0684 0 60.5 13.4314 60.5 30ZM21.4089 20.909C22.2876 20.0303 23.7122 20.0303 24.5909 20.909L30.5 26.8179L36.4088 20.909C37.2875 20.0303 38.7122 20.0303 39.5909 20.909C40.4696 21.7877 40.4696 23.2123 39.5909 24.0909L33.6818 30L39.5909 35.9088C40.4696 36.7875 40.4696 38.2122 39.5909 39.0909C38.7122 39.9696 37.2875 39.9696 36.4088 39.0909L30.5 33.1821L24.5909 39.0909C23.7123 39.9696 22.2876 39.9696 21.409 39.0909C20.5303 38.2122 20.5303 36.7875 21.409 35.9091L27.3179 30L21.4089 24.0909C20.5302 23.2123 20.5302 21.7876 21.4089 20.909Z"
              fill="#EA4335"
            />
          </g>
          <defs>
            <clipPath id="clip0_4222_13745">
              <rect width="60" height="60" rx="30" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
      <div className="font-prompt max-w-[70vw] truncate whitespace-nowrap text-[40px] font-medium">
        {title}
      </div>
    </div>
  ))
}
