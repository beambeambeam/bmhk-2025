import { useCharacterLimit } from "@workspace/ui/hooks/use-character-limit"
import { cn } from "@workspace/ui/lib/utils"
import * as React from "react"

function Input({
  className,
  type,
  value,
  limit,
  onChange,
  ...props
}: React.ComponentProps<"input"> & {
  limit?: number
}) {
  const [internalValue, setInternalValue] = React.useState(value || "")
  const inputValue = value !== undefined ? value : internalValue
  const isControlled = value !== undefined

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value)
    }
    onChange?.(e)
  }

  const handleClear = () => {
    if (isControlled && onChange) {
      const syntheticEvent = {
        target: { value: "" },
        currentTarget: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>
      onChange(syntheticEvent)
    } else {
      setInternalValue("")
    }
  }

  return (
    <div className="group relative">
      <input
        type={type}
        data-slot="input"
        value={inputValue}
        onChange={handleChange}
        className={cn(
          "text-body-3 h-[38px] w-full min-w-0 rounded-2xl border border-white/10 border-l-white/30 border-t-white/30 bg-white/15 px-3 py-1.5 pr-10 outline-none transition-colors placeholder:text-gray-50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-transparent disabled:placeholder:text-gray-300 group-hover:bg-white/30 lg:h-[45px] 2xl:h-14 2xl:py-2.5",
          "aria-invalid:bg-[rgba(234,67,53,0.05)] aria-invalid:shadow-[inset_0px_1px_4px_rgba(234,67,53,0.6),inset_0px_-1px_4px_rgba(234,67,53,0.5)]",
          className
        )}
        {...props}
      />
      {limit ? (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-100">
          {String(inputValue).length}/{limit}
        </div>
      ) : (
        inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            tabIndex={-1}>
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 lg:size-6 2xl:size-[30px]">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M27.5 15C27.5 21.9035 21.9035 27.5 15 27.5C8.09644 27.5 2.5 21.9035 2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C21.9035 2.5 27.5 8.09644 27.5 15ZM11.212 11.2121C11.5782 10.846 12.1717 10.846 12.5379 11.2121L15 13.6741L17.462 11.2121C17.8281 10.846 18.4218 10.846 18.7879 11.2121C19.154 11.5782 19.154 12.1718 18.7879 12.5379L16.3258 15L18.7879 17.462C19.154 17.8281 19.154 18.4218 18.7879 18.7879C18.4218 19.154 17.8281 19.154 17.462 18.7879L15 16.3259L12.5379 18.7879C12.1718 19.154 11.5782 19.154 11.2121 18.7879C10.846 18.4218 10.846 17.8281 11.2121 17.4621L13.6741 15L11.212 12.5379C10.8459 12.1718 10.8459 11.5782 11.212 11.2121Z"
                fill="white"
                fillOpacity="0.8"
              />
            </svg>
          </button>
        )
      )}
    </div>
  )
}

export { Input }
