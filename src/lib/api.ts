import axios from 'axios'

// import { urlParam } from './constants'

import { numberOfItemsPerPage } from 'lib/constants'

import type { ILoginUser, IRegisterUser } from 'lib/types'

const BASE_URL = import.meta.env.VITE_API_URL_DUMMY_JSON

if (!BASE_URL) {
  throw new Error('BASE_URL is not set in the environment variables')
}

// TODO: withCredentials not needed since this is public api
export const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
})

// Add a request interceptor
// apiInstance.interceptors.request.use(
//   function (config) {
//     return config
//   },
//   function (error) {
//     return Promise.reject(error)
//   }
// )

// apiInstance.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   (error) => {
//     if (axios.isAxiosError(error)) {
//       // const errorMessage = error?.response?.data?.error

//       switch (error.response?.status) {
//         case 400:
//           break
//         case 401:
//           // Redirect user to login if request not authorized
//           if (window.location.pathname !== '/login')
//             window.location.replace(
//               `/login?${urlParam.redirectFrom}=${encodeURIComponent(window.location.pathname + window.location.search)}`
//             )

//           break
//         case 404:
//           break
//         case 409:
//           break
//         case 429:
//           break
//         default:
//           console.log('Unknown error')
//       }
//     }
//     return Promise.reject(error)
//   },
//   { synchronous: true }
// )

/**
 * This represents some generic auth provider API, like Firebase.
 */
const userAuthProvider = {
  async getUser() {
    return await apiInstance.get('/users/me')
  },
  async signin(credentials: ILoginUser) {
    return await apiInstance.post('/users/login', credentials)
  },
  async register(credentials: IRegisterUser) {
    return await apiInstance.post('/users/register', credentials)
  },
  async signout() {
    await apiInstance.post('/users/logout')
  },
}

const products = {
  async getProducts() {
    const res = await apiInstance.get('/products')
    return res.data
  },
  async getProduct(id: number) {
    const res = await apiInstance.get(`products/${id}`)
    return res.data
  },
}

const categories = {
  async getProductsCategories() {
    const res = await apiInstance.get('/products/categories')
    return res.data
  },
  async getProductsCategoryList(): Promise<string[]> {
    const res = await apiInstance.get(`/products/category-list`)
    return res.data
  },
  async getProductsByCategory({
    category,
    params,
    limit = numberOfItemsPerPage,
    page,
  }: {
    category: string
    params: Record<string, string>
    limit?: number
    page: string | undefined
  }) {
    const parsedPage = Number(page || '1')
    const skip = parsedPage === 1 ? 0 : (parsedPage - 1) * limit

    const res = await apiInstance.get(`/products/category/${category}`, {
      params: { limit, skip, ...params },
    })
    return res.data
  },
}

const search = {
  async getSearchProduct({ params }: { params: Record<string, string> }) {
    const { q: searchValue } = params
    const res = await apiInstance.get('/products/search', {
      params: { q: searchValue },
    })
    return res.data
  },
  async getSearchProductWithFilters({
    params,
    limit = numberOfItemsPerPage,
    page,
  }: {
    params: Record<string, string>
    limit?: number
    page: string | undefined
  }) {
    const parsedPage = Number(page || '1')
    const skip = parsedPage === 1 ? 0 : (parsedPage - 1) * limit

    const res = await apiInstance.get('/products/search', {
      params: { limit, skip, ...params },
    })
    return res.data
  },
}

export { userAuthProvider, products, categories, search }
