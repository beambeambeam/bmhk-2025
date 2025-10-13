import { DownloadBtn } from "./download-btn"

function LandingSection() {
  const descriptions = {
    base: (
      <>
        โครงการนี้เปิดโอกาสให้นักเรียนมัธยมปลาย
        <br />
        และนักศึกษาอาชีวะระดับปวช. หรือเทียบเท่า ได้เข้าร่วม
        <br />
        การแข่งขันเขียนโปรแกรมด้วยภาษา C/C++ ในรูปแบบทีม
        <br />
        เพื่อเสริมสร้างทักษะการเขียนโปรแกรม พร้อมทั้งฝึก
        <br />
        การทำงานร่วมกัน และเก็บเกี่ยวประสบการณ์จาก
        <br />
        การลงสนามจริง
      </>
    ),
    lg: (
      <>
        โครงการนี้เปิดโอกาสให้นักเรียนมัธยมปลาย และนักศึกษาอาชีวะระดับปวช. หรือเทียบเท่า ได้เข้าร่วมการแข่งขัน
        <br />
        เขียนโปรแกรมด้วยภาษา C/C++ ในรูปแบบทีม เพื่อเสริมสร้างทักษะการเขียนโปรแกรม พร้อมทั้งฝึกการทำงานร่วมกัน
        <br />
        และเก็บเกี่ยวประสบการณ์จากการลงสนามจริง
      </>
    ),
    xl2: (
      <>
        โครงการนี้เปิดโอกาสให้นักเรียนมัธยมปลาย และนักศึกษาอาชีวะระดับปวช. หรือเทียบเท่า
        ได้เข้าร่วมการแข่งขันเขียนโปรแกรมด้วยภาษา C/C++
        <br />
        ในรูปแบบทีม เพื่อเสริมสร้างทักษะการเขียนโปรแกรม พร้อมทั้งฝึกการทำงานร่วมกัน และเก็บเกี่ยวประสบการณ์
        จากการลงสนามจริง
      </>
    ),
  }
  return (
    <div className="relative mt-[143px] flex h-[852px] w-full flex-col items-center justify-center lg:h-[834px] 2xl:h-[1080px]">
      <div className="lg:absolute lg:right-[30px] lg:top-[30px] 2xl:right-[40px] 2xl:top-[40px]">
        <img
          src="/static/hero/landing/kmutt-eng-smovidva-engoph-cpe-desktop.webp"
          className="hidden 2xl:block"
        />
        <img
          src="/static/hero/landing/kmutt-eng-smovidva-engoph-cpe-tablet.webp"
          className="hidden lg:block 2xl:hidden"
        />
        <img
          src="/static/hero/landing/kmutt-eng-smovidva-engoph-cpe-mobile.webp"
          className="mb-10 block lg:hidden"
        />
      </div>

      <div className="mt-[-91.26px] size-[370.7310485839844px] lg:mt-[-104.37px] lg:size-[606.8907470703125px] 2xl:mt-[-135px] 2xl:size-[785px]">
        <img
          src="/static/hero/landing/logo-final.webp"
          alt="logo"
          className="mx-auto h-full w-full object-cover object-bottom"
        />
      </div>

      <div className="flex max-w-[345px] flex-col items-center gap-6 text-center lg:max-w-[971px] 2xl:max-w-[1552px] 2xl:gap-8">
        <h1 className="text-[19px] font-medium leading-[1.4] text-white lg:text-[28px] 2xl:text-[32px]">
          โครงการแข่งขันแก้ไขปัญหาด้วยการเขียน
          <br className="lg:hidden" />
          โปรแกรมคอมพิวเตอร์ ประจำปี 2568
        </h1>
        <p className="block whitespace-nowrap text-base font-light leading-[1.5] text-gray-50 lg:hidden lg:text-xl 2xl:text-[26px]">
          {descriptions.base}
        </p>

        <p className="hidden text-base font-light leading-[1.5] text-gray-50 lg:block lg:text-xl 2xl:hidden 2xl:text-[26px]">
          {descriptions.lg}
        </p>

        <p className="hidden whitespace-nowrap text-base font-light leading-[1.5] text-gray-50 lg:text-xl 2xl:block 2xl:text-[26px]">
          {descriptions.xl2}
        </p>
        <DownloadBtn href="/teams/certs" />
      </div>
    </div>
  )
}
export default LandingSection
