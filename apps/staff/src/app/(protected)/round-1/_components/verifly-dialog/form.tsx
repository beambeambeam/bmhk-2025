"use client"

import {
  submitRound1Verification,
  getRound1Verification,
} from "@/app/(protected)/round-1/_components/verifly-dialog/action"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import MultipleSelector from "@/components/ui/multiselect"
import { RelativeTimeCard } from "@/components/ui/relative-time-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cacheUtils } from "@/lib/cache"
import { zodResolver } from "@hookform/resolvers/zod"
import { isDefinedError, onError, onSuccess } from "@orpc/client"
import { useServerAction } from "@orpc/react/hooks"
import { useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
  status: z.enum(["DONE", "NOT_DONE"]),
})

type FormValues = z.infer<typeof formSchema>

type VerifyFormProps = {
  id: string
  defaultValues?: FormValues
  closeDialog?: () => void
  verificationData?: {
    id: string
    teamId: string
    adviser: string[] | null
    member1: string[] | null
    member2: string[] | null
    member3: string[] | null
    notes: string | null
    status: "DONE" | "NOT_DONE"
    verifiedBy: string | null
    verifiedAt: Date | null
    createdAt: Date
    updatedAt: Date
    userInfo?: {
      id: string
      name: string
      displayUsername: string | null
      username: string | null
    } | null
  }
}

function VerifyForm(props: VerifyFormProps) {
  const { execute, isPending } = useServerAction(submitRound1Verification, {
    interceptors: [
      onError((error) => {
        if (isDefinedError(error)) {
          console.error("Verification failed:", error)
        }
        console.error("Verification failed:", error)
      }),
      onSuccess(async (success) => {
        // Invalidate the verification query so fresh data is fetched next time
        cacheUtils.invalidateQueries([props.id, "round1-verification"])
        cacheUtils.invalidateQueries([props.id, "team"])
        cacheUtils.invalidateQueries([props.id, "adviser"])
        cacheUtils.invalidateQueries([props.id, "member1"])
        cacheUtils.invalidateQueries([props.id, "member2"])
        cacheUtils.invalidateQueries([props.id, "member3"])

        props.closeDialog?.()
        console.log(success)
      }),
    ],
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adviser: props.defaultValues?.adviser ?? [],
      member1: props.defaultValues?.member1 ?? [],
      member2: props.defaultValues?.member2 ?? [],
      member3: props.defaultValues?.member3 ?? [],
      notes: props.defaultValues?.notes ?? "",
      status: props.defaultValues?.status ?? "NOT_DONE",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    disabled: isPending,
  })

  async function onSubmit(values: FormValues) {
    execute({
      teamId: props.id,
      ...values,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Show updater info and last update time if data exists */}
        {props.defaultValues && props.verificationData && (
          <div className="text-muted-foreground bg-muted/50 mb-4 space-y-2 rounded-lg border p-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Last updated by:</span>
              <span className="font-medium">
                {props.verificationData.userInfo?.displayUsername ||
                  props.verificationData.userInfo?.username ||
                  props.verificationData.userInfo?.name ||
                  "Unknown"}
              </span>
            </div>
            {props.verificationData.updatedAt && (
              <div className="flex items-center justify-between">
                <span>Last updated:</span>
                <RelativeTimeCard
                  date={new Date(props.verificationData.updatedAt)}
                  variant="ghost"
                  type="button"
                />
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-4 px-2">
          <FormField
            control={form.control}
            name="adviser"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adviser</FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
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
                    {...field}
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
                    {...field}
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
                    {...field}
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
        </div>

        <Button
          type="submit"
          className="mt-4"
          disabled={!form.formState.isValid || !form.formState.isDirty || isPending}
          variant="outline">
          Submit Verification
        </Button>
      </form>
    </Form>
  )
}

function VerifyFormParent(props: VerifyFormProps) {
  const { data, isPending } = useQuery({
    queryKey: [props.id, "round1-verification"],
    queryFn: async () => {
      const data = await getRound1Verification({
        teamId: props.id,
      })
      return data[1]?.verification
    },
  })

  if (isPending) {
    return <div>Loading verification data...</div>
  }

  const defaultValues = data
    ? {
        adviser: data.adviser || [],
        member1: data.member1 || [],
        member2: data.member2 || [],
        member3: data.member3 || [],
        notes: data.notes || "",
        status: data.status || "NOT_DONE",
      }
    : undefined

  return <VerifyForm {...props} defaultValues={defaultValues} verificationData={data || undefined} />
}

export { VerifyFormParent }
export default VerifyFormParent
