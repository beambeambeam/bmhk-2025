import EducationIcon from "@/components/EducationIcon"
import MessageIcon from "@/components/MessageIcon"
import { orpc } from "@/utils/orpc"
import { useQuery } from "@tanstack/react-query"

function TeamDone() {
  const query = useQuery(orpc.register.all.get.queryOptions())

  if (query.isPending) {
    return
  }

  return (
    <div className="md:px-15 z-50 w-full px-6 pt-8 md:pt-0 lg:px-20 2xl:px-40">
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
            <img
              className="h-[68px] w-[68px] rounded-full md:h-[75px] md:w-[75px] lg:h-[95px] lg:w-[95px] 2xl:h-[100px] 2xl:w-[100px]"
              src={query.data?.team?.image?.url}
              alt={query.data.team?.name}
            />
            <div className="hidden text-[0.875rem] font-normal text-gray-50 md:block 2xl:hidden">?</div>
          </div>
          <div className="flex flex-col gap-2.5 md:gap-3 2xl:gap-4">
            <div className="flex flex-col gap-2.5 md:gap-4 2xl:flex-row 2xl:items-center">
              <div className="xmd:text-[1.5rem] text-[1.25rem] font-medium lg:text-[1.875rem] 2xl:text-[2.25rem]">
                {query.data?.team?.name}
              </div>
              <div className="block text-[0.875rem] font-normal text-gray-50 md:hidden 2xl:block 2xl:text-[1.75rem]">
                ?
              </div>
            </div>
            <div className="flex flex-col flex-wrap gap-2.5 2xl:flex-row 2xl:gap-6">
              <div className="flex items-center gap-2.5">
                <EducationIcon className="h-[16px] w-[16px] text-gray-50 md:h-[20px] md:w-[20px] lg:h-[24px] lg:w-[24px] 2xl:h-[32px] 2xl:w-[32px]" />
                <div className="text-[0.875rem] font-normal text-gray-50 md:text-[1rem] lg:text-[1.5rem]">
                  {query.data?.team?.school}
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageIcon className="h-[16px] w-[16px] text-gray-50 md:h-[20px] md:w-[20px] lg:h-[24px] lg:w-[24px] 2xl:h-[32px] 2xl:w-[32px]" />
                <div className="text-[0.875rem] font-normal text-gray-50 md:text-[1rem] lg:text-[1.5rem]">
                  {query.data?.team?.quote}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-wrap justify-between px-0 lg:px-20 2xl:px-40"></div>
      </div>
    </div>
  )
}
export default TeamDone
