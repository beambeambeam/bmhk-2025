"use client"

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
  })

  const onSubmit = (values: TeamRegisterSchemaType) => {
    mutation.mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full max-w-[62rem] flex-col gap-6">
        <div className="grid w-full gap-8 lg:grid-rows-[auto_1fr_1fr] 2xl:grid-cols-[auto_1fr]">
          <div className="grid grid-cols-2 gap-4 2xl:col-span-2">
            <p className="text-3xl text-white">1. ข้อมูลทีม</p>
          </div>
          <div className="flex w-full items-center justify-center">
            <FormField
              control={form.control}
              name="team_image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Image</FormLabel>
                  <FormControl>
                    <AvatarUploader value={field.value} onChange={field.onChange} disabled={props.disabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid w-full gap-4 lg:grid-cols-2 lg:grid-rows-2">
            <FormField
              control={form.control}
              name="team_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>team_name</FormLabel>
                  <FormControl>
                    <Input placeholder="team_name" {...field} />
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
                  <FormLabel>school_name</FormLabel>
                  <FormControl>
                    <Input placeholder="school_name" {...field} />
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
                  <FormLabel>quote</FormLabel>
                  <FormControl>
                    <Input placeholder="quote" {...field} />
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
                  <FormLabel>member_count</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
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
        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
export default TeamRegisterForm
