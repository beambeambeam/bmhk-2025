import { ContentData } from "./types"

export const contentData: ContentData[] = [
  {
    id: "math",
    longTitle: "หมวดคณิตศาสตร์",
    shortTitle: "หมวดคณิตศาสตร์",
    lqClassName: "liquid-scope-purple",
    colorTheme: "#9F83DC",
    items: [
      {
        label: "เลขคณิตและเรขาคณิต (Arithmetic and Geometry)",
        subItems: [
          { label: "จำนวนเต็ม คุณสมบัติของเลขจำนวนเต็ม (ค่าบวก ค่าลบ เลขคู่ เลขคี่ การหารลงตัว จำนวนเฉพาะ)" },
          { label: "เลขเศษส่วน และร้อยละ" },
          {
            label:
              "จุด เวคเตอร์ พิกัดจุดแบบคาร์ทิเชียน (Cartesian Coordinates) ในตารางสองมิติที่มีพิกัดเป็นจำนวนเต็ม",
          },
          { label: "ระยะทางแบบยูคลิด ทฤษฏีพิธากอรัส" },
          { label: "ส่วนของเส้นตรง จุดตัดของเส้นตรง และคุณสมบัติพื้นฐานที่เกี่ยวข้อง" },
          { label: "มุม สามเหลี่ยม สี่เหลี่ยมผืนผ้า สี่เหลี่ยมจัตุรัส วงกลม" },
        ],
      },
      {
        label: "โครงสร้างไม่ต่อเนื่อง (Discrete Structures)",
        subItems: [
          { label: "ฟังก์ชัน ความสัมพันธ์ และเซ็ต" },
          { label: "ตรรกศาสตร์พื้นฐาน" },
          { label: "วิธีการพิสูจน์" },
          {
            label: "วิธีการนับเบื้องต้น",
            subItems: [
              {
                label:
                  "กฎของการบวกและกฎของการคูณ (Sum rule and Product rule), หลักการเพิ่มเข้า-ตัดออก (Inclusion-exclusion Principle), ลำดับเลขคณิตและเรขาคณิต จำนวนแบบฟิโบนัชชิ (Fibonacci Numbers)",
              },
              { label: "กฏรังนกพิราบ (Pigeonhole Principle) เพื่อใช้ในการหาขอบเขต" },
              { label: "การเรียงสับเปลี่ยน และวิธีจัดหมู่ระดับพื้นฐาน" },
              {
                label:
                  "ฟังก์ชันเลขเศษส่วน (Fractional Function) และสัมประสิทธิ์ทวินาม (Binomial Coefficient)",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "com-sci",
    longTitle: "หมวดพื้นฐาน วิทยาการคอมพิวเตอร์",
    shortTitle: "หมวดวิทยาการคอมพิวเตอร์",
    lqClassName: "liquid-scope-pink",
    colorTheme: "#E0A8D8",
    items: [
      { label: "พื้นฐานด้านการเขียนโปรแกรม" },
      { label: "ทักษะการแก้ปัญหา (Problem-solving Skill)" },
      {
        label: "พื้นฐานโครงสร้างข้อมูล",
        subItems: [
          {
            label:
              "ชนิดข้อมูลดั้งเดิม (Primitive Data Type) ได้แก่ Boolean, Signed/Unsigned Integer และ Character",
          },
          { label: "แถวลำดับ (อาเรย์ อาเรย์หลายมิติ)" },
          { label: "Record/Struct" },
          { label: "สตริงและการดำเนินการกับสตริง" },
          { label: "Static และ Stack allocation" },
          { label: "Lined structures (ทั้งที่เป็นแบบเส้นตรง และแบบที่แบ่งเป็นสาขาได้)" },
          { label: "การสร้าง โครงสร้างกองซ้อน (Stack), คิว (Queue), ต้นไม้ (Tree) และกราฟ (Graph)" },
          { label: "การเลือกโครงสร้างข้อมูลที่เหมาะสม" },
          { label: "คิวลำดับความสำคัญ (Priority Queue), ไดนามิกเซต (Dynamic Det), ไดนามิกแมพ (Dynamic Map)" },
        ],
      },
      {
        label: "การเรียกตัวเองซ้ำ (Recursion)",
        subItems: [{ label: "แนวคิด" }, { label: "ฟังก์ชันทางคณิตศาสตร์ที่เรียกตัวเองซ้ำ" }],
      },
    ],
  },
  {
    id: "programming",
    longTitle: "หมวดอัลกอริทึม",
    shortTitle: "หมวดอัลกอริทึม",
    lqClassName: "liquid-scope-red",
    colorTheme: "#CE70A2",
    items: [
      { label: "พื้นฐานการวิเคราะห์ความซับซ้อนของอัลกอริทึม (algorithmic complexity)" },
      {
        label: "กลวิธีทางอัลกอริทึม",
        subItems: [
          { label: "Brute-Force Algorithm" },
          { label: "Greedy Algorithm" },
          { label: "การแบ่งแยกและเอาชนะ" },
          { label: "Backtracking (ทั้งที่เป็นแบบเรียกตัวเองซ้ำ และไม่เรียกตัวเองซ้ำ)" },
          { label: "Branch-and-Bound Algorithm" },
          { label: "Pattern Matching and String/Text Algorithm" },
          { label: "Dynamic Programming" },
        ],
      },
      {
        label: "อัลกอริทึมเชิงคำนวณพื้นฐาน",
        subItems: [
          {
            label:
              "อัลกอริทึมเชิงตัวเลขพื้นฐานที่เกี่ยวข้องกับจำนวนเต็ม เช่น Radix Conversion, Euclid's Algorithm, Primality Test in O(√N), Sieve of Eratosthenes, Factorization, Efficient Exponentiation",
          },
          { label: "การจัดการอาร์เรย์ขั้นพื้นฐาน (รวมถึงการทำฮิสโทแกรม และ Bucket Sort)" },
          { label: "Sequential และ Binary Search" },
          { label: "Search by Elimination" },
          { label: "การแบ่งข้อมูล (Partitioning) การจัดลำดับด้วยการแบ่งข้อมูลซ้ำๆ Quick Sort" },
          { label: "การเรียงข้อมูลที่มีเวลาที่แย่ที่สุดเป็น O(NlogN) เช่น Heap Sort และ Merge Sort" },
        ],
      },
    ],
  },
]
