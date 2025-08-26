import { useAllRegisterStatus, type RegisterStatusEnum } from "@/app/(protected)/_components/status/context"
import { cn } from "@workspace/ui/lib/utils"

interface RegisterBlobProps {
  name: string
  imageUrl: string
  pattern: string
  status: RegisterStatusEnum
}

function RegisterStatus() {
  const registerStatus = useAllRegisterStatus()

  const NODES: RegisterBlobProps[] = [
    {
      name: "ทีม",
      imageUrl: "d",
      pattern: "/team/*",
      status: registerStatus.team,
    },
    {
      name: "อาจาร์ยที่ปรึกษา",
      imageUrl: "d",
      pattern: "/adviser/*",
      status: registerStatus.adviser,
    },
    {
      name: "ผู้เข้าแข่งขันคนที่ 1",
      imageUrl: "d",
      pattern: "/1/*",
      status: registerStatus.member1,
    },
    {
      name: "ผู้เข้าแข่งขันคนที่ 2",
      imageUrl: "d",
      pattern: "/2/*",
      status: registerStatus.member2,
    },
    {
      name: "ผู้เข้าแข่งขันคนที่ 3",
      imageUrl: "d",
      pattern: "/3/*",
      status: registerStatus.member3,
    },
  ]

  return (
    <div className="relative w-full">
      <div className="relative z-0 flex w-full justify-between">
        {NODES.filter((node) => node.status !== "NOT_HAVE").map((node, index, arr) => (
          <RegisterBlob index={index} total={arr.length} {...node} key={node.pattern} />
        ))}
      </div>
      <div className="relative z-0 mt-4 flex w-full justify-between">
        {NODES.filter((node) => node.status !== "NOT_HAVE").map((node) => (
          <div key={node.pattern} className="flex w-full items-center justify-center">
            <div className={cn("h-full max-h-[0.5rem] min-h-[0.5rem] w-full bg-transparent")} />
            <div className="whitespace-nowrap text-center text-2xl font-medium text-white">{node.name}</div>
            <div className={cn("h-full max-h-[0.5rem] min-h-[0.5rem] w-full bg-transparent")} />
          </div>
        ))}
      </div>
    </div>
  )
}

const RegisterBlob = (
  props: RegisterBlobProps & {
    index: number
    total: number
  }
) => (
  <div className="flex w-full items-center justify-center">
    <div
      className={cn(
        "h-full max-h-[0.5rem] min-h-[0.5rem] w-full",
        props.index !== 0 ? "bg-[#DFDFDF4D]" : "bg-transparent"
      )}
    />

    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <div className="liquid flex size-[70px] items-center justify-center rounded-full backdrop-blur-2xl lg:size-[72px] 2xl:size-[100px]">
          d
        </div>
        {props.status === "DONE" && (
          <div className="absolute -bottom-0.5 -right-0.5 flex size-8 items-center justify-center rounded-full bg-green-500">
            <svg className="size-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
    <div
      className={cn(
        "h-full max-h-[0.5rem] min-h-[0.5rem] w-full",
        props.index !== props.total - 1 ? "bg-[#DFDFDF4D]" : "bg-transparent"
      )}
    />
  </div>
)

export default RegisterStatus
