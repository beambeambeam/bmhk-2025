"use client"

import FormProps from "@/types/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@workspace/ui/components/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form"
import { Input } from "@workspace/ui/components/input"
import { useForm } from "react-hook-form"
import z from "zod"

const teamRegisterSchema = z.object({
  team_image: z.instanceof(File).array().min(1, "จำเป็นต้องกรอกช่องนี้").max(1),
  team_name: z.string().min(1, "จำเป็นต้องกรอกช่องนี้").max(20, "ชื่อทีมต้องมีไม่เกิน 20 ตัวอักษร"),
  school_name: z.string().min(1, "จำเป็นต้องกรอกช่องนี้"),
  quote: z.string().min(1, "จำเป็นต้องกรอกช่องนี้").max(50, "คำคมประจำทีมต้องมีไม่เกิน 50 ตัวอักษร"),
  number_of_member: z.number(),
})

type TeamRegisterSchemaType = z.infer<typeof teamRegisterSchema>

function TeamRegisterForm(props: FormProps<TeamRegisterSchemaType>) {
  const form = useForm<z.infer<typeof teamRegisterSchema>>({
    resolver: zodResolver(teamRegisterSchema),
    defaultValues: {
      team_image: [],
      team_name: "",
      school_name: "",
      quote: "",
      number_of_member: 2,
      ...props.defaultValues,
    },
  })

  const onSubmit = (values: TeamRegisterSchemaType) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="team_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
export default TeamRegisterForm
