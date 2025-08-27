"use client"

import RegisterStatus from "@/app/(protected)/_components/status"
import DocumentUploader from "@/app/(protected)/register/_components/document_uploader"
import FormProps from "@/types/form"
import { orpc, queryClient } from "@/utils/orpc"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Button } from "@workspace/ui/components/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form"
import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Textarea } from "@workspace/ui/components/textarea"
import type { FileMetadata } from "@workspace/ui/hooks/use-file-upload"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import z from "zod"

const adviserRegisterSchema = z.object({
  prefix: z.enum(["MR", "MS", "MRS"]),
  thai_firstname: z
    .string()
    .min(1, "จำเป็นต้องกรอกช่องนี้")
    .regex(/^[ก-๙\s]+$/, "กรุณากรอกชื่อเป็นภาษาไทยเท่านั้น"),
  thai_middlename: z
    .string()
    .optional()
    .refine((val) => !val || /^[ก-๙\s]+$/.test(val), "กรุณากรอกชื่อเป็นภาษาไทยเท่านั้น"),
  thai_lastname: z
    .string()
    .min(1, "จำเป็นต้องกรอกช่องนี้")
    .regex(/^[ก-๙\s]+$/, "กรุณากรอกนามสกุลเป็นภาษาไทยเท่านั้น"),
  english_firstname: z
    .string()
    .min(1, "จำเป็นต้องกรอกช่องนี้")
    .regex(/^[a-zA-Z\s]+$/, "กรุณากรอกชื่อเป็นภาษาอังกฤษเท่านั้น"),
  english_middlename: z
    .string()
    .optional()
    .refine((val) => !val || /^[a-zA-Z\s]+$/.test(val), "กรุณากรอกชื่อเป็นภาษาอังกฤษเท่านั้น"),
  english_lastname: z
    .string()
    .min(1, "จำเป็นต้องกรอกช่องนี้")
    .regex(/^[a-zA-Z\s]+$/, "กรุณากรอกนามสกุลเป็นภาษาอังกฤษเท่านั้น"),
  food_allergy: z.string().min(1, "จำเป็นต้องกรอกช่องนี้"),
  food_type: z.string().min(1, "จำเป็นต้องกรอกช่องนี้"),
  drug_allergy: z.string().min(1, "จำเป็นต้องกรอกช่องนี้"),
  chronic_disease: z.string().min(1, "จำเป็นต้องกรอกช่องนี้"),
  email: z.string().email("กรุณากรอกอีเมลให้ถูกต้อง").min(1, "จำเป็นต้องกรอกช่องนี้"),
  phone_number: z
    .string()
    .min(1, "จำเป็นต้องกรอกช่องนี้")
    .regex(/^[0-9]{10}$/, "กรุณากรอกเบอร์โทรศัพท์ 10 หลัก"),
  line_id: z.string().optional(),
  national_doc: z.array(z.any()).min(1, "จำเป็นต้องอัปโหลดเอกสารประจำตัวประชาชน").max(1),
  teacher_doc: z.array(z.any()).min(1, "จำเป็นต้องอัปโหลดเอกสารครู").max(1),
})

type AdviserRegisterSchemaType = Omit<
  z.infer<typeof adviserRegisterSchema>,
  "national_doc" | "teacher_doc"
> & {
  national_doc: (File | FileMetadata)[]
  teacher_doc: (File | FileMetadata)[]
}

