import { Heading } from "@/components/heading"
import IconCircle from "@/components/iconCircle"
import MapEmbed from "@/components/mapEmbed"

function Contact() {
  return (
    <div className="2xl:gap-15 flex w-full flex-col content-center items-center justify-center gap-8 px-6 sm:px-20 lg:max-h-[834] lg:gap-10 2xl:max-h-[1080] 2xl:px-40">
      <Heading text="ติดต่อทีมงาน" />
      <div className="flex w-full gap-10 2xl:max-w-[1326]">
        <div className="flex w-full flex-row justify-center gap-8 2xl:gap-10">
          <div className="flex flex-1 flex-col gap-6 lg:gap-8 2xl:gap-10">
            {" "}
            {/* Left Section */}
            <div className="flex flex-col gap-6 md:flex-row lg:gap-8">
              <div className="flex min-w-0 flex-1 flex-col gap-4">
                {" "}
                {/* Contact */}
                <div className="flex items-center gap-4">
                  <IconCircle className="h-[50px] w-[50px] flex-shrink-0 2xl:h-[60px] 2xl:w-[60px]">
                    <img
                      src="/static/icon/Basic.svg"
                      alt="Staff Icon"
                      className="h-[30px] w-[30px] 2xl:h-9 2xl:w-9"
                    />
                  </IconCircle>
                  <div className="text-body-1 text-[18px] text-[var(--color-gray-50)] lg:text-[20px] 2xl:text-[24px]">
                    คำถามทั่วไป
                  </div>
                </div>
                <div className="text-body-1 text-[18px] lg:text-[20px] 2xl:text-[24px]">
                  ชญานิษฐ์ กันตนฤมิตรกุล (ชิชา)
                </div>
                <div className="text-body-1 text-[18px] lg:text-[20px] 2xl:text-[24px]">099 197 9119</div>
                <div className="text-body-1 whitespace-normal break-words text-[18px] lg:text-[20px] 2xl:text-[24px]">
                  chayanit.kunt@mail.kmutt.ac.th
                </div>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-4">
                {" "}
                {/* Contact */}
                <div className="flex items-center gap-4">
                  <IconCircle className="h-[50px] w-[50px] flex-shrink-0 2xl:h-[60px] 2xl:w-[60px]">
                    <img
                      src="/static/icon/Code.svg"
                      alt="Staff Icon"
                      className="h-[30px] w-[30px] 2xl:h-9 2xl:w-9"
                    />
                  </IconCircle>
                  <div className="text-body-1 text-[18px] text-[var(--color-gray-50)] lg:text-[20px] 2xl:text-[24px]">
                    คำถามด้านวิชาการ
                  </div>
                </div>
                <div className="text-body-1 text-[16px] lg:text-[20px] 2xl:text-[24px]">
                  ภูริณัฐ พลอาสา (นาโน)
                </div>
                <div className="text-body-1 text-[18px] lg:text-[20px] 2xl:text-[24px]">081 837 0772</div>
                <div className="text-body-1 whitespace-normal break-words text-[18px] lg:text-[20px] 2xl:text-[24px]">
                  phurinat.pola@kmutt.ac.th
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {" "}
              {/* Contact */}
              <div className="flex items-center gap-4">
                <IconCircle className="h-[50px] w-[50px] flex-shrink-0 2xl:h-[60px] 2xl:w-[60px]">
                  <img
                    src="/static/icon/Address.svg"
                    alt="Address Icon"
                    className="h-[30px] w-[30px] 2xl:h-9 2xl:w-9"
                  />
                </IconCircle>
                <div className="text-body-1 text-[18px] text-[var(--color-gray-50)] lg:text-[20px] 2xl:text-[24px]">
                  ภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์
                </div>
              </div>
              <div className="text-body-1 text-[16px] lg:text-[20px] 2xl:text-[24px]">
                อาคารวิศววัฒนะ ชั้น 10 เลขที่ 126 ถ.ประชาอุทิศ แขวงบางมด เขตทุ่งครุ กรุงเทพฯ 10140
              </div>
            </div>
            <div className="flex gap-6">
              <a href={siteConfig.links.facebook} target="_blank" rel="noopener noreferrer">
                <IconCircle className="h-[60px] w-[60px] flex-shrink-0 lg:h-[70px] lg:w-[70px] 2xl:h-[90px] 2xl:w-[90px]">
                  <img src="/static/icon/Facebook.svg" alt="Facebook Icon" />
                </IconCircle>
              </a>
              <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer">
                <IconCircle className="h-[60px] w-[60px] flex-shrink-0 lg:h-[70px] lg:w-[70px] 2xl:h-[90px] 2xl:w-[90px]">
                  <img src="/static/icon/Instagram.svg" alt="Instagram Icon" />
                </IconCircle>
              </a>
            </div>
          </div>
          <MapEmbed className="hidden flex-shrink-0 md:w-[384px] lg:block 2xl:w-[506px]" />{" "}
          {/* Right Section */}
        </div>
      </div>
    </div>
  )
}

export default Contact
