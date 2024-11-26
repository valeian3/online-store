import axios from 'axios'

import { numberOfItemsPerPage } from 'lib/constants'

import type {
  IProduct,
  ICategoryList,
  IProductListSearch,
  IProductListByCategory,
  IProductListSearchWithFilters,
} from 'lib/types'

const BASE_URL = import.meta.env.VITE_API_URL_DUMMY_JSON

if (!BASE_URL) {
  throw new Error('BASE_URL is not set in the environment variables')
}

export const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const products = {
  async getProduct(id: number): Promise<IProduct> {
    const res = await apiInstance.get(`products/${id}`)
    return res.data
  },
}

const categories = {
  async getCategoryList(): Promise<ICategoryList> {
    const res = await apiInstance.get(`/products/category-list`)
    return res.data
  },
  async getProductListByCategory({
    category,
    params,
    limit = numberOfItemsPerPage,
    page,
  }: {
    category: string
    params: Record<string, string>
    limit?: number
    page: string | undefined
  }): Promise<IProductListByCategory> {
    const parsedPage = Number(page || '1')
    const skip = parsedPage === 1 ? 0 : (parsedPage - 1) * limit

    const res = await apiInstance.get(`/products/category/${category}`, {
      params: { limit, skip, ...params },
    })
    return res.data
  },
}

const search = {
  async getProductListSearch({
    params,
  }: {
    params: Record<string, string>
  }): Promise<IProductListSearch> {
    const { q: searchValue } = params
    const res = await apiInstance.get('/products/search', {
      params: { q: searchValue },
    })
    return res.data
  },
  async getProductListSearchWithFilters({
    params,
    limit = numberOfItemsPerPage,
    page,
  }: {
    params: Record<string, string>
    limit?: number
    page: string | undefined
  }): Promise<IProductListSearchWithFilters> {
    const parsedPage = Number(page || '1')
    const skip = parsedPage === 1 ? 0 : (parsedPage - 1) * limit

    const res = await apiInstance.get('/products/search', {
      params: { limit, skip, ...params },
    })
    return res.data
  },
}

export { products, categories, search }
