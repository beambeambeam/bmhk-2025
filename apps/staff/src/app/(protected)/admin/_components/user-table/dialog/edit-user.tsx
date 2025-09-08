import { LoadingSpinner } from "@/components/svg/loading-spinner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { isDefinedError, onError, onSuccess, ORPCError } from "@orpc/client"
import { useServerAction } from "@orpc/react/hooks"
import { Edit2Icon } from "lucide-react"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { editUser } from "../../../actions"
import { UserDataContext } from "../action-menu"

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

const editFormSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string(),
  password: passwordSchema.optional().or(z.literal("")),
  role: z.enum(["super_admin", "admin", "staff"]),
})

const DropdownMenuEditStaff = () => {
  const { user } = useContext(UserDataContext)

  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      role: user?.role as never,
      password: "",
      name: user?.name || "",
      email: user?.email || "",
      username: user?.username || "",
    },
    mode: "onChange",
  })

  const { execute, isPending } = useServerAction(editUser, {
    interceptors: [
      onError((err) => {
        if (err instanceof ORPCError && isDefinedError(err)) {
          if (err.data.bmhkIntError) {
            if (err.data.bmhkIntError === "USER_NOT_FOUND") {
              toast.error("Error!", {
                description: err?.message,
              })
            }
          } else {
            console.error(err)
          }
        }
        toast.error("Error!", {
          description: err?.message ?? "Unknown Error Occured.",
        })
      }),
      onSuccess(() => window.location.reload()),
    ],
  })

  if (!user) {
    return null
  }

  const onSubmit = async (data: z.infer<typeof editFormSchema>) => {
    await execute({ ...data, id: user.id, password: data.password ?? "" })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`w-full justify-start ${user.role === "super_admin" ? "cursor-not-allowed" : ""}`}
          disabled={user.role === "super_admin"}>
          <Edit2Icon /> Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Edit staff</DialogTitle>
              <DialogDescription>
                {user.name} - {user.username}
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Input {...field} />
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
                      <SelectItem value="super_admin" disabled>
                        Super Admin
                      </SelectItem>
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
  )
}
export default DropdownMenuEditStaff
