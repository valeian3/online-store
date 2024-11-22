import { useContext, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { AuthContext } from 'contexts/AuthProvider'

import { urlParam } from 'lib/constants'
import { categories, products, search } from 'lib/api'
import { excludeKeys, filterProducts } from 'lib/utils'
import { categoryKeys, productKeys, searchKeys } from 'lib/query-key-factory'

import type {
  IProduct,
  ICategoryListFilter,
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

/** Query hooks */

// Fetch product info
export const useProduct = (productId: number) => {
  return useQuery<IProduct>({
    queryKey: productKeys.detail(productId),
    queryFn: () => products.getProduct(productId),
  })
}

// Fetch list of all available categories
export const useCategoryList = () => {
  return useQuery<IProductsCategoryList>({
    queryKey: categoryKeys.all,
    queryFn: () => categories.getCategoryList(),
  })
}

// Fetch list of products that are in selected category
export const useProductsByCategory = (category: string) => {
  const apiSearchParams = useApiSearchParams()
  const { page = '1', priceFrom, priceTo } = useCustomSearchParams()

  return useQuery<IProductsByCategory>({
    queryKey: categoryKeys.productsList(category, {
      ...apiSearchParams,
      page,
      priceFrom,
      priceTo,
    }),
    queryFn: async () => {
      const res = await categories.getProductsByCategory({
        category,
        params: apiSearchParams,
        page: page,
      })

      return filterProducts(res, {
        priceFrom,
        priceTo,
      })
    },
  })
}

// Fetch list of products that match search value
export const useSearchProductsWithFilters = () => {
  const apiSearchParams = useApiSearchParams()
  const { page = '1', category, priceFrom, priceTo } = useCustomSearchParams()

  return useQuery<IProductsByCategory>({
    queryKey: searchKeys.searchedListWithFilters({
      ...apiSearchParams,
      category,
      priceFrom,
      priceTo,
      page,
    }),
    queryFn: async () => {
      const res = await search.getSearchProductWithFilters({
        params: apiSearchParams,
        page: page,
      })

      return filterProducts(res, {
        category,
        priceFrom,
        priceTo,
      })
    },
  })
}

/** Util hooks */

// Filters url parameters that are used by API to filter data on server
export const useApiSearchParams = (): Record<string, string> => {
  const [searchParams] = useSearchParams()
  const { category, priceFrom, priceTo } = urlParam

  const paramsObject: Record<string, string> = {}

  searchParams.forEach((value, key) => {
    paramsObject[key] = value
  })

  return excludeKeys(paramsObject, [category, priceFrom, priceTo])
}

// Filters url parameters that are used as utility to filter data on client
export const useCustomSearchParams = (): Record<string, string> => {
  const [searchParams] = useSearchParams()
  const { sortBy, order, searchProduct } = urlParam

  const paramsObject: Record<string, string> = {}

  searchParams.forEach((value, key) => {
    paramsObject[key] = value
  })

  return excludeKeys(paramsObject, [searchProduct, sortBy, order])
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

// Returns category list with number of products in category
export const useCategoryListFilter = (): ICategoryListFilter[] => {
  const parsedParams = useApiSearchParams()

  const { data, isLoading, isError } = useQuery<IProductsByCategory>({
    queryKey: searchKeys.searchedList({ ...parsedParams }),
    queryFn: () => search.getSearchProduct({ params: parsedParams }),
  })

  const memoizedCategoryList = useMemo(() => {
    if (isLoading || isError || !data?.products) return []

    const categoryMap = data.products.reduce<Map<string, number>>(
      (acc, product) => {
        const count = acc.get(product.category) || 0
        acc.set(product.category, count + 1)
        return acc
      },
      new Map()
    )

    return Array.from(
      categoryMap,
      ([categoryName, numOfProductsInCategory]) => ({
        categoryName,
        numOfProductsInCategory,
      })
    )
  }, [data?.products, isLoading, isError])

  return memoizedCategoryList
}
