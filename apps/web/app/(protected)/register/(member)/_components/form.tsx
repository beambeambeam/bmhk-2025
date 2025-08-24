"use client"

import { ExternalFormProps } from "@/types/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@workspace/ui/components/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form"
import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { useForm } from "react-hook-form"
import z from "zod"

const memberRegisterSchema = z.object({
  prefix: z.enum(["MR", "MS", "MRS"]),
  thai_firstname: z.string().min(1, "จำเป็นต้องกรอกช่องนี้"),
  thai_middlename: z.string().optional(),
  thai_lastname: z.string().min(1, "จำเป็นต้องกรอกช่องนี้"),
  english_firstname: z.string().min(1, "จำเป็นต้องกรอกช่องนี้"),
  english_middlename: z.string().optional(),
  english_lastname: z.string().min(1, "จำเป็นต้องกรอกช่องนี้"),
  food_allergy: z.string().min(1, "จำเป็นต้องกรอกช่องนี้"),
  food_type: z.string().min(1, "จำเป็นต้องกรอกช่องนี้"),
  drug_allergy: z.string().min(1, "จำเป็นต้องกรอกช่องนี้"),
  email: z.string().email("กรุณากรอกอีเมลให้ถูกต้อง").min(1, "จำเป็นต้องกรอกช่องนี้"),
  phone_number: z.string().min(1, "จำเป็นต้องกรอกช่องนี้"),
  line_id: z.string().optional(),
  parent: z.string().min(1, "จำเป็นต้องกรอกช่องนี้"),
  parent_phone: z.string().min(1, "จำเป็นต้องกรอกช่องนี้"),
})

type memberRegisterSchemaType = z.infer<typeof memberRegisterSchema>

function MemberRegisterForm(props: ExternalFormProps<memberRegisterSchemaType>) {
  const form = useForm<z.infer<typeof memberRegisterSchema>>({
    resolver: zodResolver(memberRegisterSchema),
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
      parent: "",
      parent_phone: "",
      ...props.defaultValues,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmit!)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <FormField
            control={form.control}
            name="prefix"
            render={({ field }) => (
              <FormItem>
                <FormLabel>คำนำหน้า</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
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
                <FormLabel>ชื่อภาษาไทย</FormLabel>
                <FormControl>
                  <Input placeholder="ชื่อภาษาไทย" {...field} />
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
                <FormLabel>ชื่อกลางภาษาไทย (ไม่บังคับ)</FormLabel>
                <FormControl>
                  <Input placeholder="ชื่อกลางภาษาไทย" {...field} />
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
                <FormLabel>นามสกุลภาษาไทย</FormLabel>
                <FormControl>
                  <Input placeholder="นามสกุลภาษาไทย" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <FormField
            control={form.control}
            name="prefix"
            render={({ field }) => (
              <FormItem>
                <FormLabel>คำนำหน้า</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกคำนำหน้า" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MR">MR</SelectItem>
                    <SelectItem value="MS">MS</SelectItem>
                    <SelectItem value="MRS">MRS</SelectItem>
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
                <FormLabel>ชื่อภาษาอังกฤษ</FormLabel>
                <FormControl>
                  <Input placeholder="ชื่อภาษาอังกฤษ" {...field} />
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
                <FormLabel>ชื่อกลางภาษาอังกฤษ (ไม่บังคับ)</FormLabel>
                <FormControl>
                  <Input placeholder="ชื่อกลางภาษาอังกฤษ" {...field} />
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
                <FormLabel>นามสกุลภาษาอังกฤษ</FormLabel>
                <FormControl>
                  <Input placeholder="นามสกุลภาษาอังกฤษ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="food_allergy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>แพ้อาหาร</FormLabel>
                <FormControl>
                  <Input placeholder="แพ้อาหาร" {...field} />
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
                <FormLabel>ประเภทอาหาร</FormLabel>
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
              <FormItem>
                <FormLabel>แพ้ยา</FormLabel>
                <FormControl>
                  <Input placeholder="แพ้ยา" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>อีเมล</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="อีเมล" {...field} />
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
                <FormLabel>เบอร์โทรศัพท์</FormLabel>
                <FormControl>
                  <Input placeholder="เบอร์โทรศัพท์" {...field} />
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
                <FormLabel>Line ID (ไม่บังคับ)</FormLabel>
                <FormControl>
                  <Input placeholder="Line ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid w-full gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="parent_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>เบอร์โทรศัพท์ผู้ปกครองคนที่ 1</FormLabel>
                <FormControl>
                  <Input placeholder="เบอร์โทรศัพท์ผู้ปกครองคนที่ 1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ผู้ปกครองคนที่ 1</FormLabel>
                <FormControl>
                  <Input placeholder="ชื่อผู้ปกครองคนที่ 1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          ต่อไป
        </Button>
      </form>
    </Form>
  )
}

export default MemberRegisterForm
