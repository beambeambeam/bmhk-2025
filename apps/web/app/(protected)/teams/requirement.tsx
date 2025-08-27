"use client"

import ArrowIcon from "@/components/ArrowIcon"

export default function Requirement() {
  return (
    <div className="md:px-15 flex w-full flex-col items-center gap-8 px-6 pt-8 md:pt-0 lg:px-20 2xl:gap-10 2xl:px-40">
      <div className="flex w-full flex-col items-center justify-between gap-6 md:flex-row md:gap-0">
        <h1 className="text-[1.5rem] font-medium md:text-[2rem] 2xl:text-[3rem]">ลงทะเบียนเข้าแข่งขัน</h1>
        <a
          href="/register/team"
          className="liquid flex w-full items-center justify-between gap-4 rounded-[32px] py-3 pl-6 pr-3 md:w-auto md:pl-8 md:pr-4 2xl:py-4 2xl:pl-10 2xl:pr-6">
          <span className="text-[1.125rem] font-medium md:text-[1.5rem] 2xl:text-[2rem]">เริ่มลงทะเบียน</span>
          <ArrowIcon className="h-6 w-6 md:h-8 md:w-8 2xl:h-10 2xl:w-10" />
        </a>
      </div>

      {/* Required Documents */}
      <div className="liquid flex w-full flex-col items-center gap-6 rounded-[24px] p-4 md:items-start md:rounded-[32px] md:p-6 2xl:gap-10 2xl:rounded-[40px] 2xl:p-8">
        <h2 className="text-[1.25rem] font-medium md:text-[1.75rem] 2xl:text-[2rem]">เอกสารที่ต้องใช้</h2>

        {/* สำหรับอาจารย์ */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-10">
          <img
            className="h-[100px] w-[100px] md:h-[150px] md:w-[150px] lg:h-[170px] lg:w-[170px] 2xl:h-[200px] 2xl:w-[200px]"
            src="/static/teams/teacher.webp"
            alt="teachers"
          />
          <div className="flex flex-col items-center gap-6 md:items-start">
            <h3 className="text-[1.125rem] font-medium md:text-[1.5rem] 2xl:text-[1.75rem]">สำหรับอาจารย์</h3>
            <ol className="flex list-decimal flex-col gap-3 pl-6 md:gap-5">
              <li className="text-[1rem] font-light md:text-[1.125rem] lg:text-[1.25rem] lg:font-normal 2xl:text-[1.375rem]">
                สำเนาบัตรประจำตัวประชาชน หรือบัตรประจำตัวสำหรับ บุคคลที่ไม่ใช่สัญชาติไทย พร้อมเซ็นสำเนาถูกต้อง
                (เฉพาะด้านหน้า)
              </li>
              <li className="text-[1rem] font-light md:text-[1.125rem] lg:text-[1.25rem] lg:font-normal 2xl:text-[1.375rem]">
                เอกสารแสดงสถานภาพการเป็นอาจารย์ประจำ ในสถานศึกษา เช่น บัตรประจำตัวอาจารย์ บัตรข้าราชการครู
                หรือหนังสือรับรองจากสถานศึกษา
              </li>
            </ol>
          </div>
        </div>

        {/* สำหรับผู้เข้าแข่งขัน */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-10">
          <img
            className="h-[100px] w-[100px] md:h-[150px] md:w-[150px] lg:h-[170px] lg:w-[170px] 2xl:h-[200px] 2xl:w-[200px]"
            src="/static/teams/student1.webp"
            alt="participants"
          />
          <div className="flex flex-col items-center gap-6 md:items-start">
            <h3 className="text-[1.125rem] font-medium md:text-[1.5rem] 2xl:text-[1.75rem]">
              สำหรับผู้เข้าแข่งขัน
            </h3>
            <ol className="flex list-decimal flex-col gap-3 pl-6 md:gap-5">
              <li className="text-[1rem] font-light md:text-[1.125rem] lg:text-[1.25rem] lg:font-normal 2xl:text-[1.375rem]">
                รูปถ่ายนักเรียนหน้าตรง ขนาด 1.5 นิ้ว
              </li>
              <li className="text-[1rem] font-light md:text-[1.125rem] lg:text-[1.25rem] lg:font-normal 2xl:text-[1.375rem]">
                สำเนาบัตรประจำตัวประชาชน หรือบัตรประจำตัวสำหรับ บุคคลที่ไม่ใช่สัญชาติไทย พร้อมเซ็นสำเนาถูกต้อง
                (เฉพาะด้านหน้า)
              </li>
              <li className="text-[1rem] font-light md:text-[1.125rem] lg:text-[1.25rem] lg:font-normal 2xl:text-[1.375rem]">
                สำเนา ปพ.7 (ระเบียนแสดงผลการเรียน) ฉบับจริง
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
