import { cn } from "@workspace/ui/lib/utils"
import * as React from "react"

function Textarea({
  className,
  value,
  limit,
  onChange,
  ...props
}: React.ComponentProps<"textarea"> & {
  limit?: number
}) {
  const [internalValue, setInternalValue] = React.useState(value || "")
  const textareaValue = value !== undefined ? value : internalValue
  const isControlled = value !== undefined

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value)
    }
    onChange?.(e)
  }

  return (
    <div className="group relative">
      <textarea
        data-slot="textarea"
        value={textareaValue}
        onChange={handleChange}
        className={cn(
          "text-body-3 min-h-[38px] w-full min-w-0 resize-none rounded-2xl border border-white/10 border-l-white/30 border-t-white/30 bg-white/15 px-3 py-1.5 outline-none transition-colors placeholder:text-gray-50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-transparent disabled:placeholder:text-gray-300 group-hover:bg-white/30 lg:min-h-[45px] 2xl:min-h-14",
          "aria-invalid:bg-[rgba(234,67,53,0.05)] aria-invalid:shadow-[inset_0px_1px_4px_rgba(234,67,53,0.6),inset_0px_-1px_4px_rgba(234,67,53,0.5)]",
          className
        )}
        {...props}
      />
      {limit && (
        <div className="text-body-3 absolute bottom-2 right-3 text-gray-100">
          {String(textareaValue).length}/{limit}
        </div>
      )}
    </div>
  )
}

export { Textarea }
