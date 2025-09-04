"use client"

import { LoadingSpinner } from "@/components/svg/loading-spinner"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const passwordSchema = z
  .string()
  .min(6, { message: "Password must be longer than 6 characters" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least 1 uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least 1 lowercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least 1 number" })
  .regex(/[!@#$%^&*]/, {
    message: "Password must contain at least 1 special character",
  })

const formSchema = z
  .object({
    oldPassword: z.string(),
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export default function ChangePasswordPage() {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsPending(true)
    const { error } = await authClient.changePassword({
      currentPassword: data.oldPassword,
      newPassword: data.newPassword,
      revokeOtherSessions: true,
    })

    if (error) {
      setIsPending(false)
      if (error.code === "INVALID_PASSWORD") {
        form.setError("oldPassword", {
          message: "Wrong Password! Check again.",
        })
      } else {
        toast.error("Error!", {
          description: error.message ?? error.statusText,
        })
      }
    } else {
      toast.success("Success!", {
        description: "Password Changed! Redirecting you back to dashboard.",
      })
      setTimeout(() => router.push("/dashboard"), 1500)
    }
  }

  return (
    <div className="flex w-full items-center justify-center overflow-x-hidden">
      <div className="flex w-full max-w-7xl flex-col space-y-6 p-4 md:p-8 lg:p-12">
        <h1 className="text-2xl font-medium leading-[1.4] lg:text-3xl 2xl:text-5xl">Change Password</h1>
        <div className="flex w-full flex-col lg:w-1/2 2xl:w-1/3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your current password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your new password, again." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="flex items-center justify-center gap-x-3" disabled={isPending}>
                {" "}
                {isPending && <LoadingSpinner className="size-3" />}
                <span>Submit</span>
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
