import { useContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

// context
import { AuthContext } from 'contexts/AuthProvider'

import { products, userAuthProvider } from 'lib/api'

// constants
import { itemsKeys, userKeys } from 'lib/constants'

import type {
  IGetInventoryItems,
  IGetInventoryItem,
  IUserResponseMe,
} from 'lib/types'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('auth context must be used within an AuthProvider')
  }
  return context
}

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)

      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.error('Error reading localStorage key:', key, error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)

      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error setting localStorage key:', key, error)
    }
  }

  return [storedValue, setValue] as const
}

export const usePageTitle = (title?: string) => {
  useEffect(() => {
    if (!title) {
      window.document.title = 'Auth Example App'
    } else {
      window.document.title = `${title} - Auth Example App`
    }
  }, [title])
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useGetUser = (options: any) => {
  return useQuery<IUserResponseMe>({
    queryKey: userKeys.user,
    queryFn: () => userAuthProvider.getUser(),
    ...options,
  })
}

// TODO: define type for query options
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useGetInventoryItems = (options: any) => {
  return useQuery<IGetInventoryItems>({
    queryKey: itemsKeys.all,
    queryFn: () => products.getProducts(),
    ...options,
  })
}

export const useGetInventoryItem = (
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any
) => {
  return useQuery<IGetInventoryItem>({
    queryKey: itemsKeys.detail(parseInt(id)),
    queryFn: () => products.getProduct(id),
    ...options,
  })
}
