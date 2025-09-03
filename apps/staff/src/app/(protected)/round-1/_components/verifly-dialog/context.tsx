import { ReactNode, createContext, useContext } from "react"

export interface VerifyDialogContextValue {
  id: string
}

export const VerifyDialogContext = createContext<VerifyDialogContextValue | undefined>(undefined)

export function useVerifyDialogContext(): VerifyDialogContextValue {
  const context = useContext(VerifyDialogContext)
  if (!context) {
    throw new Error("useVerifyDialogContext must be used within a VerifyDialogContext.Provider")
  }
  return context
}
