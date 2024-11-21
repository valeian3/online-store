/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { urlParam } from 'lib/constants'
import { AuthContext } from 'contexts/AuthProvider'
import { categories, products, search } from 'lib/api'
import { excludeKeys, filterProducts } from 'lib/utils'
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
      window.document.title = 'Online Store'
    } else {
      window.document.title = title
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
export const useProductsByCategory = (category: string, options: any) => {
  const [searchParams] = useSearchParams()
  const parsedParams = useParsedSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1')

  return useQuery<IProductsByCategory>({
    queryKey: categoryKeys.productsList(category, parsedParams, currentPage),
    queryFn: () =>
      categories.getProductsByCategory({
        category,
        params: parsedParams,
        page: currentPage,
      }),
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

export const useSearchProducts = (): IProduct[] => {
  const parsedParams = useParsedSearchParams()

  const { data } = useQuery<IProductsByCategory>({
    queryKey: searchKeys.searchedList({ ...parsedParams }),
    queryFn: () => search.getSearchProduct({ params: parsedParams }),
  })

  if (data?.products) return data?.products
  else return []
}

export const useSearchProductsWithFilters = (options: any) => {
  const [searchParams] = useSearchParams()
  const parsedParams = useParsedSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1')
  const category = searchParams.get('category')

  return useQuery<IProductsByCategory>({
    queryKey: searchKeys.searchedListWithFilters(
      { ...parsedParams, ...(category ? { category } : {}) },
      currentPage
    ),
    queryFn: async () => {
      const res = await search.getSearchProductWithFilters({
        params: parsedParams,
        page: currentPage,
      })

      return filterProducts(res, {
        ...(category ? { category } : {}),
      })
    },

    ...options,
  })
}

// hook that separates params from api and util params used in application for filtering and etc.
export const useParsedSearchParams = (): Record<string, string> => {
  const [searchParams] = useSearchParams()
  const { page, category, minPrice, maxPrice } = urlParam

  const paramsObject: Record<string, string> = {}

  searchParams.forEach((value, key) => {
    paramsObject[key] = value
  })

  return excludeKeys(paramsObject, [page, category, minPrice, maxPrice])
}

// Custom hook to manage and update sorting parameters in the URL search parameters
export const useSortParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const order = searchParams.get('order') || ''
  const sortBy = searchParams.get('sortBy') || ''

  const memoizedSearchValue = useMemo(
    () => `${sortBy}|${order}`,
    [sortBy, order]
  )

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

  return { memoizedSearchValue, handleSortChange }
}

// Custom hook to manage category list in sidebar
export const useCategoryList = (
  productList: IProduct[]
): {
  categoryName: string
  numOfProductsInCategory: number
}[] => {
  const memoizedCategoryList = useMemo(() => {
    if (!productList) return []

    const categoryMap: Map<string, number> = new Map()

    productList.forEach((product) => {
      const count = categoryMap.get(product.category) || 0
      categoryMap.set(product.category, count + 1)
    })

    return Array.from(
      categoryMap,
      ([categoryName, numOfProductsInCategory]) => ({
        categoryName,
        numOfProductsInCategory,
      })
    )
  }, [productList])

  return memoizedCategoryList
}
