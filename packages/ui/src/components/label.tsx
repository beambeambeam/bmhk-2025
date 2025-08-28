"use client"

import * as LabelPrimitive from "@radix-ui/react-label"
import { cn } from "@workspace/ui/lib/utils"
import * as React from "react"

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "text-label-1 flex select-none items-center gap-2 leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
