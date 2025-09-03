"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

type VerifyFormProps = {
  id: string
}

function VerifyForm(_props: VerifyFormProps) {
  const [count, setCount] = useState(0)
  return (
    <div>
      <Button onClick={() => setCount((c) => c + 1)}>{count}</Button>
    </div>
  )
}
export default VerifyForm
