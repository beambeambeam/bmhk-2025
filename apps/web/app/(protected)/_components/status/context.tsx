import { createContext, useContext, useState, useEffect } from "react"
import { createStore, useStore } from "zustand"
import { useShallow } from "zustand/react/shallow"

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
    field: keyof Omit<RegisterStatusState, "setStatus" | "setSubmitRegister" | "updateFromData">,
    status: RegisterStatusEnum
  ) => void
  setSubmitRegister: (timestamp: Date) => void
  updateFromData: (data: Partial<RegisterStatusState>) => void
}

const createRegisterStatusStore = (initialState: Partial<RegisterStatusState> = {}) =>
  createStore<RegisterStatusState>((set) => ({
    team: "NOT_DONE",
    adviser: "NOT_DONE",
    member1: "NOT_DONE",
    member2: "NOT_DONE",
    member3: "NOT_HAVE",
    submitRegister: null,
    ...initialState,

    setStatus: (field, status) =>
      set((state) => ({
        ...state,
        [field]: status,
      })),

    setSubmitRegister: (timestamp) =>
      set({
        submitRegister: timestamp,
      }),

    updateFromData: (data) =>
      set((state) => ({
        ...state,
        ...data,
      })),
  }))

// Context for dependency injection
const RegisterStatusContext = createContext<ReturnType<typeof createRegisterStatusStore> | null>(null)

export const RegisterStatusProvider = ({
  children,
  initialState,
}: {
  children: React.ReactNode
  initialState?: Partial<RegisterStatusState>
}) => {
  const [store] = useState(() => createRegisterStatusStore(initialState))

  useEffect(() => {
    if (initialState) {
      store.getState().updateFromData(initialState)
    }
  }, [store, initialState])

  return <RegisterStatusContext.Provider value={store}>{children}</RegisterStatusContext.Provider>
}

export const useRegisterStatus = <T,>(selector: (state: RegisterStatusState) => T): T => {
  const store = useContext(RegisterStatusContext)
  if (!store) {
    throw new Error("Missing RegisterStatusProvider in the tree")
  }
  return useStore(store, selector)
}

export const useTeamStatus = () => useRegisterStatus((state) => state.team)
export const useAdviserStatus = () => useRegisterStatus((state) => state.adviser)
export const useMember1Status = () => useRegisterStatus((state) => state.member1)
export const useMember2Status = () => useRegisterStatus((state) => state.member2)
export const useMember3Status = () => useRegisterStatus((state) => state.member3)
export const useSubmitRegister = () => useRegisterStatus((state) => state.submitRegister)

export const useAllRegisterStatus = () =>
  useRegisterStatus(
    useShallow((state) => ({
      team: state.team,
      adviser: state.adviser,
      member1: state.member1,
      member2: state.member2,
      member3: state.member3,
      submitRegister: state.submitRegister,
    }))
  )

export const useRegisterStatusActions = () =>
  useRegisterStatus(
    useShallow((state) => ({
      setStatus: state.setStatus,
      setSubmitRegister: state.setSubmitRegister,
      updateFromData: state.updateFromData,
    }))
  )

export const useIsRegistrationComplete = () =>
  useRegisterStatus((state) => {
    const requiredFields = ["team", "adviser", "member1", "member2"] as const
    return requiredFields.every((field) => state[field] === "DONE")
  })

export const useIsRegistrationSubmitted = () => useRegisterStatus((state) => state.submitRegister !== null)

export const useHasIncompleteFields = () =>
  useRegisterStatus((state) => {
    return (
      state.team !== "DONE" ||
      state.adviser !== "DONE" ||
      state.member1 !== "DONE" ||
      state.member2 !== "DONE"
    )
  })

export const useIsReadyForFinalSubmit = (memberCount: number) =>
  useRegisterStatus((state) => {
    const hasIncompleteFields =
      state.team !== "DONE" ||
      state.adviser !== "DONE" ||
      state.member1 !== "DONE" ||
      state.member2 !== "DONE"

    if (hasIncompleteFields) return false

    if (memberCount === 3) {
      return state.member3 === "DONE"
    }

    if (memberCount === 2) {
      return state.member3 === "NOT_HAVE"
    }

    return false
  })
