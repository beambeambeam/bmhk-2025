import { Heading } from "@/components/heading"
import IconCircle from "@/components/iconCircle"
import MapEmbed from "@/components/mapEmbed"
import { siteConfig } from "@/config/site"

function Contact() {
  return (
    <div className="2xl:gap-15 flex w-full flex-col content-center items-center justify-center gap-8 px-6 sm:px-20 lg:max-h-[834] lg:gap-10 2xl:max-h-[1080] 2xl:px-40">
      <Heading text="ติดต่อทีมงาน" />
      <div className="flex w-full gap-10 2xl:max-w-[1326]">
        <div className="2xl:gap-18 flex w-full flex-row justify-center gap-8">
          <div className="flex flex-1 flex-col gap-6 lg:gap-8 2xl:gap-10">
            {" "}
            {/* Left Section */}
            <div className="flex flex-col gap-6 md:flex-row lg:gap-8">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <IconCircle className="h-[50px] w-[50px] flex-shrink-0 2xl:h-[60px] 2xl:w-[60px]">
                  <img
                    src="/static/icon/Facebook.svg"
                    alt="Facebook Icon"
                    className="h-[30px] w-[30px] 2xl:h-9 2xl:w-9"
                  />
                </IconCircle>
                <div className="text-body-1 text-[18px] text-[var(--color-gray-50)] lg:text-[20px] 2xl:text-[24px]">
                  <a
                    href="https://www.facebook.com/BangmodHackathon"
                    target="_blank"
                    rel="noopener,noreferrer"
                    className="hover:underline">
                    Bangmod Hackathon 2025
                  </a>
                </div>
              </div>
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <IconCircle className="h-[50px] w-[50px] flex-shrink-0 2xl:h-[60px] 2xl:w-[60px]">
                  <img
                    src="/static/icon/Instagram.svg"
                    alt="Instagram Icon"
                    className="h-[30px] w-[30px] 2xl:h-9 2xl:w-9"
                  />
                </IconCircle>
                <div className="text-body-1 text-[18px] text-[var(--color-gray-50)] lg:text-[20px] 2xl:text-[24px]">
                  <a
                    href="https://instagram.com/bangmodhack.kmutt"
                    target="_blank"
                    rel="noopener,noreferrer"
                    className="hover:underline">
                    @bangmodhack.kmutt
                  </a>
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
                  ภาควิชาวิศวกรรมคอมพิวเตอร์ <br className="block sm:hidden" />
                  คณะวิศวกรรมศาสตร์
                </div>
              </div>
              <div className="text-body-1 text-[16px] lg:text-[20px] 2xl:text-[24px]">
                อาคารวิศววัฒนะ ชั้น 10-11 เลขที่ 126 ถ.ประชาอุทิศ แขวงบางมด เขตทุ่งครุ กรุงเทพฯ 10140
              </div>
            </div>
          </div>
        </div>
        <MapEmbed className="mt-8 hidden md:block md:h-[396px] md:w-full lg:h-[462px]" />{" "}
      </div>
    </div>
  )
}

export default Contact
