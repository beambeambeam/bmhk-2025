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
      <div className="flex max-h-[530px] flex-col items-center gap-10 p-2.5">
        <img
          src={data.imageSrc}
          width={data.imageDimension.width}
          height={data.imageDimension.height}
          alt={data.title}
          className="md:size-65 size-40 xl:size-[335px]"
        />
        <div className="flex flex-col gap-6">
          <div
            className={`${data.lqClassName} mx-auto inline-flex w-fit flex-col items-center justify-center gap-10 rounded-[40px] px-8 py-6 outline-1 outline-offset-[-1px] outline-white/10`}>
            <div className="text-subheader-2 justify-center self-stretch text-center">{data.title}</div>
          </div>
          <div className="flex flex-col gap-x-[0.5rem] xl:flex-row">
            <div className="text-body-1 justify-center text-center">{data.description}</div>
            <div className="text-body-1 justify-center text-center">พร้อมโล่เกียรติคุณ</div>
          </div>
        </div>
      </div>
    )
  else
    return (
      <div className="flex max-h-[441px] w-[325px] flex-col items-center gap-10 py-2.5 xl:w-[480px]">
        <img
          src={data.imageSrc}
          width={data.imageDimension.width}
          height={data.imageDimension.height}
          alt={data.title}
          className="md:size-50 size-40 xl:size-[250px]"
        />
        <div className="flex flex-col gap-6">
          <div
            className={`${data.lqClassName} flex flex-col items-center justify-center gap-10 self-stretch rounded-[40px] py-6 outline-1 outline-offset-[-1px] outline-white/10`}>
            <div className="text-subheader-2 justify-center self-stretch text-center">{data.title}</div>
          </div>
          <div className="flex flex-col gap-x-[0.5rem] xl:flex-row">
            <div className="text-body-3 justify-center text-center">{data.description}</div>
            <div className="text-body-3 justify-center text-center">พร้อมโล่เกียรติคุณ</div>
          </div>
        </div>
      </div>
    )
}
export function EachAwardForBottomRow({ data }: EachAwardProps) {
  return (
    <div className="flex w-[325px] items-center gap-10 md:w-[380px] xl:w-[480px]">
      <img
        src={data.imageSrc}
        width={data.imageDimension.width}
        height={data.imageDimension.height}
        alt={data.title}
        className="size-25 xl:size-35"
      />
      <div className="flex flex-col gap-6">
        <div className="text-subheader-2">{data.title}</div>
        <div className="text-body-3">{data.description}</div>
      </div>
    </div>
  )
}
