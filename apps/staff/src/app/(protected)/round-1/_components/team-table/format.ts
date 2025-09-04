import { CircleCheckBigIcon, CircleDashedIcon, CircleOffIcon } from "lucide-react"

export function RegsiterStatusToIcon(status: "DONE" | "NOT_DONE" | "NOT_HAVE") {
  switch (status) {
    case "DONE":
      return CircleCheckBigIcon
    case "NOT_DONE":
      return CircleOffIcon
    case "NOT_HAVE":
      return CircleDashedIcon

    default:
      return CircleDashedIcon
  }
}

export function RegisterStatusToColorClass(status: "DONE" | "NOT_DONE" | "NOT_HAVE") {
  switch (status) {
    case "DONE":
      return "text-emerald-500"
    case "NOT_DONE":
      return "text-rose-500"
    case "NOT_HAVE":
      return "text-muted-foreground"
    default:
      return "text-muted-foreground"
  }
}

export function formatCodeName(index: number) {
  const number = String(index).padStart(3, "0")
  return `BMHK${number}`
}
