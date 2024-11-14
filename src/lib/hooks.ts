import { useContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

// context
import { AuthContext } from 'contexts/AuthProvider'

import { categories, products } from 'lib/api'

// constants
import { categoryKeys, productKeys } from 'lib/constants'

import type {
  IProduct,
  IProductsByCategory,
  IProductsCategoryList,
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
      window.document.title = 'King Online Store'
    } else {
      window.document.title = `${title} - King Online Store`
    }
  }, [title])
}

// TODO: define type for query options
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useProductsCategoryList = (options: any) => {
  return useQuery<IProductsCategoryList>({
    queryKey: categoryKeys.all,
    queryFn: () => categories.getProductsCategoryList(),
    ...options,
  })
}

// TODO: define type for response result
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useProductsByCategory = (category: string, options: any) => {
  return useQuery<IProductsByCategory>({
    queryKey: categoryKeys.productsList(category),
    queryFn: () => categories.getProductsByCategory(category),
    ...options,
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useProduct = (productId: number, options: any) => {
  return useQuery<IProduct>({
    queryKey: productKeys.detail(productId),
    queryFn: () => products.getProduct(productId),
    ...options,
  })
}
