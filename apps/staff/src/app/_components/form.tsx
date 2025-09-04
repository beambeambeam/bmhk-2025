"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { authClient } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"

const signInSchema = z.object({
  email: z
    .string()
    .regex(/^[^\s@]+@kmutt\.ac\.th$/, "Email must be a valid @kmutt.ac.th address")
    .min(1, "This field is Required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type SignInSchemaType = z.infer<typeof signInSchema>

function SignInForm() {
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const onSubmit = async (values: SignInSchemaType) => {
    authClient.signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: "/dashboard",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-6">
          <div className="flex w-full flex-col gap-8">
            <div className="flex w-full flex-col gap-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="align-super">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password <span className="align-super">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="mt-4">
              <Spinner show={form.formState.isSubmitting} size="small" className="text-white" />
              Sign In
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default SignInForm
