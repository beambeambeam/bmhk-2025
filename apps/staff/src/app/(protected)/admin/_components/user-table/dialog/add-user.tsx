"use client"

import { LoadingSpinner } from "@/components/svg/loading-spinner"
import { Button } from "@/components/ui/button"
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
import { isDefinedError, onError, onSuccess } from "@orpc/client"
import { useServerAction } from "@orpc/react/hooks"
import { UserPlus } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { addUser } from "../../../actions"

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

const StaffRolesEnum = z.enum(["super_admin", "admin", "staff"])

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  username: z
    .string()
    .min(4, {
      message: "Username must be at least 4 characters.",
    })
    .regex(/^[a-z0-9_]+$/, {
      message: "Username can only contain lowercase letters, numbers, and underscores.",
    }),
  email: z
    .string()
    .regex(/^[^\s@]+@kmutt\.ac\.th$/, "Email must be a valid @kmutt.ac.th address")
    .min(1, "This field is Required"),
  password: passwordSchema,
  role: StaffRolesEnum,
})

export function AddStaffDialog() {
  const { execute, isPending } = useServerAction(addUser, {
    interceptors: [
      onError((err) => {
        toast("Error!", {
          description: err?.message,
        })
        if (isDefinedError(err)) {
          console.error(err)
        }
      }),
      onSuccess(() => window.location.reload()),
    ],
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      username: "",
      role: "staff",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    execute(data)
  }

  return (
    <Dialog>
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
                    <Input placeholder="somsak.saks@kmutt.ac.th" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="somsaklnwza" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="************" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          </form>
        </Form>
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
      </DialogContent>
    </Dialog>
  )
}
