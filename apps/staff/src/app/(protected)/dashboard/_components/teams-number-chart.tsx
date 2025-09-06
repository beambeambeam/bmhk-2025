import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import NumberFlow from "@number-flow/react"
import { Users, CheckCircle } from "lucide-react"

type TeamNumberCardProps = {
  number: number
  title: string
  description: string
  variant?: "registered" | "submitted"
}

function TeamNumberCard(props: TeamNumberCardProps) {
  const isSubmitted = props.variant === "submitted"

  return (
    <Card className="flex flex-col transition-shadow duration-200 hover:shadow-lg">
      <CardHeader className="items-center pb-2">
        <CardTitle className="inline-flex items-center gap-2">
          <span className="hidden md:flex">
            {isSubmitted ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <Users className="h-5 w-5 text-blue-600" />
            )}
          </span>
          {props.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm">{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="mx-auto flex flex-1 items-center justify-center pb-4">
        <div className="text-center">
          <NumberFlow
            value={props.number}
            className={`text-4xl font-bold ${isSubmitted ? "text-green-600" : "text-blue-600"}`}
          />
        </div>
      </CardContent>
    </Card>
  )
}
export default TeamNumberCard
