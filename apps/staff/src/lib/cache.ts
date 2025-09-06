import { queryClient } from "@/provider/query"

export const cacheUtils = {
  invalidateQueries: (queryKey: string[]) => {
    return queryClient.invalidateQueries({ queryKey })
  },

  invalidateAndRefetch: (queryKey: string[]) => {
    return queryClient.invalidateQueries({
      queryKey,
      refetchType: "active",
    })
  },

  removeQueries: (queryKey: string[]) => {
    return queryClient.removeQueries({ queryKey })
  },

  setQueryData: <T>(queryKey: string[], data: T) => {
    return queryClient.setQueryData(queryKey, data)
  },

  setQueriesData: <T>(queryKey: string[], updater: (oldData: T | undefined) => T) => {
    return queryClient.setQueriesData({ queryKey }, updater)
  },

  prefetchQuery: (queryKey: string[], queryFn: () => Promise<void>) => {
    return queryClient.prefetchQuery({
      queryKey,
      queryFn,
      staleTime: 1000 * 60 * 30,
    })
  },

  getQueryData: <T>(queryKey: string[]) => {
    return queryClient.getQueryData<T>(queryKey)
  },

  getQueryState: (queryKey: string[]) => {
    return queryClient.getQueryState(queryKey)
  },

  cancelQueries: (queryKey: string[]) => {
    return queryClient.cancelQueries({ queryKey })
  },

  resetQueries: (queryKey?: string[]) => {
    return queryClient.resetQueries(queryKey ? { queryKey } : undefined)
  },

  clear: () => {
    return queryClient.clear()
  },
}
