import { IUserWithRoles } from './types'

export const devUser: IUserWithRoles = {
  id: 0,
  username: 'dev',
  roles: ['developer'],
}

export const urlParam = {
  redirectFrom: 'redirect-from',
  page: 'page',
  category: 'category',
  minPrice: 'minPrice',
  maxPrice: 'maxPrice',
}

export const sortOptions = [
  { value: '', label: 'Default' },
  { value: 'price|desc', label: 'Price high-low' },
  { value: 'price|asc', label: 'Price low-high' },
  { value: 'title|desc', label: 'Title Z to A' },
  { value: 'title|asc', label: 'Title A to Z' },
]

export const numberOfItemsPerPage = 20
