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
          <div className="inline-flex flex-col items-center justify-center gap-10 rounded-[40px] px-8 py-6 outline-1 outline-offset-[-1px]">
            <div className="justify-center self-stretch text-center text-3xl font-medium leading-10">
              {data.title}
            </div>
          </div>
          <div className="justify-center text-center text-xl font-light">{data.description}</div>
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
            <div className="justify-center self-stretch text-center text-3xl font-medium leading-10">
              {data.title}
            </div>
          </div>
          <div className="justify-center text-center text-xl font-light">{data.description}</div>
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
        <div className="text-3xl font-medium leading-10">{data.title}</div>
        <div className="text-xl font-light leading-loose">{data.description}</div>
      </div>
    </div>
  )
}
