"use client"

import { Label } from "@/components/ui/label"
import { Scroller } from "@/components/ui/scroller"
import { Separator } from "@/components/ui/separator"
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
}

interface MemberLayoutProps {
  title: string
  member: MemberData
  showGuardian?: boolean
  children?: ReactNode
}

export function MemberLayout(props: MemberLayoutProps) {
  const { title, member, showGuardian = true } = props

  return (
    <div className="grid min-h-0 lg:grid-cols-[2fr_1fr]">
      <div className="flex min-h-0 flex-col gap-2 p-4">
        <h1 className="flex flex-col text-2xl font-bold">
          <span className="text-4xl">{title}</span>
        </h1>
        <Scroller className="flex h-[72vh] flex-col gap-10" hideScrollbar withNavigation>
          <div className="flex flex-col gap-3">
            <h2 className="text-muted-foreground text-lg font-bold">Personal Information</h2>
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
                {member.prefix} {member.thaiFirstname}{" "}
                {member.thaiMiddlename ? `${member.thaiMiddlename} ` : ""}
                {member.thaiLastname}
              </div>
            </div>
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
            <div className="flex w-full flex-col gap-2">
              <Label>Chronic Disease</Label>
              <div className="rounded-lg border p-2 px-3">{member.chronicDisease || "None"}</div>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-3">
            <h2 className="text-muted-foreground text-lg font-bold">Contact</h2>
            <div className="flex w-full flex-col gap-2">
              <Label>Email</Label>
              <div className="rounded-lg border p-2 px-3">{member.email}</div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <Label>Phone Number</Label>
              <div className="rounded-lg border p-2 px-3">{member.phoneNumber}</div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <Label>Line ID</Label>
              <div className="rounded-lg border p-2 px-3">{member.lineId ? member.lineId : "No Line Id"}</div>
            </div>
          </div>
          <Separator />
          {showGuardian && (
            <>
              <div className="flex flex-col gap-3">
                <h2 className="text-muted-foreground text-lg font-bold">Guardian</h2>
                <div className="flex w-full flex-col gap-2">
                  <Label>Parent Name</Label>
                  <div className="rounded-lg border p-2 px-3">{member.parent}</div>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <Label>Parent Phone Number</Label>
                  <div className="rounded-lg border p-2 px-3">{member.parentPhoneNumber}</div>
                </div>
              </div>
              <Separator />
            </>
          )}
        </Scroller>
      </div>
      {props.children}
    </div>
  )
}

export default MemberLayout
