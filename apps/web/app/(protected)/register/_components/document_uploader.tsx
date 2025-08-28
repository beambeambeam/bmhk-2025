import { Button } from "@workspace/ui/components/button"
import { useFileUpload, formatBytes } from "@workspace/ui/hooks/use-file-upload"
import type { FileMetadata } from "@workspace/ui/hooks/use-file-upload"
import { cn } from "@workspace/ui/lib/utils"
import { useEffect, useRef } from "react"

interface DocumentUploaderProps {
  value?: (File | FileMetadata)[]
  onChange?: (files: (File | FileMetadata)[]) => void
  disabled?: boolean
  multiple?: boolean
  maxFiles?: number
  maxSize?: number // in bytes, default 10MB
}

function DocumentUploader({
  value = [],
  onChange,
  disabled,
  multiple = false,
  maxFiles = Infinity,
  maxSize = 10 * 1024 * 1024, // 10MB default
}: DocumentUploaderProps) {
  const previousFilesRef = useRef<string>("")

  const [
    { files, isDragging, errors },
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
    accept: "image/*,.pdf",
    multiple,
    maxFiles,
    maxSize,
    initialFiles: value.filter((file): file is FileMetadata => !(file instanceof File)),
  })

  // Handle file changes with useEffect to avoid render-time state updates
  useEffect(() => {
    const currentFilesString = files.map((f) => f.id).join(",")

    if (currentFilesString !== previousFilesRef.current) {
      previousFilesRef.current = currentFilesString

      const normalizedFiles = files.map((f) => f.file)
      onChange?.(normalizedFiles)
    }
  }, [files, onChange])

  const getFileIcon = (file: File | FileMetadata) => {
    const type = file instanceof File ? file.type : file.type

    if (type.startsWith("image/")) {
      return (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      )
    }

    return (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
          clipRule="evenodd"
        />
      </svg>
    )
  }

  return (
    <div className="space-y-4">
      <p className="block text-center text-xs text-white md:hidden">
        อัปโหลดเอกสารไม่เกิน {formatBytes(maxSize)} (รูปภาพและ PDF เท่านั้น)
      </p>
      {/* Upload Area */}
      <div
        className={cn(
          "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors",
          "border-white/80 bg-white/15 hover:bg-white/30",
          isDragging && "border-white/80 bg-white/30",
          errors.length > 0 && "border-[#ea4335]/80 bg-[#ea4335]/5",
          disabled && "cursor-not-allowed opacity-50"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={disabled ? undefined : openFileDialog}>
        {/* Upload Icon */}
        <div className={cn("mb-4 text-neutral-200", errors.length > 0 && "text-[#ea4335]")}>
          <svg className="mx-auto size-6" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Upload Text */}
        <p className={cn("text-body-3 font-medium text-neutral-200", errors.length > 0 && "text-[#ea4335]")}>
          อัปโหลดไฟล์
        </p>
      </div>

      {/* Helper Text */}
      <p className="hidden text-left text-xs text-white lg:block">
        อัปโหลดเอกสารไม่เกิน {formatBytes(maxSize)} (รูปภาพและ PDF เท่านั้น)
      </p>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="space-y-2">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-[#ea4335]">
              {error}
            </p>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((fileWithPreview) => {
            const file = fileWithPreview.file
            const fileName = file instanceof File ? file.name : file.name
            const fileSize = file instanceof File ? file.size : file.size

            return (
              <div key={fileWithPreview.id} className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 flex-1 items-center space-x-2 md:space-x-3">
                  <div className="flex-shrink-0 text-green-400">{getFileIcon(file)}</div>

                  <div className="flex min-w-0 flex-col md:flex-row md:gap-x-3">
                    <p className="truncate text-sm font-normal text-white md:text-lg" title={fileName}>
                      {fileName.length > 20
                        ? `${fileName.substring(0, 15)}...${fileName.split(".").pop()}`
                        : fileName}
                    </p>
                    <p className="flex-shrink-0 text-xs font-light text-gray-50 md:text-lg">
                      {formatBytes(fileSize)}
                    </p>
                  </div>
                </div>

                {!disabled && (
                  <button
                    type="button"
                    onClick={() => removeFile(fileWithPreview.id)}
                    className="flex-shrink-0 text-white transition-colors hover:text-[#ea4335]">
                    <svg
                      className="h-4 w-4 md:h-5 md:w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}

      <input {...getInputProps({ disabled })} className="hidden" />

      {/* {files.length === 0 && !disabled && (
        <Button type="button" variant="outline" onClick={openFileDialog} className="w-full !bg-white/5 !border-white/80">
          เลือกไฟล์
        </Button>
      )} */}
    </div>
  )
}

export default DocumentUploader
