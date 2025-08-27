function Stat({ title, description }: { title: string; description: string | React.ReactElement }) {
  return (
    <div className="max-w-[372.54px]">
      <div className="text-header-2-regular mb-2 text-white">{title}</div>
      <div className="text-white/63 text-body-3">{description}</div>
    </div>
  )
}

function LandingSection() {
  const descriptions = {
    base: (
      <>
        โครงการนี้เปิดโอกาสให้นักเรียนมัธยมปลาย
        <br />
        และนักศึกษาอาชีวะระดับปวช. หรือเทียบเท่าได้เข้าร่วม
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
        โครงการนี้เปิดโอกาสให้นักเรียนมัธยมปลาย และนักศึกษาอาชีวะระดับปวช. หรือเทียบเท่าได้เข้าร่วมการแข่งขัน
        <br />
        เขียนโปรแกรมด้วยภาษา C/C++ ในรูปแบบทีม เพื่อเสริมสร้างทักษะการเขียนโปรแกรม พร้อมทั้งฝึกการทำงานร่วมกัน
        <br />
        และเก็บเกี่ยวประสบการณ์จากการลงสนามจริง
      </>
    ),
    xl2: (
      <>
        โครงการนี้เปิดโอกาสให้นักเรียนมัธยมปลาย
        <br />
        และนักศึกษาอาชีวะระดับปวช. หรือเทียบเท่า
        <br />
        ได้เข้าร่วมการแข่งขัน เขียนโปรแกรมด้วย
        <br />
        ภาษา C/C++ ในรูปแบบทีม เพื่อเสริมสร้าง
        <br />
        ทักษะการเขียนโปรแกรม พร้อมทั้งฝึก
        <br />
        การทำงานร่วมกันและเก็บเกี่ยวประสบการณ์
        <br />
        จากการลงสนามจริง
      </>
    ),
  }

  return (
    <div className="relative flex h-[1080px] w-full flex-col items-center justify-center gap-8 lg:gap-10 2xl:flex-row 2xl:gap-[60px]">
      {/* perspective grid */}
      {/* <svg
        width="1920"
        height="320"
        viewBox="0 0 1920 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-[0.45px] left-[calc(50%-46231.97px/2-0.02px)] h-[318px] w-[46231.97px]">
        <path d="M759.984 1.00024L-22156 319" stroke="white" strokeOpacity="0.1" />
        <path d="M781.037 1.00024L-1405.18 319" stroke="white" strokeOpacity="0.1" />
        <path d="M802.09 1.00024L-312.808 319" stroke="white" strokeOpacity="0.1" />
        <path d="M823.143 1.00024L104.64 319" stroke="white" strokeOpacity="0.1" />
        <path d="M844.195 1.00024L340.852 319" stroke="white" strokeOpacity="0.1" />
        <path d="M865.248 1.00024L503.085 319" stroke="white" strokeOpacity="0.1" />
        <path d="M886.301 1.00024L628.622 319" stroke="white" strokeOpacity="0.1" />
        <path d="M907.352 1.00024L734.082 319" stroke="white" strokeOpacity="0.1" />
        <path d="M928.406 1.00024L828.285 319" stroke="white" strokeOpacity="0.1" />
        <path d="M949.457 1.00024L916.682 319" stroke="white" strokeOpacity="0.1" />
        <path d="M970.512 1.00024L1003.29 319" stroke="white" strokeOpacity="0.1" />
        <path d="M991.562 1.00024L1091.68 319" stroke="white" strokeOpacity="0.1" />
        <path d="M1012.62 1.00024L1185.89 319" stroke="white" strokeOpacity="0.1" />
        <path d="M1033.67 1.00024L1291.35 319" stroke="white" strokeOpacity="0.1" />
        <path d="M1054.72 1.00024L1416.89 319" stroke="white" strokeOpacity="0.1" />
        <path d="M1075.77 1.00024L1579.12 319" stroke="white" strokeOpacity="0.1" />
        <path d="M1096.83 1.00024L1815.33 319" stroke="white" strokeOpacity="0.1" />
        <path d="M1117.88 1.00024L2232.78 319" stroke="white" strokeOpacity="0.1" />
        <path d="M1138.93 1.00024L3325.15 319" stroke="white" strokeOpacity="0.1" />
        <path d="M1159.98 1.00024L24076 319" stroke="white" strokeOpacity="0.1" />
        <path d="M181.096 9.03345H1738.87" stroke="white" strokeOpacity="0.1" />
        <path d="M-178.375 14.0217H2098.34" stroke="white" strokeOpacity="0.1" />
        <path d="M-727.262 21.6384H2647.23" stroke="white" strokeOpacity="0.1" />
        <path d="M-1549.44 33.0476H3469.41" stroke="white" strokeOpacity="0.1" />
        <path d="M-2759.59 49.8406H4679.55" stroke="white" strokeOpacity="0.1" />
        <path d="M-4512.37 74.1636H6432.34" stroke="white" strokeOpacity="0.1" />
        <path d="M-7013.84 108.876H8933.8" stroke="white" strokeOpacity="0.1" />
        <path d="M-10535.4 157.743H12455.3" stroke="white" strokeOpacity="0.1" />
        <path d="M-15430.6 225.674H17350.6" stroke="white" strokeOpacity="0.1" />
        <path d="M-22156 319H24076" stroke="white" strokeOpacity="0.1" />
      </svg> */}

      {/* shadow */}
      {/* <div className="absolute left-[calc(50%-575px/2+0.5px)] top-[646.55px] h-[227px] w-[575px] rounded-[50%] bg-[rgba(126,97,255,0.4)] blur-[49.25px]" /> */}

      <div className="not-2xl:hidden flex w-[494px] items-start gap-[60px]">
        <svg width="28" height="468" viewBox="0 0 28 468" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9834 14.3792L12.9834 204.5L12.9834 458.889" stroke="white" strokeOpacity="0.12" />
          <rect
            width="16.5303"
            height="16.5303"
            transform="matrix(0.845123 -0.534571 0.845123 0.534571 0 9.28467)"
            fill="url(#paint0_linear_199_819)"
          />
          <rect
            width="16.5303"
            height="16.5303"
            transform="matrix(0.845123 -0.534571 0.845123 0.534571 0 218.837)"
            fill="url(#paint1_linear_199_819)"
          />
          <rect
            width="16.5303"
            height="16.5303"
            transform="matrix(0.845123 -0.534571 0.845123 0.534571 0 459.163)"
            fill="url(#paint2_linear_199_819)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_199_819"
              x1="8.26517"
              y1="0"
              x2="8.26517"
              y2="16.5303"
              gradientUnits="userSpaceOnUse">
              <stop stopColor="#9F83DC" />
              <stop offset="1" stopColor="#FFCCF7" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_199_819"
              x1="8.26517"
              y1="0"
              x2="8.26517"
              y2="16.5303"
              gradientUnits="userSpaceOnUse">
              <stop stopColor="#9F83DC" />
              <stop offset="1" stopColor="#FFCCF7" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_199_819"
              x1="8.26517"
              y1="0"
              x2="8.26517"
              y2="16.5303"
              gradientUnits="userSpaceOnUse">
              <stop stopColor="#9F83DC" />
              <stop offset="1" stopColor="#FFCCF7" />
            </linearGradient>
          </defs>
        </svg>

        <div className="flex flex-col gap-[118px]">
          <Stat
            title="เปิดรับสมัครแล้ว"
            description={
              <>
                ระยะเวลาการรับสมัคร
                <br /> 27 สิงหาคม - 15 กันยายน 2568
              </>
            }
          />
          <Stat
            title="เขียนโปรแกรมภาษาซี"
            description={
              <>
                ทั้งหมวดหมวดคณิตศาสตร์ <br />
                วิทยาการคอมพิวเตอร์ และอัลกอริทึม
              </>
            }
          />
          <Stat
            title="60,000 บาท"
            description={
              <>
                เข้าแข่งขันเพื่อชิงเงินรางวัล
                <br />
                พร้อมรับประกาศนียบัตร
              </>
            }
          />
        </div>
      </div>

      <div className="font-bai-jamjuree text-[24px] text-white md:text-[32px] 2xl:hidden">
        คุณฝันว่าอะไร...
      </div>

      <div className="z-10 h-[312px] w-[340px] shrink-0 lg:h-[420px] lg:w-[477px] 2xl:h-[650px] 2xl:w-[563px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/static/hero/landing/landinglogo-compressed.webp"
          alt="logo"
          className="mx-auto h-full object-cover object-center"
        />
      </div>

      <div className="relative flex w-full items-start justify-center gap-8 text-center 2xl:w-[494px] 2xl:text-left">
        <div className="not-2xl:hidden mt-5 h-[2px] w-[30px] shrink-0 bg-white" />

        <div className="flex flex-col items-center gap-6 md:max-w-[971px] 2xl:max-w-[466px] 2xl:items-start 2xl:gap-8">
          <div className="text-header-2-medium text-white">
            การแข่งขัน
            <br className="not-2xl:hidden" />
            เขียนโปรแกรมคอมพิวเตอร์ <br className="lg:hidden" /> BangMod Hackathon 2025
          </div>

          <p className="text-body-2 block whitespace-nowrap text-gray-50 lg:hidden">{descriptions.base}</p>

          <p className="text-body-2 hidden whitespace-nowrap text-gray-50 lg:block 2xl:hidden">
            {descriptions.lg}
          </p>

          <p className="text-body-2 hidden whitespace-nowrap text-gray-50 2xl:block">{descriptions.xl2}</p>

          <button className="text-button-1 bg-supporting-3 text-secondary-50 h-[54px] rounded-full px-8 lg:h-[76px] 2xl:h-[87px] 2xl:px-12">
            ยังไม่เปิดรับสมัคร
          </button>
        </div>
      </div>

      <div className="font-bai-jamjuree not-2xl:hidden absolute bottom-[110px] text-5xl text-white">
        คุณฝันว่าอะไร...
      </div>
    </div>
  )
}
export default LandingSection
