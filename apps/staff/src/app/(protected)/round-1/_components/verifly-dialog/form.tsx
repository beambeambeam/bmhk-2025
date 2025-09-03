"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import MultipleSelector from "@/components/ui/multiselect"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

type VerifyFormProps = {
  id: string
}

const memberOptions = [
  {
    label: "ข้อมูลไม่ตรง",
    value: "data-mismatch",
  },
  {
    label: "ปพ.7 มีปัญหา",
    value: "p7-problem",
  },
  {
    label: "บัตรประชาชนมีบัญหา",
    value: "id-card-problem",
  },
  {
    label: "รูปมีปัญหา",
    value: "face-image-problem",
  },
]

const adviserOptions = [
  {
    label: "ข้อมูลไม่ตรง",
    value: "data-mismatch",
  },
  {
    label: "บัตรประชาชนมีบัญหา",
    value: "id-card-problem",
  },
  {
    label: "บัตรอาจารย์มีบัญหา",
    value: "teacher-card-problem",
  },
]

// Define the form schema using Zod
const formSchema = z.object({
  adviser: z.array(z.string()),
  member1: z.array(z.string()),
  member2: z.array(z.string()),
  member3: z.array(z.string()),
  notes: z.string(),
  status: z.string(),
})

type FormValues = z.infer<typeof formSchema>

function VerifyForm(_props: VerifyFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adviser: [],
      member1: [],
      member2: [],
      member3: [],
      notes: "",
      status: "NOT_DONE",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  })

  function onSubmit(values: FormValues) {
    console.log("Form values:", values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="adviser"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adviser</FormLabel>
              <FormControl>
                <MultipleSelector
                  commandProps={{
                    label: "Select problems",
                  }}
                  placeholder="Select problems"
                  hidePlaceholderWhenSelected
                  emptyIndicator={<p className="text-center text-sm">No problems found</p>}
                  options={adviserOptions}
                  value={adviserOptions.filter((option) => field.value.includes(option.value))}
                  onChange={(selectedOptions) => {
                    field.onChange(selectedOptions.map((option) => option.value))
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="member1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Member 1</FormLabel>
              <FormControl>
                <MultipleSelector
                  commandProps={{
                    label: "Select problems",
                  }}
                  placeholder="Select problems"
                  hidePlaceholderWhenSelected
                  emptyIndicator={<p className="text-center text-sm">No problems found</p>}
                  options={memberOptions}
                  value={memberOptions.filter((option) => field.value.includes(option.value))}
                  onChange={(selectedOptions) => {
                    field.onChange(selectedOptions.map((option) => option.value))
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="member2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Member 2</FormLabel>
              <FormControl>
                <MultipleSelector
                  commandProps={{
                    label: "Select problems",
                  }}
                  placeholder="Select problems"
                  hidePlaceholderWhenSelected
                  emptyIndicator={<p className="text-center text-sm">No problems found</p>}
                  options={memberOptions}
                  value={memberOptions.filter((option) => field.value.includes(option.value))}
                  onChange={(selectedOptions) => {
                    field.onChange(selectedOptions.map((option) => option.value))
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="member3"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Member 3</FormLabel>
              <FormControl>
                <MultipleSelector
                  commandProps={{
                    label: "Select problems",
                  }}
                  placeholder="Select problems"
                  hidePlaceholderWhenSelected
                  emptyIndicator={<p className="text-center text-sm">No problems found</p>}
                  options={memberOptions}
                  value={memberOptions.filter((option) => field.value.includes(option.value))}
                  onChange={(selectedOptions) => {
                    field.onChange(selectedOptions.map((option) => option.value))
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>หมายเหตุ</FormLabel>
              <FormControl>
                <Textarea className="h-50" placeholder="Enter additional notes..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => {
            const hasProblems =
              form.watch("adviser").length > 0 ||
              form.watch("member1").length > 0 ||
              form.watch("member2").length > 0 ||
              form.watch("member3").length > 0

            return (
              <FormItem>
                <FormLabel>สถานะ</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="สถานะ" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DONE" disabled={hasProblems}>
                        ผ่าน {hasProblems && "(ต้องลบปัญหาทั้งหมดออกก่อน)"}
                      </SelectItem>
                      <SelectItem value="NOT_DONE">ยังไม่ผ่าน</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <Button type="submit" className="mt-4" disabled={!form.formState.isValid || !form.formState.isDirty}>
          Submit Verification
        </Button>
      </form>
    </Form>
  )
}

export default VerifyForm
