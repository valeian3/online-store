import { createContext, FC, ReactNode } from 'react'

type FeatureFlags = {
  cartFeature: boolean
}

const defaultFeatureFlags: FeatureFlags = {
  cartFeature: import.meta.env.VITE_API_FEATURE_FLAG_CART === 'true',
}

export const FeatureFlagsContext =
  createContext<FeatureFlags>(defaultFeatureFlags)

type FeatureFlagsProviderProps = {
  children: ReactNode
}

export const FeatureFlagsProvider: FC<FeatureFlagsProviderProps> = ({
  children,
}) => {
  return (
    <FeatureFlagsContext.Provider value={defaultFeatureFlags}>
      {children}
    </FeatureFlagsContext.Provider>
  )
}
