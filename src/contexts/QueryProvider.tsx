import {
  createContext,
  PropsWithChildren,
  useState,
  useEffect,
  Suspense,
  lazy,
} from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 2,
      refetchOnWindowFocus: false,
      retry: 2,
      refetchOnMount: false,
    },
  },
})

const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
)

export const QueryContext = createContext<undefined>(undefined)

export const QueryProvider = ({ children }: PropsWithChildren) => {
  const [showDevtools, setShowDevtools] = useState<boolean>(false)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.toggleDevtools = () => setShowDevtools((old) => !old)
  }, [])

  return (
    <QueryContext.Provider value={undefined}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
        {showDevtools && (
          <Suspense fallback={null}>
            <ReactQueryDevtoolsProduction />
          </Suspense>
        )}
      </QueryClientProvider>
    </QueryContext.Provider>
  )
}
