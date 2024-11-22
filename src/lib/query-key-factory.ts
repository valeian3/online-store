/**
 * Query key factory
 */

const categoryKeys = {
  all: ['categories'] as const,
  products: () => [...categoryKeys.all, 'products'] as const,
  productsList: (
    categoryName: string,
    params: Record<string, string>,
    page: string
  ) => {
    const { order, sortBy, priceFrom, priceTo } = params
    const filters = {
      sortBy: sortBy,
      order: order,
      priceFrom: priceFrom,
      priceTo: priceTo,
    }

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
  searchedList: (params: Record<string, string>) => {
    const { q: searchValue } = params
    return [...searchKeys.searched(), searchValue] as const
  },
  searchedListWithFilters: (
    params: Record<string, string | undefined>,
    page: string
  ) => {
    const {
      q: searchValue,
      order,
      sortBy,
      category,
      priceFrom,
      priceTo,
    } = params
    const filters = {
      sortBy: sortBy,
      order: order,
      category: category,
      priceFrom: priceFrom,
      priceTo: priceTo,
    }

    return [
      ...searchKeys.searched(),
      searchValue,
      { filters },
      { page: page },
    ] as const
  },
}

export { productKeys, categoryKeys, searchKeys }
