import { createContext, useContext } from "react"

export interface TeamDialogContextValue {
  id: string
}

export const TeamDialogContext = createContext<TeamDialogContextValue | undefined>(undefined)

export function useTeamDialogContext(): TeamDialogContextValue {
  const context = useContext(TeamDialogContext)
  if (!context) {
    throw new Error("useTeamDialogContext must be used within a TeamDialogContext.Provider")
  }
  return context
}
