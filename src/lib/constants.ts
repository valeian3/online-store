import { IUserWithRoles } from './types'

export const devUser: IUserWithRoles = {
  id: 0,
  username: 'dev',
  roles: ['developer'],
}

export const urlParam = {
  redirectFrom: 'redirect-from',
}

// TODO: check if products is needed at all
// query keys
export const categoryKeys = {
  all: ['categories'] as const,
  // lists: () => [...itemsKeys.all, 'list'] as const,
  // // list: (filters: string) => [...itemsKeys.lists(), { filters }] as const,
  products: () => [...categoryKeys.all, 'products'] as const,
  productsList: (
    categoryName: string,
    filters: { sortBy: string; order: string }
  ) => [...categoryKeys.products(), categoryName, { filters }] as const,
}

export const productKeys = {
  all: ['products'] as const,
  // lists: () => [...itemsKeys.all, 'list'] as const,
  // // list: (filters: string) => [...itemsKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
}
