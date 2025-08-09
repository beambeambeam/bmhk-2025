import { AwardData } from "./index"

interface EachAwardProps {
  data: AwardData
}

export function EachAwardForTopRow({ data }: EachAwardProps) {
  if (data.topRowIsMain)
    return (
      <div className="flex h-[530px] w-[480px] flex-col items-center gap-10 p-2.5">
        <img
          src={data.imageSrc}
          width={data.imageDimension.width}
          height={data.imageDimension.height}
          alt={data.title}
        />
        <div className="flex flex-col gap-6">
          <div className="mx-auto inline-flex w-fit flex-col items-center justify-center gap-10 rounded-[40px] px-8 py-6 outline-1 outline-offset-[-1px]">
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
        />
        <div className="flex flex-col gap-6">
          <div className="inline-flex flex-col items-center justify-center gap-10 rounded-[40px] px-8 py-6 outline-1 outline-offset-[-1px]">
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
      />
      <div className="flex flex-col gap-6">
        <div className="text-subheader-2">{data.title}</div>
        <div className="text-body-2">{data.description}</div>
      </div>
    </div>
  )
}
