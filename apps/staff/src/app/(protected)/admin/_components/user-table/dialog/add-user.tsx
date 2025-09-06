"use client"

import { LoadingSpinner } from "@/components/svg/loading-spinner"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { isDefinedError, onError, ORPCError } from "@orpc/client"
import { useServerAction } from "@orpc/react/hooks"
import { UserPlus } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { addUser } from "../../../actions"
import { AddUserSuccessDialog } from "./add-user-success"

const emailSchema = z
  .string()
  .min(1, "This field is required")
  .transform((val) => {
    if (val.includes("@")) {
      if (!val.endsWith("@kmutt.ac.th")) {
        throw new Error("Email must be a valid @kmutt.ac.th address")
      }
      return val.replace(/@kmutt\.ac\.th$/, "")
    }
    return val
  })
  .refine((val) => /^[a-z0-9.]+$/i.test(val), {
    message: "Invalid username format",
  })

const passwordSchema = z
  .string()
  .max(0)
  .or(
    z
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
  )

const StaffRolesEnum = z.enum(["super_admin", "admin", "staff"])

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: emailSchema,
  password: passwordSchema,
  role: StaffRolesEnum,
})

export function AddStaffDialog() {
  const [open, setOpen] = useState(false)
  const [autoGenPw, setAutoGenPw] = useState(true)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [successData, setSuccessData] = useState<{
    name: string
    email: string
    loginDetails: string
  } | null>(null)
  const { execute, isPending } = useServerAction(addUser, {
    interceptors: [
      onError((err) => {
        toast.error("Error!", {
          description: err?.message,
        })
        if (isDefinedError(err)) {
          console.error(err)
        }
      }),
    ],
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      role: "staff",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { data: res, error } = await execute({
      ...data,
      email: `${data.email}@kmutt.ac.th`,
      username: data.email,
      password: data.password ?? undefined,
      autoGeneratePassword: autoGenPw,
    })

    if (error) {
      if (error instanceof ORPCError) {
        if (error.data === "EMAIL_EXISTED") {
          form.setError("email", {
            message: error.message,
          })
        } else {
          toast.error("Error!", {
            description: error.message,
          })
        }
      }
      return
    }

    toast.success("Success!", {
      description: "User added.",
    })
    setSuccessData({
      email: res.email,
      name: data.name,
      loginDetails: `Email: ${res.email}\nPassword: ${res.password}`,
    })
    setShowSuccessDialog(true)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <UserPlus /> Add
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add staff account</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Somsak Saksom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-x-3">
                        <Input
                          placeholder="somsak.saks"
                          className="w-1/2"
                          {...field}
                          onChange={(e) => {
                            let val = e.target.value
                            const match = val.match(/^([^\s@]+)@kmutt\.ac\.th$/i)
                            if (match) {
                              val = match[1]
                            }
                            field.onChange(val)
                          }}
                        />
                        <span className="text-muted-foreground text-light">@kmutt.ac.th</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-3">
                  <Checkbox checked={autoGenPw} onCheckedChange={() => setAutoGenPw(!autoGenPw)} />
                  <span className="text-sm">Autogenerate password</span>
                </div>
                <div></div>
                {!autoGenPw && (
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="************" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                {isPending ? (
                  <LoadingSpinner className="size-4" />
                ) : (
                  <>
                    <Button type="submit">Confirm</Button>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </DialogClose>
                  </>
                )}
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <AddUserSuccessDialog
        open={showSuccessDialog}
        setOpen={setShowSuccessDialog}
        setMainDialogOpen={setOpen}
        data={successData}
      />
    </>
  )
}
