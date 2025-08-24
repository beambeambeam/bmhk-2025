import { Button } from "@workspace/ui/components/button"
import { useFileUpload } from "@workspace/ui/hooks/use-file-upload"
import type { FileMetadata } from "@workspace/ui/hooks/use-file-upload"
import { cn } from "@workspace/ui/lib/utils"
import { useEffect, useRef } from "react"

interface AvatarUploaderProps {
  value?: (File | FileMetadata)[]
  onChange?: (files: File[]) => void
  disabled?: boolean
}

function AvatarUploader({ value = [], onChange, disabled }: AvatarUploaderProps) {
  const previousFilesRef = useRef<string>("")

  const [
    { files, isDragging },
    {
      removeFile,
      openFileDialog,
      getInputProps,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
    },
  ] = useFileUpload({
    accept: "image/*",
    multiple: false,
    initialFiles: value.filter((file): file is FileMetadata => !(file instanceof File)),
  })

  useEffect(() => {
    const currentFilesString = files.map((f) => f.id).join(",")

    if (currentFilesString !== previousFilesRef.current) {
      previousFilesRef.current = currentFilesString

      const fileArray = files.map((f) => f.file).filter((file): file is File => file instanceof File)
      onChange?.(fileArray)
    }
  }, [files, onChange])

  const previewUrl = files[0]?.preview || null

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100",
          isDragging && "border-blue-500 bg-blue-50",
          disabled && "cursor-not-allowed opacity-50"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={disabled ? undefined : openFileDialog}>
        {previewUrl ? (
          <div className="relative h-full w-full">
            <img src={previewUrl} alt="Avatar preview" className="h-full w-full rounded-lg object-cover" />
            {!disabled && files[0] && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(files[0]?.id || "")
                }}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600">
                ×
              </button>
            )}
          </div>
        ) : (
          <div className="text-center">
            <div className="text-gray-400">
              <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>

      <input {...getInputProps({ disabled })} className="hidden" />

      {!previewUrl && !disabled && (
        <Button type="button" variant="outline" onClick={openFileDialog}>
          Choose File
        </Button>
      )}
    </div>
  )
}

export default AvatarUploader
