/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { AuthContext } from 'contexts/AuthProvider'
import { categories, products, search } from 'lib/api'
import { categoryKeys, productKeys, searchKeys } from 'lib/query-key-factory'

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
  filters: Record<string, string>
) => {
  return useQuery<IProductsByCategory>({
    queryKey: categoryKeys.productsList(category, filters),
    queryFn: () => categories.getProductsByCategory(category, filters),
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
  options: any,
  filters: Record<string, string>
) => {
  return useQuery<IProductsByCategory>({
    queryKey: searchKeys.searchedList(filters),
    queryFn: () => search.getSearchProduct(filters),
    ...options,
  })
}

export const useParsedSearchParams = () => {
  const [searchParams] = useSearchParams()

  const paramsObject: Record<string, string> = {}

  searchParams.forEach((value, key) => {
    paramsObject[key] = value
  })

  return paramsObject
}

export const useSortParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const order = searchParams.get('order') || ''
  const sortBy = searchParams.get('sortBy') || ''

  const selectedValue = useMemo(() => `${sortBy}|${order}`, [sortBy, order])

  const handleSortChange = (sortBy: string, order: string) => {
    const newSearchParams = new URLSearchParams(searchParams)

    if (!sortBy && !order) {
      newSearchParams.delete('sortBy')
      newSearchParams.delete('order')
    } else {
      newSearchParams.set('sortBy', sortBy)
      newSearchParams.set('order', order)
    }

    setSearchParams(newSearchParams)
  }

  return { selectedValue, handleSortChange }
}
