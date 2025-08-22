import { Heading } from "@/components/heading"

const qualificationData = [
  {
    title: "การจัดทีม",
    description: "กำหนดให้นักเรียน นักศึกษา สมัครเข้าแข่งขันเป็นทีม ทีมละ 2-3 คน",
    imageSrc: "/static/qualification/team.png",
  },
  {
    title: "อาจารย์ที่ปรึกษา",
    description: "ต้องมีอาจารย์ที่ปรึกษา ทีมละ 1 คน โดยต้องเป็นอาจารย์จากสถานศึกษานั้น ๆ",
    imageSrc: "/static/qualification/teacher.png",
  },
  {
    title: "จำนวนทีมต่อสถานศึกษา",
    description: "ในแต่ละสถานศึกษาส่งทีมเข้าแข่งขันได้ไม่เกิน 2 ทีม",
    imageSrc: "/static/qualification/school.png",
  },
]

function QualificationSector() {
  return (
    <div className="flex h-[1080px] w-full flex-col justify-center gap-8 px-6 md:gap-10 md:px-20 lg:gap-[60px] lg:px-[160px]">
      <Heading text="คุณสมบัติผู้สมัคร" />
      <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-8 lg:gap-10">
        {qualificationData.map((item) => (
          <div
            key={item.title}
            className="flex w-[345px] flex-col items-center justify-center gap-4 md:w-[323.33px] md:gap-6 lg:w-[415px]">
            <div className="relative">
              <div className="relative size-[160px] overflow-hidden rounded-full bg-[rgba(0,0,0,0.001)] md:size-[240px] lg:size-[330px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageSrc}
                  alt=""
                  className="absolute bottom-0 left-1/2 h-4/5 -translate-x-1/2 object-cover"
                />
                <div className="pointer-events-none absolute inset-0 z-10 rounded-full shadow-[inset_6.07228px_4.55421px_13.6626px_rgba(237,204,232,0.65)]"></div>
              </div>
              <div className="liquid text-subheader-1 absolute -bottom-6 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-3xl px-6 py-3 text-white backdrop-blur-md md:-bottom-8 md:rounded-[30px] md:px-6 md:py-4 lg:-bottom-10 lg:rounded-[40px] lg:px-8 lg:py-6">
                {item.title}
              </div>
            </div>
            <p className="text-body-2 mt-10 text-balance text-center text-white">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default QualificationSector
