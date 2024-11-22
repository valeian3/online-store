/**
 * Query key factory
 */

const categoryKeys = {
  all: ['categories'] as const,
  products: () => [...categoryKeys.all, 'products'] as const,
  productsList: (categoryName: string, params: Record<string, string>) => {
    const { order, sortBy, priceFrom, priceTo, page } = params

    return [
      ...categoryKeys.products(),
      categoryName,
      {
        filters: {
          sortBy: sortBy,
          order: order,
          priceFrom: priceFrom,
          priceTo: priceTo,
        },
      },
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
  searchedListWithFilters: (params: Record<string, string | undefined>) => {
    const {
      q: searchValue,
      order,
      sortBy,
      category,
      priceFrom,
      priceTo,
      page,
    } = params

    return [
      ...searchKeys.searched(),
      searchValue,
      {
        filters: {
          sortBy: sortBy,
          order: order,
          category: category,
          priceFrom: priceFrom,
          priceTo: priceTo,
        },
      },
      { page: page },
    ] as const
  },
}

export { productKeys, categoryKeys, searchKeys }
