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
    filters: { sortBy: string; order: string } | undefined
  ) => [...categoryKeys.products(), categoryName, { filters }] as const,
}

export const productKeys = {
  all: ['products'] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
}

export const searchKeys = {
  all: ['search'] as const,
  searched: () => [...searchKeys.all, 'products'] as const,
  searchedList: (
    product: string,
    filters: {
      sortBy: string | undefined
      order: string | undefined
    }
  ) => [...searchKeys.searched(), product, { filters }] as const,
}
