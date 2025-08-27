import { AwardData, TopRowAwardData } from "./index"

interface EachAwardProps {
  data: AwardData
}

interface TopRowAwardProps {
  data: TopRowAwardData
}

export function EachAwardForTopRow({ data }: TopRowAwardProps) {
  const glowColor = data.glowColor // hex or rgb string

  if (data.topRowIsMain)
    return (
      <div
        className="group relative isolate flex max-h-[530px] flex-col items-center gap-10 p-2.5 before:absolute before:-inset-14 before:-z-10 before:rounded-[48px] before:opacity-0 before:blur-3xl before:transition before:duration-500 before:ease-out before:content-[''] hover:before:scale-105 hover:before:opacity-65"
        style={{
          // radial glow with supplied color
          ["--glow-color" as any]: glowColor,
          background: "transparent",
        }}>
        <img
          src={data.imageSrc}
          width={data.imageDimension.width}
          height={data.imageDimension.height}
          alt={data.title}
          className="lg:size-65 size-40 2xl:size-[335px]"
        />

        <div className="flex flex-col gap-6">
          <div
            className={`${data.lqClassName} mx-auto inline-flex w-fit flex-col items-center justify-center gap-10 rounded-[24px] px-6 py-3 outline-1 outline-offset-[-1px] outline-white/10 backdrop-blur-3xl lg:rounded-[40px] 2xl:px-8 2xl:py-6`}>
            <div className="text-subheader-2 justify-center self-stretch text-center">{data.title}</div>
          </div>
          <div className="flex flex-col gap-x-[0.5rem] 2xl:flex-row">
            <div className="text-body-1 justify-center whitespace-nowrap text-center">{data.description}</div>
            <div className="text-body-1 justify-center whitespace-nowrap text-center">พร้อมโล่เกียรติคุณ</div>
          </div>
        </div>
      </div>
    )
  else
    return (
      <div
        className="group relative isolate flex max-h-[441px] w-[325px] flex-col items-center gap-10 py-2.5 before:absolute before:-inset-12 before:-z-10 before:rounded-[48px] before:opacity-0 before:blur-3xl before:transition before:duration-500 before:ease-out before:content-[''] hover:before:scale-105 hover:before:opacity-60 2xl:w-[480px]"
        style={{
          ["--glow-color" as any]: glowColor,
        }}>
        <img
          src={data.imageSrc}
          width={data.imageDimension.width}
          height={data.imageDimension.height}
          alt={data.title}
          className="lg:size-50 size-40 2xl:size-[250px]"
        />

        <div className="flex flex-col gap-6">
          <div
            className={`${data.lqClassName} mx-auto inline-flex w-fit flex-col items-center justify-center gap-10 self-stretch rounded-[24px] px-6 py-3 outline-1 outline-offset-[-1px] outline-white/10 backdrop-blur-3xl lg:rounded-[40px] 2xl:hidden 2xl:px-8 2xl:py-6`}>
            <div className="text-subheader-2 justify-center self-stretch text-center">
              {data.title.includes("รอง") ? data.title.replace("รางวัล", "") : data.title}
            </div>
          </div>
          <div
            className={`${data.lqClassName} mx-auto hidden w-fit flex-col items-center justify-center gap-10 self-stretch rounded-[24px] px-6 py-3 outline-1 outline-offset-[-1px] outline-white/10 backdrop-blur-3xl lg:rounded-[40px] 2xl:flex 2xl:px-8 2xl:py-6`}>
            <div className="text-subheader-2 justify-center self-stretch text-center">{data.title}</div>
          </div>
          <div className="flex flex-col gap-x-[0.5rem] 2xl:flex-row">
            <div className="text-body-3 justify-center text-center">{data.description}</div>
            <div className="text-body-3 justify-center text-center">พร้อมโล่เกียรติคุณ</div>
          </div>
        </div>
      </div>
    )
}

export function EachAwardForBottomRow({ data }: EachAwardProps) {
  const glowColor = data.glowColor // hex or rgb string

  return (
    <div className="group flex w-[325px] items-center gap-10 lg:w-[380px] 2xl:w-[480px]">
      <div
        className="group relative isolate before:absolute before:-inset-10 before:-z-10 before:rounded-[32px] before:opacity-0 before:blur-3xl before:transition before:duration-500 before:ease-out before:content-[''] hover:before:scale-105 group-hover:before:opacity-45"
        style={{
          ["--glow-color" as any]: glowColor,
        }}>
        <img
          src={data.imageSrc}
          width={data.imageDimension.width}
          height={data.imageDimension.height}
          alt={data.title}
          className="size-25 2xl:size-35"
        />
      </div>

      <div className="flex flex-col gap-6">
        <div className="text-subheader-2">{data.title}</div>
        <div className="text-body-3">{data.description}</div>
      </div>
    </div>
  )
}
