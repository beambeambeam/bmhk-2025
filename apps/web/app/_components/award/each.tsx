import { AwardData, TopRowAwardData } from "./index"

interface EachAwardProps {
  data: AwardData
}

interface TopRowAwardProps {
  data: TopRowAwardData
}

export function EachAwardForTopRow({ data }: TopRowAwardProps) {
  if (data.topRowIsMain)
    return (
      <div className="flex h-[530px] w-[480px] flex-col items-center gap-10 p-2.5">
        <img
          src={data.imageSrc}
          width={data.imageDimension.width}
          height={data.imageDimension.height}
          alt={data.title}
          className="md:size-65 size-40 lg:size-[335px]"
        />
        <div className="flex flex-col gap-6">
          <div
            className={`${data.lqClassName} mx-auto inline-flex w-fit flex-col items-center justify-center gap-10 rounded-[40px] px-8 py-6 outline-1 outline-offset-[-1px] outline-white/10`}>
            <div className="text-subheader-2 justify-center self-stretch text-center">{data.title}</div>
          </div>
          <div className="text-body-3 justify-center text-center">{data.description}</div>
        </div>
      </div>
    )
  else
    return (
      <div className="flex h-[441px] w-[480px] flex-col items-center gap-10 p-2.5">
        <img
          src={data.imageSrc}
          width={data.imageDimension.width}
          height={data.imageDimension.height}
          alt={data.title}
          className="md:size-50 size-40 lg:size-[250px]"
        />
        <div className="flex flex-col gap-6">
          <div
            className={`${data.lqClassName} inline-flex flex-col items-center justify-center gap-10 rounded-[40px] px-8 py-6 outline-1 outline-offset-[-1px] outline-white/10`}>
            <div className="text-subheader-2 justify-center self-stretch text-center">{data.title}</div>
          </div>
          <div className="text-body-3 justify-center text-center">{data.description}</div>
        </div>
      </div>
    )
}
export function EachAwardForBottomRow({ data }: EachAwardProps) {
  return (
    <div className="flex items-center gap-10">
      <img
        src={data.imageSrc}
        width={data.imageDimension.width}
        height={data.imageDimension.height}
        alt={data.title}
        className="size-25 lg:size-35"
      />
      <div className="flex flex-col gap-6">
        <div className="text-subheader-2">{data.title}</div>
        <div className="text-body-2">{data.description}</div>
      </div>
    </div>
  )
}
