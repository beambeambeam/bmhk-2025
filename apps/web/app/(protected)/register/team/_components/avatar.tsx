import { useFileUpload } from "@workspace/ui/hooks/use-file-upload"
import type { FileMetadata } from "@workspace/ui/hooks/use-file-upload"
import { cn } from "@workspace/ui/lib/utils"
import { useEffect, useRef, useState } from "react"

interface AvatarUploaderProps {
  value?: (File | FileMetadata)[]
  onChange?: (files: (File | FileMetadata)[]) => void
  disabled?: boolean
}

function AvatarUploader({ value = [], onChange, disabled }: AvatarUploaderProps) {
  const previousFilesRef = useRef<string>("")
  const [isHovering, setIsHovering] = useState(false)

  const [
    { files, isDragging },
    { openFileDialog, getInputProps, handleDragEnter, handleDragLeave, handleDragOver, handleDrop },
  ] = useFileUpload({
    accept: "image/png, image/jpeg",
    multiple: false,
    initialFiles: value.filter((file): file is FileMetadata => !(file instanceof File)),
  })

  useEffect(() => {
    const currentFilesString = files.map((f) => f.id).join(",")

    if (currentFilesString !== previousFilesRef.current) {
      previousFilesRef.current = currentFilesString

      const normalizedFiles = files.map((f) => f.file)
      onChange?.(normalizedFiles)
    }
  }, [files, onChange])

  const previewUrl = files[0]?.preview || null

  return (
    <div className="space-y-4">
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={cn(
          "relative flex size-[120px] cursor-pointer items-center justify-center rounded-full border border-dashed border-white/80 bg-white/15 transition-colors hover:bg-white/20 lg:size-[157px] 2xl:size-[190px]",
          isDragging && "bg-white/20",
          disabled && "cursor-not-allowed opacity-50",
          previewUrl && "border-none"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={disabled ? undefined : openFileDialog}>
        {previewUrl ? (
          <div className="relative h-full w-full">
            <div
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-center gap-2.5 rounded-full bg-black/70 transition-opacity",
                isHovering ? "opacity-100" : "opacity-0"
              )}>
              <AvatarPlaceholder />
            </div>
            <img src={previewUrl} alt="Avatar preview" className="h-full w-full rounded-full object-cover" />
          </div>
        ) : (
          <AvatarPlaceholder />
        )}
      </div>

      <input {...getInputProps({ disabled })} className="hidden" />
    </div>
  )
}

function AvatarPlaceholder() {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gray-50">
        <path
          d="M22.9766 12.2378C22.9766 16.9518 22.9766 19.3089 21.5121 20.7733C20.0477 22.2378 17.6906 22.2378 12.9766 22.2378C8.26251 22.2378 5.90549 22.2378 4.44103 20.7733C2.97656 19.3089 2.97656 16.9518 2.97656 12.2378C2.97656 7.52374 2.97656 5.16672 4.44103 3.70226C5.90549 2.23779 8.26251 2.23779 12.9766 2.23779"
          stroke="#DFDFDF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M2.97656 12.7379L4.72815 11.2053C5.63942 10.408 7.01284 10.4537 7.86905 11.3099L12.1588 15.5996C12.846 16.2869 13.9278 16.3806 14.723 15.8217L15.0212 15.6122C16.1654 14.808 17.7135 14.9012 18.7531 15.8368L21.9766 18.7379"
          stroke="#DFDFDF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M14.9766 6.23779H18.9766M18.9766 6.23779H22.9766M18.9766 6.23779V10.2378M18.9766 6.23779V2.23779"
          stroke="#DFDFDF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <p className="text-body-3 text-gray-50">รูปโปรไฟล์</p>
    </div>
  )
}

export default AvatarUploader
