import { createContext, useContext, useState } from "react"
import { createStore, useStore } from "zustand"

// Types for register status
export type RegisterStatusEnum = "NOT_DONE" | "DONE" | "NOT_HAVE"

export interface RegisterStatusState {
  team: RegisterStatusEnum
  adviser: RegisterStatusEnum
  member1: RegisterStatusEnum
  member2: RegisterStatusEnum
  member3: RegisterStatusEnum
  submitRegister: Date | null
  // Actions
  setStatus: (
    field: keyof Omit<RegisterStatusState, "setStatus" | "setSubmitRegister">,
    status: RegisterStatusEnum
  ) => void
  setSubmitRegister: (timestamp: Date) => void
}

// Create the store
const createRegisterStatusStore = (initialState: Partial<RegisterStatusState> = {}) =>
  createStore<RegisterStatusState>((set) => ({
    // Default state
    team: "NOT_DONE",
    adviser: "NOT_DONE",
    member1: "NOT_DONE",
    member2: "NOT_DONE",
    member3: "NOT_HAVE",
    submitRegister: null,
    ...initialState,

    // Actions
    setStatus: (field, status) =>
      set((state) => ({
        ...state,
        [field]: status,
      })),

    setSubmitRegister: (timestamp) =>
      set({
        submitRegister: timestamp,
      }),
  }))

// Context for dependency injection
const RegisterStatusContext = createContext<ReturnType<typeof createRegisterStatusStore> | null>(null)

// Provider component
export const RegisterStatusProvider = ({
  children,
  initialState,
}: {
  children: React.ReactNode
  initialState?: Partial<RegisterStatusState>
}) => {
  const [store] = useState(() => createRegisterStatusStore(initialState))

  return <RegisterStatusContext.Provider value={store}>{children}</RegisterStatusContext.Provider>
}

// Hook to use the store with context
export const useRegisterStatus = <T,>(selector: (state: RegisterStatusState) => T): T => {
  const store = useContext(RegisterStatusContext)
  if (!store) {
    throw new Error("Missing RegisterStatusProvider in the tree")
  }
  return useStore(store, selector)
}

// Convenience hooks for specific state slices
export const useTeamStatus = () => useRegisterStatus((state) => state.team)
export const useAdviserStatus = () => useRegisterStatus((state) => state.adviser)
export const useMember1Status = () => useRegisterStatus((state) => state.member1)
export const useMember2Status = () => useRegisterStatus((state) => state.member2)
export const useMember3Status = () => useRegisterStatus((state) => state.member3)
export const useSubmitRegister = () => useRegisterStatus((state) => state.submitRegister)

// Hook for actions
export const useRegisterStatusActions = () =>
  useRegisterStatus((state) => ({
    setStatus: state.setStatus,
    setSubmitRegister: state.setSubmitRegister,
  }))

// Hook to check if all required forms are completed
export const useIsRegistrationComplete = () =>
  useRegisterStatus((state) => {
    const requiredFields = ["team", "adviser", "member1", "member2"] as const
    return requiredFields.every((field) => state[field] === "DONE")
  })

// Hook to check if registration is submitted
export const useIsRegistrationSubmitted = () => useRegisterStatus((state) => state.submitRegister !== null)

// Hook to get completion percentage
export const useCompletionPercentage = () =>
  useRegisterStatus((state) => {
    const requiredFields = ["team", "adviser", "member1", "member2"] as const
    const completedFields = requiredFields.filter((field) => state[field] === "DONE").length
    return Math.round((completedFields / requiredFields.length) * 100)
  })
