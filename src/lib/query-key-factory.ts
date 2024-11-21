/**
 * Query key factory
 */

const categoryKeys = {
  all: ['categories'] as const,
  products: () => [...categoryKeys.all, 'products'] as const,
  productsList: (
    categoryName: string,
    params: Record<string, string>,
    page: number
  ) => {
    const { order, sortBy } = params
    const filters = { sortBy: sortBy, order: order }
    return [
      ...categoryKeys.products(),
      categoryName,
      { filters },
      { page: page },
    ] as const
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
  searchedList: (params: Record<string, string>, page: number) => {
    const { q: searchValue, order, sortBy, category } = params
    const filters = { sortBy: sortBy, order: order, category: category }
    return [
      ...searchKeys.searched(),
      searchValue,
      { filters },
      { page: page },
    ] as const
  },
  searchedListWithoutFilters: (params: Record<string, string>) => {
    const { q: searchValue } = params
    return [...searchKeys.searched(), searchValue] as const
  },
}

export { productKeys, categoryKeys, searchKeys }
