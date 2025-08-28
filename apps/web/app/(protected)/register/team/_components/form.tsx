"use client"

import RegisterStatus from "@/app/(protected)/_components/status"
import { useRegisterStatusActions } from "@/app/(protected)/_components/status/context"
import AvatarUploader from "@/app/(protected)/register/team/_components/avatar"
import FormProps from "@/types/form"
import { orpc, queryClient } from "@/utils/orpc"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
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
import type { FileMetadata } from "@workspace/ui/hooks/use-file-upload"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import z from "zod"

const teamRegisterSchema = z.object({
  team_image: z.array(z.any()).min(1, "จำเป็นต้องกรอกช่องนี้").max(1),
  team_name: z.string().min(1, "จำเป็นต้องกรอกช่องนี้").max(20, "ชื่อทีมต้องมีไม่เกิน 20 ตัวอักษร"),
  school_name: z.string().min(1, "จำเป็นต้องกรอกช่องนี้"),
  quote: z.string().max(50, "คำคมประจำทีมต้องมีไม่เกิน 50 ตัวอักษร"),
  member_count: z.number(),
})

type TeamRegisterSchemaType = Omit<z.infer<typeof teamRegisterSchema>, "team_image"> & {
  team_image: (File | FileMetadata)[]
}

function TeamRegisterForm(props: FormProps<TeamRegisterSchemaType>) {
  const router = useRouter()
  const { setStatus } = useRegisterStatusActions()

  const mutation = useMutation(
    orpc.register.team.set.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: orpc.register.status.get.key(),
        })
        router.push("/register/adviser")
      },
    })
  )

  const form = useForm<z.infer<typeof teamRegisterSchema>>({
    resolver: zodResolver(teamRegisterSchema),
    defaultValues: {
      team_image: [],
      team_name: "",
      school_name: "",
      quote: "",
      member_count: 2,
      ...props.defaultValues,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    disabled: mutation.isPending || mutation.isSuccess,
  })

  const onSubmit = (values: TeamRegisterSchemaType) => {
    mutation.mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-fit w-full flex-col gap-14">
        <RegisterStatus />
        <div className="flex flex-col gap-6 px-3 md:px-[60px] lg:px-[100px] 2xl:px-80">
          <div className="liquid grid w-full gap-5 rounded-[40px] p-5 lg:grid-rows-[auto_1fr] lg:p-6 2xl:grid-cols-[auto_1fr] 2xl:gap-8 2xl:px-8 2xl:py-6">
            <div className="grid grid-cols-2 gap-4 2xl:col-span-2">
              <p className="text-form-header text-white">1. ข้อมูลทีม</p>
            </div>
            <div className="flex w-full items-center justify-center">
              <FormField
                control={form.control}
                name="team_image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AvatarUploader
                        value={field.value}
                        onChange={field.onChange}
                        disabled={props.disabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid w-full gap-4 lg:grid-cols-2 lg:grid-rows-2 2xl:gap-6">
              <FormField
                control={form.control}
                name="team_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      ชื่อทีม <span className="align-super text-pink-300">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="ชื่อทีม" {...field} limit={20} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="school_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      สถานศึกษา <span className="align-super text-pink-300">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="สถานศึกษา" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      คำคมประจำทีม <span className="invisible align-super text-pink-300">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="คำคมประจำทีม" {...field} limit={50} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="member_count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      จำนวนสมาชิก <span className="align-super text-pink-300">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const memberCount = Number(value)
                        field.onChange(memberCount)

                        // Update status context based on member count
                        if (memberCount === 2) {
                          setStatus("member3", "NOT_HAVE")
                        } else if (memberCount === 3) {
                          setStatus("member3", "NOT_DONE")
                        }
                      }}
                      defaultValue={String(field.value)}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex w-full justify-between">
            <Button
              type="button"
              onClick={() => router.push("/teams")}
              className="liquid mb-8 flex h-fit w-12 cursor-pointer items-center gap-4 rounded-[20px] py-3 md:w-[182px] md:pl-8 md:pr-4 2xl:py-4 2xl:pl-10 2xl:pr-6">
              <ChevronLeft className="size-6 text-white md:size-8 2xl:size-10" />
              <span className="hidden text-[20px] font-medium text-white md:block 2xl:text-[22px]">
                ย้อนกลับ
              </span>
            </Button>
            <Button
              type="submit"
              className="liquid mb-8 flex h-fit w-12 cursor-pointer items-center gap-4 rounded-[20px] py-3 md:w-[182px] md:pl-8 md:pr-4 2xl:py-4 2xl:pl-10 2xl:pr-6">
              <span className="hidden text-[20px] font-medium text-white md:block 2xl:text-[22px]">
                ต่อไป
              </span>
              <ChevronRight className="size-6 text-white md:size-8 2xl:size-10" />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
export default TeamRegisterForm
