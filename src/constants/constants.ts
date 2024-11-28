export const urlParam = {
  redirectFrom: 'redirect-from',
  page: 'page',
  category: 'category',
  priceFrom: 'priceFrom',
  priceTo: 'priceTo',
  sortBy: 'sortBy',
  order: 'order',
  searchProduct: 'q',
}

export const sortOptions = [
  { value: '', label: 'Default' },
  { value: 'price|desc', label: 'Price high-low' },
  { value: 'price|asc', label: 'Price low-high' },
  { value: 'title|desc', label: 'Title Z to A' },
  { value: 'title|asc', label: 'Title A to Z' },
]

export const numberOfItemsPerPage = 20
