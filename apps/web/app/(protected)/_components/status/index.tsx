import { useAllRegisterStatus, type RegisterStatusEnum } from "@/app/(protected)/_components/status/context"
import { cn } from "@workspace/ui/lib/utils"
import { usePathname } from "next/navigation"

interface RegisterBlobProps {
  name: string
  pattern: string
  status: RegisterStatusEnum
  imgUrl: string
}

function RegisterStatus() {
  const registerStatus = useAllRegisterStatus()
  const pathName = usePathname()

  const NODES: RegisterBlobProps[] = [
    {
      name: "ทีม",

      pattern: "/team/*",
      status: registerStatus.team,
      imgUrl: "/static/teams/team.webp",
    },
    {
      name: "อาจารย์ที่ปรึกษา",

      pattern: "/adviser/*",
      status: registerStatus.adviser,
      imgUrl: "/static/teams/teacher.webp",
    },
    {
      name: "ผู้เข้าแข่งขันคนที่ 1",

      pattern: "/1/*",
      status: registerStatus.member1,
      imgUrl: "/static/teams/student1.webp",
    },
    {
      name: "ผู้เข้าแข่งขันคนที่ 2",

      pattern: "/2/*",
      status: registerStatus.member2,
      imgUrl: "/static/teams/student2.webp",
    },
    {
      name: "ผู้เข้าแข่งขันคนที่ 3",

      pattern: "/3/*",
      status: registerStatus.member3,
      imgUrl: "/static/teams/student3.webp",
    },
  ]

  return (
    <div className="relative w-full">
      <div className="relative z-0 flex w-full justify-between">
        {NODES.filter((node) => node.status !== "NOT_HAVE").map((node, index, arr) => {
          const isCurrentCompleted = node.status === "DONE"
          const isPreviousCompleted = index > 0 ? arr[index - 1]?.status === "DONE" : false
          const isNextCompleted = index < arr.length - 1 ? arr[index + 1]?.status === "DONE" : false
          const isCurrentPath = pathName.includes(node.pattern.replace("/*", ""))

          const isNextCurrentPath =
            index < arr.length - 1
              ? pathName.includes((arr[index + 1]?.pattern || "").replace("/*", ""))
              : false

          const activeLeft = index > 0 && (isCurrentPath || (isCurrentCompleted && isPreviousCompleted))
          const activeRight =
            index < arr.length - 1 && (isNextCurrentPath || (isCurrentCompleted && isNextCompleted))

          return (
            <RegisterBlob
              activeLeft={activeLeft}
              activeRight={activeRight}
              index={index}
              total={arr.length}
              {...node}
              key={node.pattern}
            />
          )
        })}
      </div>
      <div className="relative z-0 mt-4 hidden w-full justify-between md:flex">
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
    activeLeft: boolean
    activeRight: boolean
  }
) => (
  <div className="flex w-full items-center justify-center">
    <div
      className={cn(
        "h-full max-h-[0.5rem] min-h-[0.5rem] w-full",
        props.activeLeft ? "bg-[#9F83DC]" : props.index !== 0 ? "bg-[#DFDFDF4D]" : "bg-transparent"
      )}
    />

    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        {typeof window !== "undefined" &&
          window.location.pathname.includes(props.pattern.replace("/*", "")) && (
            <>
              <div
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

        <div className="relative flex size-[70px] items-center justify-center overflow-hidden rounded-full bg-[rgba(0,0,0,0.001)] backdrop-blur-2xl lg:size-[72px] 2xl:size-[100px]">
          <img
            src={props.imgUrl}
            className="absolute bottom-0 left-1/2 z-0 h-4/5 -translate-x-1/2 object-cover"
          />
          <div className="pointer-events-none absolute inset-0 z-10 rounded-full shadow-[inset_6.07228px_4.55421px_13.6626px_rgba(237,204,232,0.65)]"></div>
        </div>

        {props.status === "DONE" && (
          <>
            <div className="absolute -bottom-0.5 -right-0.5 flex size-8 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/50">
              <svg className="size-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </>
        )}
      </div>
    </div>
    <div
      className={cn(
        "h-full max-h-[0.5rem] min-h-[0.5rem] w-full",
        props.activeRight
          ? "bg-[#9F83DC]"
          : props.index !== props.total - 1
            ? "bg-[#DFDFDF4D]"
            : "bg-transparent"
      )}
    />
  </div>
)

export default RegisterStatus
