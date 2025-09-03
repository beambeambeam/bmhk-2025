import { ReactNode, createContext, useContext } from "react"

export interface VerifyDialogContextValue {
  id: string
  form?: ReactNode
}

export const VerifyDialogContext = createContext<VerifyDialogContextValue | undefined>(undefined)

export function useVerifyDialog(): VerifyDialogContextValue {
  const context = useContext(VerifyDialogContext)
  if (!context) {
    throw new Error("useVerifyDialog must be used within a VerifyDialogContext.Provider")
  }
  return context
}
