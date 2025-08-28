import { useSubmitRegister } from "@/app/(protected)/_components/status/context"
import ArrowIcon from "@/components/ArrowIcon"
import CheckIcon from "@/components/CheckIcon"
import DocumentIcon from "@/components/DocumentIcon"
import EducationIcon from "@/components/EducationIcon"
import MessageIcon from "@/components/MessageIcon"
import { orpc } from "@/utils/orpc"
import { useQuery } from "@tanstack/react-query"
import { formatBytes } from "@workspace/ui/hooks/use-file-upload"
import Link from "next/link"
import { useState } from "react"

function TeamDone() {
  const query = useQuery(orpc.register.all.get.queryOptions())
  const [activeMember, setActiveMember] = useState<string | null>("อาจารย์ที่ปรึกษา")
  const isSubmit = useSubmitRegister()

  if (query.isPending) {
    return
  }

  const teamData = {
    teamCode: `#BH${query.data?.team?.index?.toString().padStart(3, "0") || "NaN"}`,
    teamName: query.data?.team?.name || "",
    teamImage: query.data?.team?.image?.url || "",
    school: query.data?.team?.school || "",
    message: query.data?.team?.quote || "",
  }

  const allMemberSlots = [
    {
      teamCode: "",
      role: "อาจารย์ที่ปรึกษา",
      avatar: "/static/teams/teacher.webp",
      info: {
        general: {
          id: null,
          nameTH: ["", ""],
          nameEN: ["", ""],
          allergyFood: "",
          foodType: "",
          allergyMedicine: "",
          chronicDisease: "",
        },
        contact: {
          email: "",
          phone: "",
          line: "",
        },
        documents: [],
      },
    },
    {
      teamCode: "",
      role: "สมาชิกคนที่ 1",
      avatar: "/static/teams/student1.webp",
      info: {
        general: {
          id: null,
          nameTH: ["", ""],
          nameEN: ["", ""],
          allergyFood: "",
          foodType: "",
          allergyMedicine: "",
          chronicDisease: "",
        },
        contact: {
          email: "",
          phone: "",
          line: "",
        },
        documents: [],
      },
    },
    {
      teamCode: "",
      role: "สมาชิกคนที่ 2",
      avatar: "/static/teams/student2.webp",
      info: {
        general: {
          id: null,
          nameTH: ["", ""],
          nameEN: ["", ""],
          allergyFood: "",
          foodType: "",
          allergyMedicine: "",
          chronicDisease: "",
        },
        contact: {
          email: "",
          phone: "",
          line: "",
        },
        documents: [],
      },
    },
    ...(query.data?.team?.memberCount === 3
      ? [
          {
            teamCode: "",
            role: "สมาชิกคนที่ 3",
            avatar: "/static/teams/student3.webp",
            info: {
              general: {
                id: null,
                nameTH: ["", ""],
                nameEN: ["", ""],
                allergyFood: "",
                foodType: "",
                allergyMedicine: "",
                chronicDisease: "",
              },
              contact: {
                email: "",
                phone: "",
                line: "",
              },
              documents: [],
            },
          },
        ]
      : []),
  ]

  // Fill in actual data where available
  const membersData = allMemberSlots.map((slot, index) => {
    if (index === 0) {
      // Advisor slot
      if (query.data?.adviser) {
        return {
          ...slot,
          teamCode: query.data.adviser.teamId || "",
          info: {
            general: {
              id: query.data.adviser.id || null,
              nameTH: [query.data.adviser.thaiFirstname || "", query.data.adviser.thaiLastname || ""],
              nameEN: [query.data.adviser.firstName || "", query.data.adviser.lastname || ""],
              allergyFood: query.data.adviser.foodAllergy || "",
              foodType: query.data.adviser.foodType || "",
              allergyMedicine: query.data.adviser.drugAllergy || "",
              chronicDisease: query.data.adviser.chronicDisease || "",
            },
            contact: {
              email: query.data.adviser.email || "",
              phone: query.data.adviser.phoneNumber || "",
              line: query.data.adviser.lineId || "",
            },
            documents: [
              {
                description: "สำเนาบัตรประชาชน",
                fileName: query.data.adviser.nationalDoc?.name || "",
                size: formatBytes(query.data.adviser.nationalDoc?.size || 0),
                href: query.data.adviser.nationalDoc?.url || "",
              },
              {
                description: "หนังสือรับรองความเป็นครู",
                fileName: query.data.adviser.teacherDoc?.name || "",
                size: formatBytes(query.data.adviser.teacherDoc?.size || 0),
                href: query.data.adviser.teacherDoc?.url || "",
              },
            ].filter((doc) => doc.fileName),
          },
        }
      }
      return slot
    } else {
      const studentIndex = index
      const student = query.data?.members?.find((member) => member.index === studentIndex)
      if (student) {
        return {
          ...slot,
          teamCode: student.teamId,
          info: {
            general: {
              id: student.id || null,
              nameTH: [student.thaiFirstname || "", student.thaiLastname || ""],
              nameEN: [student.firstName || "", student.lastname || ""],
              allergyFood: student.foodAllergy || "",
              foodType: student.foodType || "",
              allergyMedicine: student.drugAllergy || "",
              chronicDisease: student.chronicDisease,
            },
            contact: {
              email: student.email || "",
              phone: student.phoneNumber || "",
              line: student.lineId || "",
            },
            documents: [
              {
                description: "สำเนาบัตรประชาชน",
                fileName: student.nationalDoc?.name || "",
                size: formatBytes(student.nationalDoc?.size || 0),
                href: student.nationalDoc?.url || "",
              },
              {
                description: "รูปถ่ายหน้าตรง",
                fileName: student.facePic?.name || "",
                size: formatBytes(student.facePic?.size || 0),
                href: student.facePic?.url || "",
              },
              {
                description: "สำเนา ปw.7",
                fileName: student.p7Doc?.name || "",
                size: formatBytes(student.p7Doc?.size || 0),
                href: student.p7Doc?.url || "",
              },
            ].filter((doc) => doc.fileName),
          },
        }
      }
      return slot
    }
  })

  return (
    <div className="md:px-15 z-50 w-full px-6 pt-8 md:pt-0 lg:px-20 2xl:px-40">
      {!isSubmit && (
        <Link
          href="/register/team"
          className="liquid mb-8 flex h-fit w-full items-center justify-between gap-4 rounded-[32px] py-3 pl-6 pr-3 md:hidden md:w-auto md:pl-8 md:pr-4 2xl:py-4 2xl:pl-10 2xl:pr-6">
          <span className="text-[1.125rem] font-medium md:text-[1.5rem] 2xl:text-[2rem]">ลงทะเบียนต่อ</span>
          <ArrowIcon className="h-6 w-6 md:h-8 md:w-8 2xl:h-10 2xl:w-10" />
        </Link>
      )}
      <div
        className="liquid flex flex-col items-center gap-8 rounded-[24px] p-4 md:gap-10 md:rounded-[40px] md:p-8 lg:gap-8 2xl:gap-10 2xl:p-10"
        style={{
          background: `
                  radial-gradient(
                    66.31% 84.48% at 52.63% 121.84%,
                    #9F83DC 0%,
                    rgba(2, 6, 3, 0) 10%
                  ),
                  linear-gradient(
                    106.52deg,
                    rgba(255, 204, 247, 0.03) -2.48%,
                    rgba(159, 131, 220, 0.03) 29.08%
                  )
                `,
        }}>
        <div className="flex w-full flex-col gap-5 md:flex-row md:gap-10">
          <div className="flex flex-col gap-3 md:items-center md:justify-center">
            {teamData.teamImage ? (
              <img
                className="h-[68px] min-h-[68px] w-[68px] min-w-[68px] rounded-full md:h-[75px] md:min-h-[75px] md:w-[75px] md:min-w-[75px] lg:h-[95px] lg:min-h-[95px] lg:w-[95px] lg:min-w-[95px] 2xl:h-[100px] 2xl:min-h-[100px] 2xl:w-[100px] 2xl:min-w-[100px]"
                src={teamData.teamImage}
                alt={teamData.teamName}
              />
            ) : (
              <img
                src="/static/icon/UserCircleFilled.svg"
                alt="Team Image"
                className="size-[68px] md:size-[75px] lg:size-[95px] 2xl:size-[100px]"
              />
            )}
            <div className="hidden text-[0.875rem] font-normal text-gray-50 md:block 2xl:hidden">
              {teamData.teamCode}
            </div>
          </div>
          <div className="flex w-full flex-col md:flex-row md:justify-between">
            <div className="flex flex-col gap-2.5 md:gap-3 2xl:gap-4">
              <div className="flex flex-col gap-2.5 md:gap-4 2xl:flex-row 2xl:items-center">
                <div className="xmd:text-[1.5rem] text-[1.25rem] font-medium lg:text-[1.875rem] 2xl:text-[2.25rem]">
                  {teamData.teamName}
                </div>
                <div className="block text-[0.875rem] font-normal text-gray-50 md:hidden 2xl:block 2xl:text-[1.75rem]">
                  {teamData.teamCode}
                </div>
              </div>
              <div className="flex flex-col flex-wrap gap-2.5 2xl:flex-row 2xl:gap-6">
                <div className="flex items-center gap-2.5">
                  <EducationIcon className="h-[16px] w-[16px] text-gray-50 md:h-[20px] md:w-[20px] lg:h-[24px] lg:w-[24px] 2xl:h-[32px] 2xl:w-[32px]" />
                  <div className="text-[0.875rem] font-normal text-gray-50 md:text-[1rem] lg:text-[1.5rem]">
                    {teamData.school}
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <MessageIcon className="h-[16px] w-[16px] text-gray-50 md:h-[20px] md:w-[20px] lg:h-[24px] lg:w-[24px] 2xl:h-[32px] 2xl:w-[32px]" />
                  <div className="text-[0.875rem] font-normal text-gray-50 md:text-[1rem] lg:text-[1.5rem]">
                    {teamData.message}
                  </div>
                </div>
              </div>
            </div>

            {!isSubmit && (
              <Link
                href="/register/team"
                className="liquid hidden h-fit w-full items-center justify-between gap-4 rounded-[32px] py-3 pl-6 pr-3 md:flex md:w-auto md:pl-8 md:pr-4 2xl:py-4 2xl:pl-10 2xl:pr-6">
                <span className="text-[1.125rem] font-medium md:text-[1.5rem] 2xl:text-[2rem]">
                  ลงทะเบียนต่อ
                </span>
                <ArrowIcon className="h-6 w-6 md:h-8 md:w-8 2xl:h-10 2xl:w-10" />
              </Link>
            )}
          </div>
        </div>

        <div className="flex w-full flex-wrap items-center justify-between px-0 lg:px-20 2xl:px-40">
          {membersData.map((member, idx) => (
            <Link
              key={idx}
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (!member.info.general.id) return
                setActiveMember(member.role)
              }}
              className={`flex flex-col items-center gap-6 ${
                member.info.general.id ? "cursor-pointer" : "cursor-not-allowed"
              }`}>
              <div className="relative">
                {activeMember === member.role && (
                  <>
                    <div
                      key={activeMember}
                      className="absolute -z-10 h-[80px] w-[80px] rounded-full bg-[#9F83DC] opacity-10 blur-[30px] md:h-[160px] md:w-[160px] md:opacity-70 md:blur-[70px] lg:h-[222px] lg:w-[222px] lg:opacity-60 lg:blur-[100px]"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%) scale(0)",
                        animation: "glow-expand 0.5s forwards",
                      }}
                    />
                    <style>
                      {`
                              @keyframes glow-expand {
                                0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                                100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
                              }
                            `}
                    </style>
                  </>
                )}

                <div className="relative h-[50px] w-[50px] overflow-hidden rounded-full bg-[rgba(0,0,0,0.001)] md:h-[70px] md:w-[70px] lg:h-[80px] lg:w-[80px] 2xl:h-[100px] 2xl:w-[100px]">
                  <img
                    src={member.avatar}
                    alt={member.role}
                    className="absolute bottom-0 left-1/2 z-0 h-4/5 -translate-x-1/2 object-cover"
                  />

                  <div className="pointer-events-none absolute inset-0 z-10 rounded-full shadow-[inset_6.07228px_4.55421px_13.6626px_rgba(237,204,232,0.65)]"></div>
                </div>
                {member.info.general.id && (
                  <CheckIcon className="absolute bottom-0 right-0 h-[20px] w-[20px] text-[#00C951] md:h-[26px] md:w-[26px] lg:h-[30px] lg:w-[30px] 2xl:h-[32px] 2xl:w-[32px]" />
                )}
              </div>
              <div
                className={`hidden text-center text-[1rem] md:block lg:text-[1.25rem] 2xl:text-[1.5rem] ${activeMember === member.role ? "font-normal" : "font-light"}`}>
                {member.role}
              </div>
            </Link>
          ))}
        </div>
        {membersData.map((member, idx) =>
          activeMember === member.role ? (
            <div
              key={idx}
              className="liquid flex w-full flex-col items-start gap-4 rounded-[24px] p-4 md:gap-6 md:rounded-[32px] md:p-6 lg:rounded-[40px] 2xl:px-8"
              style={{
                background: `
                          linear-gradient(
                            #FFFFFF1A -2.48%,
                            #FFFFFF10 29.08%
                          )
                        `,
              }}>
              <div className="w-full justify-start">
                <div className="text-[1.25rem] font-medium md:text-[1.75rem] 2xl:text-[2rem]">
                  {member.role}
                </div>
              </div>

              {/* General info */}
              <div className="flex w-full flex-col justify-center gap-5 md:gap-6">
                <div className="flex flex-col gap-3 md:gap-6">
                  <div className="text-[1.125rem] font-medium md:text-[1.5rem] 2xl:text-[1.75rem]">
                    1. ข้อมูลทั่วไป
                  </div>
                  <div className="flex flex-col gap-3 md:flex-row md:gap-6">
                    <div className="flex min-w-0 flex-1 flex-col gap-2.5 md:gap-3">
                      <div className="text-[1rem] font-light text-gray-50 md:text-[1.125rem] 2xl:text-[1.25rem]">
                        ชื่อ-สกุล
                      </div>
                      <div className="flex gap-3 text-[1rem] font-normal md:text-[1.25rem] 2xl:text-[1.375rem]">
                        <div>{member.info.general.nameTH[0]}</div>
                        <div>{member.info.general.nameTH[1]}</div>
                      </div>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-2.5 md:gap-3">
                      <div className="text-[1rem] font-light text-gray-50 md:text-[1.125rem] 2xl:text-[1.25rem]">
                        Name
                      </div>
                      <div className="flex gap-3 text-[1rem] font-normal md:text-[1.25rem] 2xl:text-[1.375rem]">
                        <div>{member.info.general.nameEN[0]}</div>
                        <div>{member.info.general.nameEN[1]}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 md:flex-row md:gap-6">
                    <div className="flex min-w-0 flex-1 flex-col gap-2.5 md:gap-3">
                      <div className="text-[1rem] font-light text-gray-50 md:text-[1.125rem] 2xl:text-[1.25rem]">
                        อาหารที่แพ้
                      </div>
                      <div className="flex gap-3 text-[1rem] font-normal md:text-[1.25rem] 2xl:text-[1.375rem]">
                        {member.info.general.allergyFood}
                      </div>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-2.5 md:gap-3">
                      <div className="text-[1.25rem] font-light text-gray-50">ประเภทอาหาร</div>
                      <div className="flex gap-3 text-[1rem] font-normal md:text-[1.25rem] 2xl:text-[1.375rem]">
                        {member.info.general.foodType}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 md:flex-row md:gap-6">
                    <div className="flex min-w-0 flex-1 flex-col gap-2.5 md:gap-3">
                      <div className="text-[1rem] font-light text-gray-50 md:text-[1.125rem] 2xl:text-[1.25rem]">
                        ยาที่แพ้
                      </div>
                      <div className="flex gap-3 text-[1rem] font-normal md:text-[1.25rem] 2xl:text-[1.375rem]">
                        {member.info.general.allergyMedicine}
                      </div>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-2.5 md:gap-3">
                      <div className="text-[1rem] font-light text-gray-50 md:text-[1.125rem] 2xl:text-[1.25rem]">
                        โรคประจำตัวและวิธีปฐมพยาบาลเบื้องต้น
                      </div>
                      <div className="flex gap-3 text-[1rem] font-normal md:text-[1.25rem] 2xl:text-[1.375rem]">
                        {member.info.general.chronicDisease}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 md:gap-6">
                  <div className="text-[1.125rem] font-medium md:text-[1.5rem] 2xl:text-[1.75rem]">
                    2. ข้อมูลติดต่อ
                  </div>
                  <div className="flex flex-col gap-3 md:flex-row md:gap-6">
                    <div className="flex min-w-0 flex-col gap-2.5 md:gap-3 lg:flex-1">
                      <div className="text-[1rem] font-light text-gray-50 md:text-[1.125rem] 2xl:text-[1.25rem]">
                        Email
                      </div>
                      <div className="flex gap-3 text-[1rem] font-normal md:text-[1.25rem] 2xl:text-[1.375rem]">
                        {member.info.contact.email}
                      </div>
                    </div>
                    <div className="flex min-w-0 flex-col gap-2.5 md:gap-3 lg:flex-1">
                      <div className="text-[1rem] font-light text-gray-50 md:text-[1.125rem] 2xl:text-[1.25rem]">
                        เบอร์โทรศัพท์
                      </div>
                      <div className="flex gap-3 text-[1rem] font-normal md:text-[1.25rem] 2xl:text-[1.375rem]">
                        {member.info.contact.phone}
                      </div>
                    </div>
                    <div className="flex min-w-0 flex-col gap-2.5 md:gap-3 lg:flex-1">
                      <div className="text-[1rem] font-light text-gray-50 md:text-[1.125rem] 2xl:text-[1.25rem]">
                        ID LINE
                      </div>
                      <div className="flex gap-3 text-[1rem] font-normal md:text-[1.25rem] 2xl:text-[1.375rem]">
                        {member.info.contact.line}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-5 md:gap-6">
                  <div className="text-[1.125rem] font-medium md:text-[1.5rem] 2xl:text-[1.75rem]">
                    3. เอกสาร
                  </div>
                  {member.info.documents.map((doc, i) => (
                    <div
                      key={i}
                      className="flex flex-col justify-center gap-4 md:gap-6 lg:flex-row lg:gap-[50px]">
                      <div className="md:pr-15 flex-1 pr-0 text-[1rem] font-light text-gray-50 md:text-[1.125rem] lg:pr-0 2xl:text-[1.25rem]">
                        {doc.description}
                      </div>
                      <a
                        href={doc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={doc.fileName}
                        className="flex flex-1 gap-2.5 text-[1rem] font-normal md:gap-3 md:text-[1.125rem] lg:text-[1.25rem] 2xl:gap-4 2xl:text-[1.375rem]">
                        <DocumentIcon className="h-[20px] w-[20px] md:h-[24px] md:w-[24px] 2xl:h-[32px] 2xl:w-[32px]" />
                        <div>{doc.fileName}</div>
                        <div className="text-[0.875rem] font-light text-gray-50 md:text-[1rem] 2xl:text-[1.25rem]">
                          {doc.size}
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}
export default TeamDone
