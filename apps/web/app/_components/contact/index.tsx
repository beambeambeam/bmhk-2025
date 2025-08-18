import { Heading } from '@/components/heading';
import IconCircle from '@/components/iconCircle';
import MapEmbed from '@/components/mapEmbed';

function Contact() {
  return (
    <div className="w-full px-6 flex flex-col items-center justify-center content-center gap-8 lg:max-h-[834] sm:px-20 lg:gap-10 2xl:max-h-[1080] 2xl:px-40 2xl:gap-15">
      <Heading text="ติดต่อทีมงาน" />
      <div className='flex gap-10 w-full 2xl:max-w-[1326]'>
        <div className='flex flex-row justify-center gap-8 2xl:gap-10 w-full'>
          <div className='flex flex-1 flex-col gap-6 lg:gap-8 2xl:gap-10'> {/* Left Section */}
            <div className='flex flex-col gap-6 lg:gap-8 md:flex-row'>
              <div className='flex flex-col gap-4 flex-1 min-w-0'> {/* Contact */}
                <div className='flex gap-4 items-center'>
                  <IconCircle className='w-[50px] h-[50px] 2xl:w-[60px] 2xl:h-[60px] flex-shrink-0'>
                    <img
                      src="/static/icon/Basic.svg"
                      alt="Staff Icon"
                      className='w-[30px] h-[30px] 2xl:w-9 2xl:h-9'
                    />
                  </IconCircle>
                  <div className='text-[var(--color-gray-50)] text-body-1 text-[18px] lg:text-[20px] 2xl:text-[24px]'>คำถามทั่วไป</div>
                </div>
                <div className='text-body-1 text-[18px] lg:text-[20px] 2xl:text-[24px]'>ชญานิษฐ์ กันตนฤมิตรกุล (ชิชา)</div>
                <div className='text-body-1 text-[18px] lg:text-[20px] 2xl:text-[24px]'>099 197 9119</div>
                <div className='text-body-1 text-[18px] lg:text-[20px] 2xl:text-[24px] break-words whitespace-normal'>chayanit.kunt@mail.kmutt.ac.th</div>
              </div>
              <div className='flex flex-col gap-4 flex-1 min-w-0'> {/* Contact */}
                <div className='flex gap-4 items-center'>
                  <IconCircle className='w-[50px] h-[50px] 2xl:w-[60px] 2xl:h-[60px] flex-shrink-0'>
                    <img
                      src="/static/icon/Code.svg"
                      alt="Staff Icon"
                      className='w-[30px] h-[30px] 2xl:w-9 2xl:h-9'
                    />
                  </IconCircle>
                  <div className='text-[var(--color-gray-50)] text-body-1 text-[18px] lg:text-[20px] 2xl:text-[24px]'>คำถามด้านวิชาการ</div>
                </div>
                <div className='text-body-1 text-[16px] lg:text-[20px] 2xl:text-[24px]'>ภูริณัฐ พลอาสา (นาโน)</div>
                <div className='text-body-1 text-[18px] lg:text-[20px] 2xl:text-[24px]'>081 837 0772</div>
                <div className='text-body-1 text-[18px] lg:text-[20px] 2xl:text-[24px] break-words whitespace-normal'>phurinat.pola@kmutt.ac.th</div>
              </div>
            </div>
            <div className='flex flex-col gap-4'> {/* Contact */}
              <div className='flex gap-4 items-center'>
                <IconCircle className='w-[50px] h-[50px] 2xl:w-[60px] 2xl:h-[60px] flex-shrink-0'>
                  <img
                    src="/static/icon/Address.svg"
                    alt="Address Icon"
                    className='w-[30px] h-[30px] 2xl:w-9 2xl:h-9'
                  />
                </IconCircle>
                <div className='text-[var(--color-gray-50)] text-body-1 text-[18px] lg:text-[20px] 2xl:text-[24px]'>ภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์</div>
              </div>
              <div className='text-body-1 text-[16px] lg:text-[20px] 2xl:text-[24px]'>อาคารวิศววัฒนะ ชั้น 10 เลขที่ 126 ถ.ประชาอุทิศ แขวงบางมด เขตทุ่งครุ กรุงเทพฯ 10140</div>
            </div>
            <div className='flex gap-6'>
              <a href="https://www.facebook.com/BangmodHackathon" target="_blank" rel="noopener noreferrer">
                <IconCircle className='w-[60px] h-[60px] lg:w-[70px] lg:h-[70px] 2xl:w-[90px] 2xl:h-[90px] flex-shrink-0'>
                  <img
                    src="/static/icon/Facebook.svg"
                    alt="Facebook Icon"
                  />
                </IconCircle>
              </a>
              <a href="https://www.instagram.com/bangmodhack.kmutt" target="_blank" rel="noopener noreferrer">
                <IconCircle className='w-[60px] h-[60px] lg:w-[70px] lg:h-[70px] 2xl:w-[90px] 2xl:h-[90px] flex-shrink-0'>
                  <img
                    src="/static/icon/Instagram.svg"
                    alt="Instagram Icon"
                  />
                </IconCircle>
              </a>
            </div>
          </div>
          <MapEmbed className='flex-shrink-0 hidden lg:block md:w-[384px] 2xl:w-[506px]' /> {/* Right Section */}
        </div>
      </div>
    </div>
  );
}

export default Contact;