import { useParams, useSearchParams } from 'react-router-dom'

import { useSearchProducts } from 'lib/hooks'
import SidebarLayout from 'layout/SidebarLayout'
import SidebarFilters from 'components/SidebarFilters'
import Selector from 'components/Selector'
import ProductList from 'components/ProductList'

function SearchProducts() {
  const { searchProduct = '' } = useParams<{ searchProduct: string }>()

  // Hook for working with the query params
  const [searchParams, setSearchParams] = useSearchParams()
  // Get the current sort value from the query parameters (if any)
  const sortBy = searchParams.get('sortBy') || ''
  const order = searchParams.get('order') || ''

  const { data, isLoading, isError } = useSearchProducts(
    searchProduct,
    {},
    { sortBy, order }
  )

  // Sort options for the selector
  const sortOptions = [
    { value: { sortBy: '', order: '' }, label: 'Sort by:' },
    { value: { sortBy: 'price', order: 'desc' }, label: 'high-low' },
    { value: { sortBy: 'price', order: 'asc' }, label: 'low-high' },
    { value: { sortBy: 'title', order: 'desc' }, label: 'Title Z to A' },
    { value: { sortBy: 'title', order: 'asc' }, label: 'Title A to Z' },
  ]

  // Handle when the user selects a new sorting option
  const handleSortChange = (newSortValue: {
    sortBy: string
    order: string
  }) => {
    const newSearchParams = new URLSearchParams()

    if (newSortValue.sortBy === '' && newSortValue.order === '') {
      newSearchParams.delete('sortBy')
      newSearchParams.delete('order')
    } else {
      newSearchParams.set('sortBy', newSortValue.sortBy)
      newSearchParams.set('order', newSortValue.order)
    }

    setSearchParams(newSearchParams)
  }

  if (isLoading) return <>fetching category products data...</>
  if (isError) return <>error fetching category products data</>
  return (
    <SidebarLayout sidebar={<SidebarFilters />}>
      <h1 className="text-2xl font-bold mb-6">
        Search product: {searchProduct}
      </h1>
      <Selector
        list={sortOptions}
        value={{ sortBy, order }}
        onChange={handleSortChange}
      />
      <ProductList products={data.products} />
    </SidebarLayout>
  )
}

export default SearchProducts
