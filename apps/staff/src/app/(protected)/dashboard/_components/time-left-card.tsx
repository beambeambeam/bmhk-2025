import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, AlertCircle } from "lucide-react"

interface TimeLeftCardProps {
  date: Date
}

function TimeLeftCard({ date }: TimeLeftCardProps) {
  const now = new Date()
  const timeLeft = date.getTime() - now.getTime()

  const isExpired = timeLeft <= 0
  const days = Math.floor(Math.abs(timeLeft) / (1000 * 60 * 60 * 24))
  const hours = Math.floor((Math.abs(timeLeft) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((Math.abs(timeLeft) % (1000 * 60 * 60)) / (1000 * 60))

  const formatTime = () => {
    if (isExpired) {
      return `Expired ${days}d ${hours}h ${minutes}m ago`
    }
    return `${days}d ${hours}h ${minutes}m`
  }

  return (
    <Card className="flex flex-col transition-shadow duration-200 hover:shadow-lg">
      <CardHeader className="items-center pb-2">
        <CardTitle className="inline-flex items-center gap-2">
          <span className="hidden md:flex">
            {isExpired ? (
              <AlertCircle className="h-5 w-5 text-red-600" />
            ) : (
              <Clock className="h-5 w-5 text-orange-600" />
            )}
          </span>
          Time Left
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          {isExpired ? "Event has ended" : "Time remaining"}
        </CardDescription>
      </CardHeader>
      <CardContent className="mx-auto flex flex-1 items-center justify-center pb-4">
        <div className="text-center">
          <div className={`text-4xl font-bold ${isExpired ? "text-red-600" : "text-orange-600"}`}>
            {formatTime()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TimeLeftCard
