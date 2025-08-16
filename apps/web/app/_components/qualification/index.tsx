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
    <div className="flex h-[1080px] w-full flex-col gap-8 px-6 md:gap-10 md:px-20 lg:gap-[60px] lg:px-[160px]">
      <Heading text="คุณสมบัติผู้สมัคร" />
      <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-8 lg:gap-10">
        {qualificationData.map((item) => (
          <div key={item.title} className="flex w-[415px] flex-col items-center justify-center gap-6">
            <div className="relative">
              <div className="relative size-[330px] overflow-hidden rounded-full bg-[rgba(0,0,0,0.001)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageSrc}
                  alt=""
                  className="absolute left-1/2 top-1/2 h-[260px] -translate-x-1/2 -translate-y-1/2 object-cover"
                />
                <div className="pointer-events-none absolute inset-0 z-10 rounded-full shadow-[inset_6.07228px_4.55421px_13.6626px_rgba(237,204,232,0.65)]"></div>
              </div>
              <div className="liquid text-subheader-1 absolute -bottom-10 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-[40px] px-8 py-6 text-white backdrop-blur-md">
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
