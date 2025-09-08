"use client"

import { Label } from "@/components/ui/label"
import { Scroller } from "@/components/ui/scroller"
import { Separator } from "@/components/ui/separator"
import { mapPrefixToThai } from "@/lib/format"
import { ReactNode } from "react"

export interface MemberData {
  prefix?: string | null
  thaiFirstname?: string | null
  thaiMiddlename?: string | null
  thaiLastname?: string | null
  firstName?: string | null
  middleName?: string | null
  lastname?: string | null
  email?: string | null
  phoneNumber?: string | null
  lineId?: string | null
  parent?: string | null
  parentPhoneNumber?: string | null
  foodAllergy?: string | null
  foodType?: string | null
  drugAllergy?: string | null
  chronicDisease?: string | null
  // Attached server fields with presigned URLs
  nationalDoc?: { id: string; name: string; size: number; type: string; url: string } | null
  teacherDoc?: { id: string; name: string; size: number; type: string; url: string } | null
  p7Doc?: { id: string; name: string; size: number; type: string; url: string } | null
  facePic?: { id: string; name: string; size: number; type: string; url: string } | null
}

interface MemberLayoutProps {
  title: string
  member: MemberData
  showGuardian?: boolean
  children?: ReactNode
}

export function MemberLayout(props: MemberLayoutProps) {
  const { title, member, showGuardian = true } = props

  function formatPhone(num?: string | null) {
    if (!num) return ""
    const digits = num.replace(/\D/g, "")
    if (digits.length !== 10) return num
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  return (
    <div className="flex min-h-0 flex-col gap-2 p-4">
      <h1 className="flex flex-col text-2xl font-bold">
        <span className="text-4xl">{title}</span>
      </h1>
      <Scroller className="flex h-[72vh] flex-col gap-10" hideScrollbar withNavigation>
        <div className="flex flex-col gap-3">
          <h2 className="text-muted-foreground text-lg font-bold">Personal Information</h2>
          {showGuardian ? (
            <div className="grid w-full grid-cols-1 items-start gap-4 lg:grid-cols-[180px_1fr]">
              <div className="flex w-full flex-col gap-2">
                <Label>Face Picture</Label>
                <div className="rounded-lg border p-2">
                  {member.facePic ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={member.facePic.url}
                      alt={member.facePic.name}
                      className="h-[240px] w-full rounded object-contain md:h-[200px] lg:h-[180px] lg:w-[160px]"
                    />
                  ) : (
                    <div className="text-muted-foreground">No face picture</div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex w-full flex-col gap-2">
                  <Label>English Name</Label>
                  <div className="rounded-lg border p-2 px-3">
                    {member.prefix} {member.firstName} {member.middleName ? `${member.middleName} ` : ""}
                    {member.lastname}
                  </div>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <Label>Thai Name</Label>
                  <div className="rounded-lg border p-2 px-3">
                    {mapPrefixToThai(member.prefix)} {member.thaiFirstname}{" "}
                    {member.thaiMiddlename ? `${member.thaiMiddlename} ` : ""}
                    {member.thaiLastname}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex w-full flex-col gap-2">
                <Label>English Name</Label>
                <div className="rounded-lg border p-2 px-3">
                  {member.firstName} {member.middleName ? `${member.middleName} ` : ""}
                  {member.lastname}
                </div>
              </div>
              <div className="flex w-full flex-col gap-2">
                <Label>Thai Name</Label>
                <div className="rounded-lg border p-2 px-3">
                  {mapPrefixToThai(member.prefix)} {member.thaiFirstname}{" "}
                  {member.thaiMiddlename ? `${member.thaiMiddlename} ` : ""}
                  {member.thaiLastname}
                </div>
              </div>
            </div>
          )}
          <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-3">
            <div className="flex w-full flex-col gap-2">
              <Label>Food Allergy</Label>
              <div className="rounded-lg border p-2 px-3">{member.foodAllergy || "None"}</div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <Label>Food Type</Label>
              <div className="rounded-lg border p-2 px-3">{member.foodType || "Not specified"}</div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <Label>Drug Allergy</Label>
              <div className="rounded-lg border p-2 px-3">{member.drugAllergy || "None"}</div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <Label>Chronic Disease</Label>
            <div className="rounded-lg border p-2 px-3">{member.chronicDisease || "None"}</div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-3">
          <h2 className="text-muted-foreground text-lg font-bold">Contact</h2>
          <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-3">
            <div className="flex w-full flex-col gap-2">
              <Label>Email</Label>
              <div className="rounded-lg border p-2 px-3">{member.email}</div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <Label>Phone Number</Label>
              <div className="rounded-lg border p-2 px-3">{formatPhone(member.phoneNumber)}</div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <Label>Line ID</Label>
              <div className="rounded-lg border p-2 px-3">{member.lineId ? member.lineId : "No Line Id"}</div>
            </div>
          </div>
        </div>
        <Separator />
        {showGuardian && (
          <>
            <div className="flex flex-col gap-3">
              <h2 className="text-muted-foreground text-lg font-bold">Guardian</h2>
              <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-2">
                <div className="flex w-full flex-col gap-2">
                  <Label>Parent Name</Label>
                  <div className="rounded-lg border p-2 px-3">{member.parent}</div>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <Label>Parent Phone Number</Label>
                  <div className="rounded-lg border p-2 px-3">{formatPhone(member.parentPhoneNumber)}</div>
                </div>
              </div>
            </div>
            <Separator />
          </>
        )}
        <div className="">
          <h2 className="text-muted-foreground text-lg font-bold">Files</h2>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Face picture moved to Personal Information */}
            {member.nationalDoc && <FilePreview label="National Document" file={member.nationalDoc} />}
            {member.teacherDoc && <FilePreview label="Teacher Document" file={member.teacherDoc} />}
            {member.p7Doc && <FilePreview label="P7 Document" file={member.p7Doc} />}
            {!member.nationalDoc && !member.teacherDoc && !member.p7Doc && (
              <div className="text-muted-foreground">No files uploaded</div>
            )}
          </div>
        </div>
        <Separator />
      </Scroller>
    </div>
  )
}

export default MemberLayout

export function MemberSkeleton({ title }: { title: string }) {
  return (
    <div className="flex min-h-0 flex-col gap-2 p-4">
      <h1 className="flex flex-col text-2xl font-bold">
        <span className="text-4xl">{title}</span>
      </h1>
      <div className="flex h-[72vh] flex-col gap-10">
        <div className="flex flex-col gap-3">
          <div className="bg-muted h-5 w-40 animate-pulse rounded" />
          <div className="grid w-full grid-cols-1 items-start gap-4 lg:grid-cols-[180px_1fr]">
            <div className="flex w-full flex-col gap-2">
              <div className="bg-muted h-4 w-24 animate-pulse rounded" />
              <div className="bg-muted h-[240px] w-full animate-pulse rounded-lg border md:h-[200px] lg:h-[180px] lg:w-[160px]" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex w-full flex-col gap-2">
                <div className="bg-muted h-4 w-24 animate-pulse rounded" />
                <div className="bg-muted h-9 w-full animate-pulse rounded-lg border" />
              </div>
              <div className="flex w-full flex-col gap-2">
                <div className="bg-muted h-4 w-24 animate-pulse rounded" />
                <div className="bg-muted h-9 w-full animate-pulse rounded-lg border" />
              </div>
            </div>
          </div>
          <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex w-full flex-col gap-2">
                <div className="bg-muted h-4 w-24 animate-pulse rounded" />
                <div className="bg-muted h-9 w-full animate-pulse rounded-lg border" />
              </div>
            ))}
          </div>
          <div className="flex w-full flex-col gap-2">
            <div className="bg-muted h-4 w-32 animate-pulse rounded" />
            <div className="bg-muted h-9 w-full animate-pulse rounded-lg border" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="bg-muted h-5 w-24 animate-pulse rounded" />
          <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex w-full flex-col gap-2">
                <div className="bg-muted h-4 w-24 animate-pulse rounded" />
                <div className="bg-muted h-9 w-full animate-pulse rounded-lg border" />
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <div className="bg-muted h-5 w-16 animate-pulse rounded" />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {[0, 1].map((i) => (
              <div key={i} className="bg-muted h-40 w-full animate-pulse rounded-lg border" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function isImage(mime: string) {
  return mime.startsWith("image/")
}

function isPdf(mime: string) {
  return mime === "application/pdf"
}

function FilePreview({
  label,
  file,
}: {
  label: string
  file: { id: string; name: string; size: number; type: string; url: string }
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Label>{label}</Label>
      <div className="w-full rounded-lg border p-2">
        {isImage(file.type) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={file.url} alt={file.name} className="max-h-[60vh] w-full rounded object-contain" />
        ) : isPdf(file.type) ? (
          <iframe src={file.url} className="h-[60vh] w-full rounded" title={file.name} />
        ) : (
          <a href={file.url} target="_blank" rel="noreferrer" className="underline">
            View file: {file.name}
          </a>
        )}
      </div>
    </div>
  )
}
