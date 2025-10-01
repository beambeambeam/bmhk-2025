import { createContext, useContext } from "react"

export interface AwardChangeContextValue {
  teamId: string
  currentAward: string
  teamName: string
}

export const AwardChangeContext = createContext<AwardChangeContextValue | undefined>(undefined)

export function useAwardChangeContext(): AwardChangeContextValue {
  const context = useContext(AwardChangeContext)
  if (!context) {
    throw new Error("useAwardChangeContext must be used within an AwardChangeContext.Provider")
  }
  return context
}
