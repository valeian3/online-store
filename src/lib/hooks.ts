/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

// context
import { AuthContext } from 'contexts/AuthProvider'

import { categories, products, search } from 'lib/api'

// constants
import { categoryKeys, productKeys, searchKeys } from 'lib/constants'

import type {
  IProduct,
  IProductsByCategory,
  IProductsCategoryList,
} from 'lib/types'
import { removeEmptyValues } from './utils'

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
export const useProductsCategoryList = (options: any) => {
  return useQuery<IProductsCategoryList>({
    queryKey: categoryKeys.all,
    queryFn: () => categories.getProductsCategoryList(),
    ...options,
  })
}

// TODO: define type for response result
export const useProductsByCategory = (
  category: string,
  options: any,
  filters: { sortBy: string; order: string }
) => {
  const tempFilters = removeEmptyValues(filters)
  const params = Object.keys(tempFilters).length ? tempFilters : undefined

  return useQuery<IProductsByCategory>({
    queryKey: categoryKeys.productsList(category, params),
    queryFn: () => categories.getProductsByCategory(category, params),
    ...options,
  })
}

export const useProduct = (productId: number, options: any) => {
  return useQuery<IProduct>({
    queryKey: productKeys.detail(productId),
    queryFn: () => products.getProduct(productId),
    ...options,
  })
}

export const useSearchProducts = (
  product: string,
  options: any,
  filters: { sortBy: string | undefined; order: string | undefined }
) => {
  return useQuery<IProductsByCategory>({
    queryKey: searchKeys.searchedList(product, filters),
    queryFn: () => search.getSearchProduct(product, filters),
    ...options,
  })
}
