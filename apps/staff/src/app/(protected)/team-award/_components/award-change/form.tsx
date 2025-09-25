"use client"

import {
  submitAwardChange,
  getAwardAuditHistory,
} from "@/app/(protected)/team-award/_components/award-change/action"
import {
  awardOptions,
  getAwardDisplay,
} from "@/app/(protected)/team-award/_components/award-change/constants"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RelativeTimeCard } from "@/components/ui/relative-time-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cacheUtils } from "@/lib/cache"
import { zodResolver } from "@hookform/resolvers/zod"
import { isDefinedError, onError, onSuccess } from "@orpc/client"
import { useServerAction } from "@orpc/react/hooks"
import { useQuery } from "@tanstack/react-query"
import { Trophy } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

// Define the form schema using Zod
const formSchema = z.object({
  newAward: z.string().min(1, "Please select an award"),
  reason: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

type AwardChangeFormProps = {
  teamId: string
  currentAward: string
  defaultValues?: FormValues
  closeDialog?: () => void
}

function AwardChangeForm(props: AwardChangeFormProps) {
  const { execute, isPending } = useServerAction(submitAwardChange, {
    interceptors: [
      onError((error) => {
        if (isDefinedError(error)) {
          console.error("Award change failed:", error)
        }
        console.error("Award change failed:", error)
      }),
      onSuccess(async (success) => {
        // Invalidate the award audit query so fresh data is fetched next time
        cacheUtils.invalidateQueries([props.teamId, "award-audit"])
        cacheUtils.invalidateQueries(["team-awards"])

        props.closeDialog?.()
        console.log(success)
      }),
    ],
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newAward: props.defaultValues?.newAward ?? props.currentAward,
      reason: props.defaultValues?.reason ?? "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    disabled: isPending,
  })

  async function onSubmit(values: FormValues) {
    execute({
      teamId: props.teamId,
      newAward: values.newAward,
      reason: values.reason,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Current Award Display */}
        <div className="text-muted-foreground bg-muted/50 mb-4 space-y-2 rounded-lg border p-3 text-sm">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <div>
              <div className="font-medium">Current Award:</div>
              <div>{getAwardDisplay(props.currentAward).label}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-2">
          <FormField
            control={form.control}
            name="newAward"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Award</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an award..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {awardOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <span>{option.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason (Optional)</FormLabel>
                <FormControl>
                  <Textarea className="h-20" placeholder="Enter reason for award change..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full justify-end">
          <Button
            type="submit"
            className="mt-4"
            disabled={
              !form.formState.isValid ||
              !form.formState.isDirty ||
              isPending ||
              form.getValues("newAward") === props.currentAward
            }
            variant="outline">
            Update Award
          </Button>
        </div>
      </form>
    </Form>
  )
}

function AwardChangeFormParent(props: AwardChangeFormProps) {
  const { data, isPending } = useQuery({
    queryKey: [props.teamId, "award-audit"],
    queryFn: async () => {
      const data = await getAwardAuditHistory({
        teamId: props.teamId,
      })
      return data[1]?.auditHistory || []
    },
  })

  if (isPending) return <AwardChangeFormSkeleton />

  return <AwardChangeForm {...props} />
}

export { AwardChangeFormParent }
export default AwardChangeFormParent

function AwardChangeFormSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-muted-foreground bg-muted/50 mb-4 space-y-2 rounded-lg border p-3 text-sm">
        <div className="flex items-center gap-2">
          <div className="bg-muted h-4 w-4 animate-pulse rounded" />
          <div className="bg-muted h-4 w-24 animate-pulse rounded" />
          <div className="bg-muted h-4 w-32 animate-pulse rounded" />
        </div>
      </div>

      <div className="flex flex-col gap-4 px-2">
        <div className="flex flex-col gap-2">
          <div className="bg-muted h-4 w-20 animate-pulse rounded" />
          <div className="bg-muted h-10 w-full animate-pulse rounded-lg border" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="bg-muted h-4 w-16 animate-pulse rounded" />
          <div className="bg-muted h-20 w-full animate-pulse rounded-lg border" />
        </div>
      </div>

      <div className="mt-4">
        <div className="bg-muted h-10 w-32 animate-pulse rounded border" />
      </div>
    </div>
  )
}
