"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { CopyIcon } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

interface AddUserSuccessDialogProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setMainDialogOpen: Dispatch<SetStateAction<boolean>>
  data: {
    name: string
    email: string
    loginDetails: string
  } | null
}

export function AddUserSuccessDialog(props: AddUserSuccessDialogProps) {
  const copyLoginDetailsToClipboard = async () => {
    await navigator.clipboard.writeText(props.data?.loginDetails ?? "")
    props.setMainDialogOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    props.setOpen(open)
    if (!open) {
      props.setMainDialogOpen(false)
    }
  }
  return (
    <AlertDialog open={props.open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Success!</AlertDialogTitle>
          <AlertDialogDescription>
            User {props.data?.name ?? ""} ({props.data?.email}) is created!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex w-full flex-col">
          <AlertDialogAction onClick={() => copyLoginDetailsToClipboard()}>
            <CopyIcon /> Copy login details and close
          </AlertDialogAction>
          <AlertDialogCancel onClick={() => props.setMainDialogOpen(false)}>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