function AdviserRegisterForm(props: FormProps<AdviserRegisterSchemaType>) {
  const router = useRouter()

  const mutation = useMutation(
    orpc.register.adviser.set.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: orpc.register.status.get.key(),
        })
        router.push("/register/1")
      },
    })
  )

  const form = useForm<z.infer<typeof adviserRegisterSchema>>({
    resolver: zodResolver(adviserRegisterSchema),
    defaultValues: {
      prefix: "MR",
      thai_firstname: "",
      thai_middlename: "",
      thai_lastname: "",
      english_firstname: "",
      english_middlename: "",
      english_lastname: "",
      food_allergy: "",
      food_type: "",
      drug_allergy: "",
      email: "",
      phone_number: "",
      line_id: "",
      national_doc: [],
      teacher_doc: [],
      chronic_disease: "",
      ...props.defaultValues,
    },
  })

  const onSubmit = (values: AdviserRegisterSchemaType) => {
    mutation.mutate(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-fit w-full max-w-[80rem] flex-col gap-14 px-4">
        <RegisterStatus />
        <div className="flex flex-col gap-6">
          <div className="liquid flex w-full flex-col gap-5 rounded-[40px] p-5 lg:p-6 2xl:gap-8 2xl:px-8 2xl:py-6">
            <div className="flex flex-col gap-6">
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <p className="text-form-header col-span-2 w-full text-white">1. ข้อมูลอาจารย์</p>
              </div>

              <div className="grid grid-cols-2 gap-4 lg:grid-cols-[1fr_2.25fr_2.25fr_2.25fr]">
                <FormField
                  control={form.control}
                  name="prefix"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span>
                          คำนำหน้า <span className="align-super text-pink-300">*</span>
                        </span>
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="เลือกคำนำหน้า" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MR">นาย</SelectItem>
                          <SelectItem value="MS">นางสาว</SelectItem>
                          <SelectItem value="MRS">นาง</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="thai_firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span>
                          ชื่อจริง (ภาษาไทย) <span className="align-super text-pink-300">*</span>
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="ชื่อจริง" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="thai_middlename"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ชื่อกลาง (ภาษาไทย)</FormLabel>
                      <FormControl>
                        <Input placeholder="ชื่อกลาง" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="thai_lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span>
                          นามสกุล (ภาษาไทย) <span className="align-super text-pink-300">*</span>
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="นามสกุล" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 lg:grid-cols-[1fr_2.25fr_2.25fr_2.25fr]">
                <FormField
                  control={form.control}
                  name="prefix"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prefix</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="เลือกคำนำหน้า" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MR">Mr.</SelectItem>
                          <SelectItem value="MS">Ms.</SelectItem>
                          <SelectItem value="MRS">Mrs.</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="english_firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span>
                          First Name <span className="align-super text-pink-300">*</span>
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="english_middlename"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Middle Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="english_lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span>
                          Last Name <span className="align-super text-pink-300">*</span>
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
                <FormField
                  control={form.control}
                  name="food_allergy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>อาหารที่แพ้</FormLabel>
                      <FormControl>
                        <Input placeholder="อาหารที่แพ้" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="food_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ประเภทอาหาร (เช่น มังสวิรัติ ฮาลาล)</FormLabel>
                      <FormControl>
                        <Input placeholder="ประเภทอาหาร" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="drug_allergy"
                  render={({ field }) => (
                    <FormItem className="col-span-1 lg:col-span-2 2xl:col-span-1">
                      <FormLabel>ยาที่แพ้</FormLabel>
                      <FormControl>
                        <Input placeholder="ยาที่แพ้" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="chronic_disease"
                  render={({ field }) => (
                    <FormItem className="col-span-1 lg:col-span-2 2xl:col-span-1">
                      <FormLabel>โรคประจำตัว และวิธีปฐมพยาบาลเบื้องต้น</FormLabel>
                      <FormControl>
                        <Textarea placeholder="รายละเอียด" {...field} className="h-28" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="liquid flex w-full flex-col gap-5 rounded-[40px] p-4 2xl:gap-8 2xl:px-8 2xl:py-6">
            <div className="grid grid-cols-2 gap-4 2xl:col-span-2">
              <p className="text-form-header text-white">2. ข้อมูลติดต่อ</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span>
                        อีเมล <span className="align-super text-pink-300">*</span>
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="someone@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span>
                        เบอร์โทรศัพท์ <span className="align-super text-pink-300">*</span>
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="0812345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="line_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Line ID</FormLabel>
                    <FormControl>
                      <Input placeholder="ID LINE" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="liquid flex w-full flex-col gap-5 rounded-[40px] p-4 2xl:gap-8 2xl:px-8 2xl:py-6">
            <div className="grid grid-cols-2 gap-4 2xl:col-span-2">
              <p className="text-form-header text-white">3. เอกสาร</p>
            </div>

            <FormField
              control={form.control}
              name="national_doc"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid grid-cols-2 gap-10">
                      <FormDescription>
                        1. สำเนาบัตรประจำตัวประชาชน หรือบัตรประจำตัวสำหรับ{" "}
                        <span className="whitespace-nowrap">บุคคลที่ไม่ใช่สัญชาติไทย</span>
                        พร้อมเซ็นสำเนาถูกต้อง <span className="whitespace-nowrap">(เฉพาะด้านหน้า)*</span>
                      </FormDescription>
                      <div>
                        <DocumentUploader
                          value={field.value}
                          onChange={field.onChange}
                          disabled={props.disabled}
                          multiple={false}
                          maxFiles={1}
                          maxSize={10 * 1024 * 1024}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="teacher_doc"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid grid-cols-2 gap-10">
                      <FormDescription>
                        2. เอกสารแสดงสถานภาพการเป็นอาจารย์ประจำ ในสถานศึกษา เช่น บัตรประจำตัวอาจารย์
                        บัตรข้าราชการครู{" "}
                        <span className="whitespace-nowrap">หรือหนังสือรับรองจากสถานศึกษา*</span>
                      </FormDescription>
                      <div>
                        <DocumentUploader
                          value={field.value}
                          onChange={field.onChange}
                          disabled={props.disabled}
                          multiple={false}
                          maxFiles={1}
                          maxSize={10 * 1024 * 1024}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex w-full justify-between">
          <Button
            type="button"
            onClick={() => router.push("/register/team")}
            className="liquid mb-8 flex h-fit w-12 items-center justify-between gap-4 rounded-[20px] py-3 md:w-auto md:pl-8 md:pr-4 2xl:py-4 2xl:pl-10 2xl:pr-6">
            <ChevronLeft className="h-6 w-6 text-white md:h-8 md:w-8 2xl:h-10 2xl:w-10" />
            <span className="hidden text-[20px] font-medium text-white md:block 2xl:text-[22px]">
              ย้อนกลับ
            </span>
          </Button>
          <Button
            type="submit"
            className="liquid mb-8 flex h-fit w-12 items-center justify-between gap-4 rounded-[20px] py-3 md:w-auto md:pl-8 md:pr-4 2xl:py-4 2xl:pl-10 2xl:pr-6">
            <span className="hidden text-[20px] font-medium text-white md:block 2xl:text-[22px]">ต่อไป</span>
            <ChevronRight className="h-6 w-6 text-white md:h-8 md:w-8 2xl:h-10 2xl:w-10" />
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default AdviserRegisterForm
