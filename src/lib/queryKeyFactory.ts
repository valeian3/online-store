/**
 * Query key factory
 */

const categoryKeys = {
  all: ['categories'] as const,
  products: () => [...categoryKeys.all, 'products'] as const,
  productsList: (categoryName: string, params: Record<string, string>) => {
    const { order, sortBy } = params
    const filters = { sortBy: sortBy, order: order }
    return [...categoryKeys.products(), categoryName, { filters }] as const
  },
}

const productKeys = {
  all: ['products'] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
}

const searchKeys = {
  all: ['search'] as const,
  searched: () => [...searchKeys.all, 'products'] as const,
  searchedList: (params: Record<string, string>) => {
    const { q: searchValue, order, sortBy } = params
    const filters = { sortBy: sortBy, order: order }
    return [...searchKeys.searched(), searchValue, { filters }] as const
  },
}

export { productKeys, categoryKeys, searchKeys }
